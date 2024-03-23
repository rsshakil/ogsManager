import { Formik, Form } from "formik";
import { Button } from "devextreme-react/button";
import _ from "lodash";
import { useUpdateGachaMutation } from "../../../../features/gacha/gachaApi";
import Loader from "../../../atoms/Loading/TherapistLoader";
import { useEffect, useRef, useState } from "react";
import useMutationApiResponse from "../../../../hooks/useMutationApiResponse";
import gachaFormSchema, { GACHA_FORM_INITIAL_VALUE } from "../../../../utils/schemas/gachaFormSchema";
import { useModal } from "../../../../contexts/ModalContext";
import Section from "../../FormInputs/Section";
import InputContainer from "../../FormInputs/InputContainer";
import SelectBox from "../../FormInputs/SelectBox";
import useFetchGachaInitQuery from "../../../../hooks/useFetchGachaInitQuery";
import useFetchGachaQuery from "../../../../hooks/useFetchGachaQuery";
import Checkbox from "../../FormInputs/CheckboxInput";
import TextAreaInput from "../../FormInputs/TextAreaInput";
import NumberBox from "../../FormInputs/NumberBox";
import { thousandSeparatedValue, convertedNumberedValue } from "../../../../utils/commonFunctions";
import TagboxCustomV3 from "../../FormInputs/TagboxCustomV3";
import TagboxCustomV3Tab from "../../FormInputs/TagboxCustomV3Tab";
import TagboxCustomV4 from "../../FormInputs/TagboxCustomV4";
import useCustomStore from "../../../../hooks/useCustomStore";
import GachaPriority from "../../FormInputs/GachaPriority";

const loopFlagOptions = [
    { id: 0, caption: "しない" },
    { id: 1, caption: "する（設定する全てのアイテムの在庫が無制限である必要があります）" }
]
const lastOneFlagOptions = [
    { id: 0, caption: "なし" },
    { id: 1, caption: "あり" }
]

const bgColorMapper = {
    category: "green",
    tag: "pink",
    item: "#FACD42",
    videoTag: "#d6e9ca",
    video: "#efefef",
}

const specialPriceFieldPrefix = "[おまけ]";
export const gachaPriceFieldLabelMapper = {
    0: "",
    1: "天井",
    2: "ラストワン",
    // 3: "7桁キリ番",
    4: "6桁キリ番",
    5: "5桁キリ番",
    6: "4桁キリ番",
    7: "3桁キリ番",
    8: "2桁キリ番",
    9: "1桁キリ番",
}
export const keyTypeMapper = {
    video: '賞動画',
    priceItem: '賞アイテム',
    awardPoint: '賞pt',
    emissionCount: '賞排出数',
}

const labelWarnTextMapper = {
    video: '複数セットするとランダムで出現します　最大16個',
    priceItem: '複数セットするとランダムで排出します　最大64個',
    awardPoint: '0-9,999,999',
    emissionCount: '0-9,999,999回',
}

