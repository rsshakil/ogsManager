import { Button } from "devextreme-react/button";
import { Form, Formik } from "formik";
import { useRef, useEffect, useState } from "react";

import { useModal } from "../../../../contexts/ModalContext";
import { useToast } from "../../../../contexts/ToastContext";
import Loader from "../../../atoms/Loading/TherapistLoader";
import http from "../../../../restapi/httpService";

import useFetchGachaCalculationQuery from "../../../../hooks/useFetchGachaCalculationQuery";
import useFetchGachaTargetValueReadQuery from "../../../../hooks/useFetchGachaTargetValueReadQuery";
import InputContainer from "../../FormInputs/InputContainer";
import NumberBox from "../../FormInputs/NumberBox";
import Section from "../../FormInputs/Section";
import TextBox from "../../FormInputs/TextBox";
import GachaFormBuild from "./GachaFormBuild";
import {unixTimestampToDateFormat,thousandSeparatedValue} from "../../../../utils/commonFunctions";

export default function GachaScenarioCalculation({ gachaId, productName }) {
    const formikRef = useRef();
    const [loadings, setLoadings] = useState(false);
    const [formValue, setFormValue] = useState([]);

  const { isModalOpen: refetch, closeModal:closeThisModal, showModal, tableRef } = useModal();
  const { showToast } = useToast();
  const dataGridRef = useRef(null);
    const { data: { records }, isLoading: gachaDetailLoading } = useFetchGachaCalculationQuery(gachaId, refetch);
    const { data: { records:gachaTargetValues }, isLoading: gachaDetailLoadings } = useFetchGachaTargetValueReadQuery(gachaId, refetch);
  
  const closeCurrentModal = () => {
    closeThisModal();
    if (formikRef.current) {
        formikRef.current.resetForm();
    }
    showModal(productName, <GachaFormBuild gachaId={gachaId} productName={productName} closeModal={closeThisModal} tableRef={dataGridRef} showSecnarioModalWithoutPass={true}/>);
  }
    //For create
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
      //updateTargetValue
      let numberOfPlayers = values.gachaDayTargetNumberOfPlayers.toString().split(",").join("");
      try {
        setLoadings(true);
        const response = await http.put(`/manager/target/value/${gachaId}`, {gachaHourTargetValue:values?.gachaHourTargetValue,gachaDayTargetNumberOfPlayers:numberOfPlayers});
        const { status } = response;

        if (status === 200) {
            console.log("success");
            closeThisModal();
            showModal(productName, <GachaFormBuild gachaId={gachaId} productName={productName} closeModal={closeThisModal} tableRef={dataGridRef} showSecnarioModalWithoutPass={true}/>);
            
        }
        setLoadings(false);
      } catch (err) {
          console.log('error-->', err)
          showToast('システムエラーが発生しました。システム管理者に連絡してください', 'error');
          setLoadings(false);
      }
  };
  const displayFieldValue = (value) => {
    if (value) {
      return `${value}%`;
    }
    return '';
    
  }
  console.log("gachaTargetValues",gachaTargetValues);
  const gachaSinglePoint = gachaTargetValues && gachaTargetValues?.gachaSinglePoint;
  const gachaTotalCount = gachaTargetValues && gachaTargetValues?.gachaTotalCount;
  const gachaStartDate = gachaTargetValues && gachaTargetValues?.gachaStartDate;
  
  useEffect(()=>{
    setFormValue({...records,...gachaTargetValues})
  },[gachaTargetValues,records])
  const displayDaysHour =(totalSec) => {
    if(isFinite(totalSec)){
      return Math.floor(totalSec / 3600) + '時間' + Math.floor(totalSec % 3600/60) + '分';
    }else{
      return "";
    }
  }

  const displaySoldOutDate =(totalSec) => {
    if(isFinite(totalSec)){
      let endDate = gachaStartDate+totalSec;
      return unixTimestampToDateFormat(endDate, true, true);
    }else{
      return "";
    }
  }

  return (
    <div className="gachaScenarioCalculation">
      {(gachaDetailLoading || gachaDetailLoadings || loadings)  && <Loader />}

      <Formik
        innerRef={formikRef}
        initialValues={formValue}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <Section caption="パック収支（時/日）">
              <InputContainer>
                <TextBox
                      name={`gachaHourTargetValue`}
                      wrapClass="relative"
                      label={`目標一時間単位回転数`}
                      labelClassName=""
                      onKeyDown={(event) => {
                        if (/^\d*\.?\d*$/.test(event.key)) {
                          console.log("valid input")
                        }else{
                          console.log("keyCode",event.key)
                          if(event.key === "Backspace" || event.key === "Delete"){
                            console.log("valid input")
                          }else{
                            event.preventDefault();
                          }
                        }
                    }}
                      inputClassName="w-full text-right"
                    />
                <TextBox
                      name={`revolutionsPerDay`}
                      wrapClass="relative"
                      label={`目標一日単位回転数`}
                      value={thousandSeparatedValue(values?.gachaHourTargetValue*24,0)}
                      labelClassName=""
                      disabled={true}
                      inputClassName="w-full text-right"
                    />
              </InputContainer>
              <div className="flex mb-4">
                <div className="w-1/2 mr-4">
                  <TextBox
                    name={`targetConsumptionPointPerHour`}
                    wrapClass="relative"
                    label={`一時間あたりの目標消費ポイント`}
                    labelClassName=""
                    value={thousandSeparatedValue(values?.gachaHourTargetValue * gachaSinglePoint,0)}//TODO single point will be dynamic
                    disabled={true}
                    inputClassName="w-full text-right"
                  />
                </div>
                <div className="w-1/2">
                  <TextBox
                    name={`targetConsumptionPointPerDay`}
                    wrapClass="relative"
                    label={`一日あたりの目標消費ポイント`}
                    labelClassName=""
                    value={thousandSeparatedValue(values?.gachaHourTargetValue * gachaSinglePoint * 24,0)}//TODO single point will be dynamic
                    disabled={true}
                    inputClassName="w-full text-right"
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 mr-4">
                  <TextBox
                    name={`targetConsumptionPointRedemptionPerHour`}
                    wrapClass="relative"
                    label={`一時間あたりの目標消費ポイント（還元後）`}
                    labelClassName=""
                    value={thousandSeparatedValue(Math.floor(values?.gachaHourTargetValue * gachaSinglePoint/((100 - records?.returnRateWithoutCeiling) / 100)),0)}
                    disabled={true}
                    inputClassName="w-full text-right"
                  />
                </div>
                <div className="w-1/2">
                  <TextBox
                    name={`targetConsumptionPointRedemptionPerDay`}
                    wrapClass="relative"
                    label={`一日あたりの目標消費ポイント（還元後）`}
                    labelClassName=""
                    value={thousandSeparatedValue(Math.floor(values?.gachaHourTargetValue * gachaSinglePoint * 24 /((100 - records?.returnRateWithoutCeiling) / 100)),0)}
                    disabled={true}
                    inputClassName="w-full text-right"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 mr-4">
                  <TextBox
                    name={`targetEndTime`}
                    wrapClass="relative"
                    label={`目標終了時間`}
                    labelClassName=""
                    value={displayDaysHour(gachaTotalCount / values?.gachaHourTargetValue * 60 * 60)}
                    disabled={true}
                    inputClassName="w-full text-right"
                  />
                </div>
                <div className="w-1/2">
                  <TextBox
                      name={`targetSoldOutDate`}
                      wrapClass="relative"
                      label={`目標完売日時`}
                      labelClassName=""
                      value={displaySoldOutDate(gachaTotalCount / values?.gachaHourTargetValue * 60 * 60)}
                      disabled={true}
                      inputClassName="w-full text-right"
                    />
                </div>
              </div>
              <InputContainer className={`mt-4`}>
                  <NumberBox
                    name={`gachaDayTargetNumberOfPlayers`}
                    wrapClass="relative"
                    label={`目標一日単位遊技人数`}
                    labelClassName=""
                    inputClassName="w-full text-right"
                  />
              </InputContainer>
            </Section>
            <Section caption="パック収支（総額）">
              <InputContainer>
                  {/* <TextBox
                    name={`gachaTotalCount`}
                    wrapClass="relative"
                    label={`想定ユーザー数(天井到達の計算に利用されます)`}
                    labelClassName=""
                                      type="number"
                                      onkeypress={(e)=>calculateScenario(e)}
                                      onBlur={updateFormData}
                    inputClassName="w-full text-right"
                  /> */}
                  <NumberBox
                    name={`totalConsumptionPoint`}
                    wrapClass="relative"
                    label={`総消費pt`}
                    labelClassName=""
                    disabled={true}
                    inputClassName="w-full text-right"
                  />
              </InputContainer>
              <div className="flex mb-4">
                <div className="w-1/2 mr-4">
                  <NumberBox
                    name={`totalRewardPointWithoutCeiling`}
                    wrapClass="relative"
                    label={`総還元pt（賞＋おまけ　天井は除く）`}
                    labelClassName=""
                    disabled={true}
                    inputClassName="w-full text-right"
                  />
                </div>
                <div className="w-1/2">
                  <TextBox
                    name={`returnRateWithoutCeiling`}
                    wrapClass="relative"
                    label={`還元率（賞＋おまけ　天井は除く）`}
                    value={`${records && displayFieldValue(records.returnRateWithoutCeiling)}`}
                    labelClassName=""
                    disabled={true}
                    inputClassName="w-full text-right"
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 mr-4">
                  <NumberBox
                    name={`totalRewardPointWithCeiling`}
                    wrapClass="relative"
                    label={`総還元pt（賞＋おまけ　総回数/想定ユーザーで天井を加算）`}
                    labelClassName=""
                    disabled={true}
                    inputClassName="w-full text-right"
                  />
                </div>
                <div className="w-1/2">
                  <TextBox
                    name={`returnRateWithCeiling`}
                    wrapClass="relative"
                    label={`還元率（賞＋おまけ　総回数/想定ユーザーで天井を加算）`}
                    labelClassName=""
                    value={`${records && displayFieldValue(records.returnRateWithCeiling)}`}
                    disabled={true}
                    inputClassName="w-full mt-5 text-right"
                  />
                </div>
              </div>
            </Section>

            <div className="flex flex-col">
              <Button
                className="w-full modal-button3"
                text={`戻る`}
                // type="submit"
                onClick={closeCurrentModal}
                stylingMode="contained"
                useSubmitBehavior={false}
                disabled={isSubmitting}
              />

              <Button
                className="w-full modal-button2"
                text={`保存`}
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
  );
}
