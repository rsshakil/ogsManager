import InputContainer from '../../Wrapper/InputContainer';
import SelectBox from './SelectBox';
const conditionOptions = [{ id: 1, value: 'なし' }];

const FieldTextType = () => {
    return (
        <div className="mx-8">
            <label className="text-blue-100">条件群 #1</label>
            <div className="mx-8">
                <label className="text-blue-100">表示条件 #1</label>
                <InputContainer>
                    <SelectBox
                        label="条件フィールド"
                        labelClassName="text-blue-100"
                        inputClassName="bg-blue-25"
                        name="abc"
                    >
                        <option key="default" value="3">
                            3
                        </option>
                        {conditionOptions.length > 0 &&
                            conditionOptions.map((field) => (
                                <option value={field.id} key={field.id}>
                                    {field.value}
                                </option>
                            ))}
                    </SelectBox>
                </InputContainer>
                <InputContainer>
                    <SelectBox label="条件式" labelClassName="text-blue-100" inputClassName="bg-blue-25" name="abc">
                        <option key="default" value="3">
                            3
                        </option>
                        {conditionOptions.length > 0 &&
                            conditionOptions.map((field) => (
                                <option value={field.id} key={field.id}>
                                    {field.value}
                                </option>
                            ))}
                    </SelectBox>
                </InputContainer>
                <InputContainer>
                    <SelectBox label="値" labelClassName="text-blue-100" inputClassName="bg-blue-25" name="abc">
                        <option key="default" value="3">
                            3
                        </option>
                        {conditionOptions.length > 0 &&
                            conditionOptions.map((field) => (
                                <option value={field.id} key={field.id}>
                                    {field.value}
                                </option>
                            ))}
                    </SelectBox>
                </InputContainer>
            </div>
        </div>
    );
};
export default FieldTextType;