export default function GachaFormEdit({ gachaId, closeModal, tableRef }) {
    const formikRef = useRef();
    const { isModalOpen: refetch } = useModal();

    const { trigger } = useMutationApiResponse(gachaFormSchema, ["gachaMemo"]);

    const [formValue, setFormValue] = useState(GACHA_FORM_INITIAL_VALUE);

    //Query
    const { data: { videos = [], videoTags=[], tags = [] } = {}, isLoading: gachaInitLoading } = useFetchGachaInitQuery(refetch);
    const { data: { records }, isLoading: gachaDetailLoading } = useFetchGachaQuery(gachaId, refetch);
    const { dataSource: itemDataSource, isLoading: itemLoading } = useCustomStore('itemId', '/gacha/init?groupKey=item', true);
    const { dataSource: tagDataSource, isLoading: tagLoading } = useCustomStore('tagId', '/gacha/init?groupKey=tag', false);
    console.log("videos",videos)
    console.log("videoTags",videoTags)
    //Mutation list
    const [updateGacha, { isLoading: updateGachaLoading }] = useUpdateGachaMutation();

    // TagBoxCustomV3 tagBoxSearchedValue removed
    useEffect(() => {
        sessionStorage.removeItem("tagBoxSearchedValue");
        sessionStorage.removeItem("tagBoxCloseModal");
    }, [])

    //For edit
    useEffect(() => {
        if (!gachaDetailLoading && records) {
            let gachaData = { ...records, gachaPrizes: [] };

            if (Array.isArray(records.gachaPrizes)) {
                gachaData.gachaPrizes = records.gachaPrizes.map(x => ({ ...x, gachaPrizeSetVideo: JSON.parse(x.gachaPrizeSetVideo), gachaPrizeSetItem: JSON.parse(x.gachaPrizeSetItem) }));
            }
            gachaData.gachaPrizes = generateGachaPrizePriority(gachaData);
            setFormValue(gachaData);

            if (formikRef.current) {
                formikRef.current.resetForm();
                formikRef.current.setFieldValue(records);
            }
        }
    }, [gachaDetailLoading, records]);

    const customGachaPrices = (prices = []) => {
        if (Array.isArray(prices)) {
            return prices.filter(x => x.gachaPrizeType == 0);
        }
        return [];
    }

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const customGachaPrizes = customGachaPrices(values.gachaPrizes);

        let formValues = { ...values, gachaEmissionTotalCount: (customGachaPrizes.length > 0) ? getTotalEmissionCount(values) : undefined }

        console.log('my values .....>>>', formValues)
        console.log('my customGachaPrizes .....>>>', customGachaPrizes)

        const mutatedApi = async (data) => await updateGacha({ gachaId, data });

        const { success } = await trigger({ values: formValues, setSubmitting, mutatedApi, resetForm, closeModal });

        if (success) {
            if (tableRef.current) {
                tableRef.current.instance.refresh();
            }
        }
    };

    const getTotalCount = (values) => {
        return convertedNumberedValue(values.gachaTotalCount);
    }

    const getTotalEmissionCount = (values) => {
        return customGachaPrices(values.gachaPrizes || []).reduce((acc, item) => Number(acc + convertedNumberedValue(item.gachaPrizeEmissionsCount)), 0);
    }


    const dynamicFieldLabel = (gachaPrizeType, prizeFieldName, key) => {
        const warningtext = labelWarnTextMapper[key];

        let label = prizeFieldName + keyTypeMapper[key];
        if (warningtext) label += `（${warningtext}）`;

        if (gachaPrizeType != 0) {
            label = specialPriceFieldPrefix + gachaPriceFieldLabelMapper[gachaPrizeType] + keyTypeMapper[key];

            if (gachaPrizeType == 1) {
                if (key == 'video') label += `（${warningtext}　天井到達時には順位の高い動画が再生されます）`;
                else if (key == 'priceItem') label += `（${warningtext}）<span class="text-[#FF758F]">※総数÷天井数以上の在庫がない場合構築エラーになります</span>`;
                else label += `（${warningtext}）`;
            }
            else if (gachaPrizeType != 1 && warningtext) {
                label += `（${warningtext}）`;
            }
        }
        return label;
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('handleKeyPress', e)
            e.preventDefault();
        }
    };

    function generateGachaPrizePriority(data = []) {
        const gachaPrizes = data.gachaPrizes;

        let allowCalculate = [];
        for (let i = 0; i < gachaPrizes.length; i++) {
            switch (gachaPrizes[i].gachaPrizeType) {
                case 1:
                        data.gachaLimitCount != 0 ? allowCalculate[i] = 1 : allowCalculate[i] = 0;
                    break;
                case 2:
                    data.gachaLastOneFlag != 0 ? allowCalculate[i] = 1 : allowCalculate[i] = 0;
                    break;
                // case 3:
                //     data.gachaLuckyNumber7 ? allowCalculate[i] = 1 : allowCalculate[i] = 0;
                //     break;
                case 4:
                    data.gachaLuckyNumber6 ? allowCalculate[i] = 1 : allowCalculate[i] = 0;
                    break;
                case 5:
                    data.gachaLuckyNumber5 ? allowCalculate[i] = 1 : allowCalculate[i] = 0;
                    break;
                case 6:
                    data.gachaLuckyNumber4 ? allowCalculate[i] = 1 : allowCalculate[i] = 0;
                    break;
                case 7:
                    data.gachaLuckyNumber3 ? allowCalculate[i] = 1 : allowCalculate[i] = 0;
                    break;
                case 8:
                    data.gachaLuckyNumber2 ? allowCalculate[i] = 1 : allowCalculate[i] = 0;
                    break;
                case 9:
                    data.gachaLuckyNumber1 ? allowCalculate[i] = 1 : allowCalculate[i] = 0;
                    break;
                default:
                    allowCalculate[i] = 1;
                    break;
            }
        }

        const allowCalculateLength = _.filter(allowCalculate, (num) => num === 1).length;

        let reversedGachaPrizes = _.reverse(gachaPrizes);
        let reversedAllowCalculate = _.reverse(allowCalculate);

        const priorityThresholdValue = allowCalculateLength > 1 ? 100 / (allowCalculateLength - 1) : 0;

        let k = 0;
        for (let i = 0; i < reversedGachaPrizes.length; i++) {
            reversedGachaPrizes[i].priority = '';
            let priorityValue = '';
            if (reversedAllowCalculate[i]) {
                priorityValue = Math.round(k * priorityThresholdValue);
                reversedGachaPrizes[i].priority = priorityValue;
                k++;
            }
        }

        return _.reverse(reversedGachaPrizes);
    }

    const targetGachaPrize = (gachaPrizes) => {
        console.log('targetGachaPrize', gachaPrizes)
    }

    return (
        <div>
            {(gachaInitLoading || gachaDetailLoading || updateGachaLoading) && <Loader />}

            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form onKeyDown={handleKeyPress}>
                        <Section caption="基本設定">
                            <InputContainer className="space-y-2">
                                <NumberBox min="0" max="200000" isRequired={true} name="gachaTotalCount" label="総数(1-200,000回)" inputClassName="w-full" />
                                <SelectBox name="gachaLoopFlag" label="ループ" options={loopFlagOptions} inputClassName="w-full" />
                                <NumberBox min="0" max="9999999" isRequired={true} name="gachaSinglePoint" label="単発販売pt（0-9,999,999pt）" inputClassName="w-full" />
                                <NumberBox min="0" max="999" isRequired={true} name="gachaConosecutiveCount" label="連続数(0-999回　0の場合連続パックはありません)" inputClassName="w-full" />
                                <NumberBox min="0" max="9999999" isRequired={true} name="gachaConosecutivePoint" label="連続販売pt（0-9,999,999pt）" inputClassName="w-full" />
                                <NumberBox min="0" max="200000" isRequired={true} name="gachaLimitOncePerDay" label="一人あたりの1日の回数制限(0-200,000回　0の場合制限はありません)" inputClassName="w-full" />
                                <NumberBox min="0" max="200000" isRequired={true} name="gachaLimitOnce" label="一人あたりの総回数制限(0-200,000回　0の場合制限はありません)" inputClassName="w-full" />
                                <NumberBox min="0" max="200000" isRequired={true} name="gachaLimitEveryonePerDay" label="一日当たりの総消化数制限（0-200,000回　毎日早い者勝ち制限　0の場合制限はありません）" inputClassName="w-full" />
                                <NumberBox min="0" max="999" isRequired={true} name="gachaAllRestCount" label="残り全部引く指定枚数（0-999以下で指定してください）" inputClassName="w-full" />
                            </InputContainer>
                        </Section>

                        <Section caption="おまけ設定(おまけが重なった場合は順位の高いものが優先して排出されます) " wrapClass="mt-5">
                            <div className="flex items-center">
                                <GachaPriority gachaPrize={values.gachaPrizes.find(item => item.gachaPrizeType === 1)} />
                                <NumberBox
                                    min="0" max="200000"
                                    isRequired={true}
                                    name="gachaLimitCount"
                                    label="天井数(0-200,000回　0の場合天井はありません)"
                                    inputClassName="w-full"
                                    wrapClass="w-full"
                                    handleOnBlurNumber={ ({ target: { name, value } }) => setFieldValue('gachaPrizes', generateGachaPrizePriority({...values, [name]: value})) }
                                />
                            </div>
                            <div className="flex items-center">
                                <GachaPriority gachaPrize={values.gachaPrizes.find(item => item.gachaPrizeType === 2)} />
                                <SelectBox
                                    name="gachaLastOneFlag"
                                    label="ラストワン賞"
                                    options={lastOneFlagOptions}
                                    inputClassName="w-full"
                                    wrapClass="w-full"
                                    value={values.gachaLastOneFlag}
                                    onChange={ ({ target: { name, value } }) => {
                                        setFieldValue(name, value)
                                        setFieldValue('gachaPrizes', generateGachaPrizePriority({...values, [name]: value}))
                                    } }
                                />
                            </div>
                            {/* <NumberBox
                                    isException={true}
                                    min="0000000" max="9999999"
                                    label="7桁キリ番賞(0000000-9999999 空欄の場合このキリ番賞はありません)"
                                    extraLabelField={<Checkbox name="gachaLuckyNumber7MatchFlag" value={values.gachaLuckyNumber7MatchFlag} onInputChange={({ target: { name, checked } = {} }) => setFieldValue(name, Number(checked))} label="末尾部分一致" labelClass="mr-4" wrapClass="mr-5" />}
                                    name="gachaLuckyNumber7"
                                    inputClassName="w-full"
                                    handleOnBlurNumber={ ({ target: { name, value } }) => setFieldValue('gachaPrizes', generateGachaPrizePriority({...values, [name]: value})) }
                                /> */}
                            <div className="flex items-center">
                                <GachaPriority gachaPrize={values.gachaPrizes.find(item => item.gachaPrizeType === 4)} />
                                <NumberBox
                                    isException={true}
                                    min="000000" max="999999"
                                    label="6桁キリ番賞(000000-999999 空欄の場合このキリ番賞はありません)"
                                    extraLabelField={<Checkbox name="gachaLuckyNumber6MatchFlag" value={values.gachaLuckyNumber6MatchFlag} onInputChange={({ target: { name, checked } = {} }) => setFieldValue(name, Number(checked))} label="末尾部分一致" labelClass="mr-4" wrapClass="mr-5" />}
                                    name="gachaLuckyNumber6"
                                    inputClassName="w-full"
                                    wrapClass="w-full"
                                    handleOnBlurNumber={ ({ target: { name, value } }) => setFieldValue('gachaPrizes', generateGachaPrizePriority({...values, [name]: value})) }
                                />
                            </div>
                            <div className="flex items-center">
                                <GachaPriority gachaPrize={values.gachaPrizes.find(item => item.gachaPrizeType === 5)} />
                                <NumberBox
                                    isException={true}
                                    min="00000" max="99999"
                                    label="5桁キリ番賞(00000-99999 空欄の場合このキリ番賞はありません)"
                                    extraLabelField={<Checkbox name="gachaLuckyNumber5MatchFlag" value={values.gachaLuckyNumber5MatchFlag} onInputChange={({ target: { name, checked } = {} }) => setFieldValue(name, Number(checked))} label="末尾部分一致" labelClass="mr-4" wrapClass="mr-5" />}
                                    name="gachaLuckyNumber5"
                                    inputClassName="w-full"
                                    wrapClass="w-full"
                                    handleOnBlurNumber={ ({ target: { name, value } }) => setFieldValue('gachaPrizes', generateGachaPrizePriority({...values, [name]: value})) }
                                />
                            </div>
                            <div className="flex items-center">
                                <GachaPriority gachaPrize={values.gachaPrizes.find(item => item.gachaPrizeType === 6)} />
                                <NumberBox
                                    isException={true}
                                    min="0000" max="9999"
                                    label="4桁キリ番賞(0000-9999 空欄の場合このキリ番賞はありません)"
                                    extraLabelField={<Checkbox name="gachaLuckyNumber4MatchFlag" value={values.gachaLuckyNumber4MatchFlag} onInputChange={({ target: { name, checked } = {} }) => setFieldValue(name, Number(checked))} label="末尾部分一致" labelClass="mr-4" wrapClass="mr-5" />}
                                    name="gachaLuckyNumber4"
                                    inputClassName="w-full"
                                    wrapClass="w-full"
                                    handleOnBlurNumber={ ({ target: { name, value } }) => setFieldValue('gachaPrizes', generateGachaPrizePriority({...values, [name]: value})) }
                                />
                            </div>
                            <div className="flex items-center">
                                <GachaPriority gachaPrize={values.gachaPrizes.find(item => item.gachaPrizeType === 7)} />
                                <NumberBox
                                    isException={true}
                                    min="000" max="999"
                                    label="3桁キリ番賞(000-999 空欄の場合このキリ番賞はありません)"
                                    extraLabelField={<Checkbox name="gachaLuckyNumber3MatchFlag" value={values.gachaLuckyNumber3MatchFlag} onInputChange={({ target: { name, checked } = {} }) => setFieldValue(name, Number(checked))} label="末尾部分一致" labelClass="mr-4" wrapClass="mr-5" />}
                                    name="gachaLuckyNumber3"
                                    inputClassName="w-full"
                                    wrapClass="w-full"
                                    handleOnBlurNumber={ ({ target: { name, value } }) => setFieldValue('gachaPrizes', generateGachaPrizePriority({...values, [name]: value})) }
                                />
                            </div>
                            <div className="flex items-center">
                                <GachaPriority gachaPrize={values.gachaPrizes.find(item => item.gachaPrizeType === 8)} />
                                <NumberBox
                                    isException={true}
                                    min="00" max="99"
                                    label="2桁キリ番賞(00-99 空欄の場合このキリ番賞はありません)"
                                    extraLabelField={<Checkbox name="gachaLuckyNumber2MatchFlag" value={values.gachaLuckyNumber2MatchFlag} onInputChange={({ target: { name, checked } = {} }) => setFieldValue(name, Number(checked))} label="末尾部分一致" labelClass="mr-4" wrapClass="mr-5" />}
                                    name="gachaLuckyNumber2"
                                    inputClassName="w-full"
                                    wrapClass="w-full"
                                    handleOnBlurNumber={ ({ target: { name, value } }) => setFieldValue('gachaPrizes', generateGachaPrizePriority({...values, [name]: value})) }
                                />
                            </div>
                            <div className="flex items-center">
                                <GachaPriority gachaPrize={values.gachaPrizes.find(item => item.gachaPrizeType === 9)} />
                                <NumberBox
                                    isException={true}
                                    min="0" max="9"
                                    label="1桁キリ番賞(0-9 空欄の場合このキリ番賞はありません)"
                                    extraLabelField={<Checkbox name="gachaLuckyNumber1MatchFlag" value={values.gachaLuckyNumber1MatchFlag} onInputChange={({ target: { name, checked } = {} }) => setFieldValue(name, Number(checked))} label="末尾部分一致" labelClass="mr-4" wrapClass="mr-5" />}
                                    name="gachaLuckyNumber1"
                                    inputClassName="w-full"
                                    wrapClass="w-full"
                                    handleOnBlurNumber={ ({ target: { name, value } }) => setFieldValue('gachaPrizes', generateGachaPrizePriority({...values, [name]: value})) }
                                />
                            </div>
                        </Section>

                        <Section caption="抽選動画設定(賞が重なったり連続の場合一番ランクの高い賞の動画が再生されます)" wrapClass="mt-5">
                            {Array.isArray(values.gachaPrizes) && values.gachaPrizes.map((x, i) => (
                                <div className="flex items-center">
                                    <GachaPriority gachaPrize={x} />
                                    <TagboxCustomV3Tab key={x.gachaPrizeId}
                                        name={`gachaPrizes[${i}]`}
                                        label={dynamicFieldLabel(x.gachaPrizeType, x.gachaPrizeName, 'video')}
                                        inputClassName="w-full"
                                        options={videos}
                                        videoTags={videoTags}
                                        initialData={x}
                                        valueExpr="videoId"
                                        displayExpr="videoName"
                                        keyUpdate="gachaPrizeSetVideo"
                                        searchEnabled={true}
                                        setFieldValue={setFieldValue}
                                        bgGroupedColorMapper={bgColorMapper}
                                        isLoading={gachaInitLoading}
                                        maxItemSelectLimit={16}
                                    />
                                </div>
                            ))}
                        </Section>

                        <Section caption="賞のアイテム設定(シナリオ確定後は編集しても影響がありません　アイテムを選ぶと１枚指定、カテゴリを選ぶとカテゴリー内ランダム)" wrapClass="mt-5">
                            {Array.isArray(values.gachaPrizes) && values.gachaPrizes.map((x, i) => (
                                <div className="flex items-center">
                                    <GachaPriority gachaPrize={x} />
                                    <TagboxCustomV4 key={x.gachaPrizeId}
                                        name={`gachaPrizes[${i}]`}
                                        label={dynamicFieldLabel(x.gachaPrizeType, x.gachaPrizeName, 'priceItem')}
                                        inputClassName="w-full"
                                        initialData={x}
                                        initialServerSelectedDataDetails={x.gachaPrizeSetItemData}
                                        valueExpr="id"
                                        displayExpr="caption"
                                        keyUpdate="gachaPrizeSetItem"
                                        searchEnabled={true}
                                        grouped={true}
                                        setFieldValue={setFieldValue}
                                        ondemandServiceUrl="/gacha/init"
                                        bgGroupedColorMapper={bgColorMapper}
                                        detailLoading={gachaDetailLoading}
                                        initLoading={gachaInitLoading}
                                        tagLoading={tagLoading}
                                        itemLoading={itemLoading}
                                        maxItemSelectLimit={64}
                                        tags={tags}
                                        tagDataSource={tagDataSource}
                                        itemDataSource={itemDataSource}
                                        selectedItems={x.gachaPrizeSetItem}
                                    />
                                </div>
                            ))}
                        </Section>

                        <Section caption="賞のpt設定(シナリオ画面から修正できますので上位の特別なアイテムはシナリオで調整してください)" wrapClass="mt-5">
                            {Array.isArray(values.gachaPrizes) && values.gachaPrizes.map((x, i) => (
                                <div className="flex items-center">
                                    <GachaPriority gachaPrize={x} />
                                    <NumberBox key={x.gachaPrizeId}
                                        min="0" max="9999999"
                                        isRequired={true}
                                        label={dynamicFieldLabel(x.gachaPrizeType, x.gachaPrizeName, 'awardPoint')}
                                        name={`gachaPrizes[${i}]`}
                                        value={x}
                                        keyUpdate="gachaPrizePoint"
                                        valueExpr="gachaPrizeId"
                                        inputClassName="w-full"
                                        wrapClass="w-full"
                                    />
                                </div>
                            ))}
                        </Section>

                        <Section caption={`賞の排出数設定(パック総数：${thousandSeparatedValue(getTotalCount(values), 0)}　排出総数：${thousandSeparatedValue(getTotalEmissionCount(values), 0)})　${getTotalCount(values) != getTotalEmissionCount(values) ? '⚠️数が同じではありません' : ''}`} wrapClass="mt-5">
                            {customGachaPrices(values.gachaPrizes).map((x, i) => (
                                <div className="flex items-center">
                                    <GachaPriority gachaPrize={x} />
                                    <NumberBox key={x.gachaPrizeId}
                                        min="0" max="9999999"
                                        isRequired={true}
                                        label={dynamicFieldLabel(x.gachaPrizeType, x.gachaPrizeName, 'emissionCount')}
                                        name={`gachaPrizes[${i}]`}
                                        value={x}
                                        keyUpdate="gachaPrizeEmissionsCount"
                                        valueExpr="gachaPrizeId"
                                        inputClassName="w-full"
                                        wrapClass="w-full"
                                    />
                                </div>
                            ))}
                        </Section>

                        <Section caption="メモ欄" wrapClass="mt-10">
                            <InputContainer className="space-y-2">
                                <TextAreaInput name="gachaMemo" label="メモ" inputClassName="w-full" />
                            </InputContainer>
                        </Section>

                        <div>
                            <Button
                                className='w-full mt-20 modal-button'
                                text='保存'
                                type="submit"
                                stylingMode="contained"
                                useSubmitBehavior={true}
                                disabled={isSubmitting}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}