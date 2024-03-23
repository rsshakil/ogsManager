import TagBox from 'devextreme-react/tag-box';
import _ from "lodash";
import React, { useCallback } from 'react';
import { useFormikContext } from 'formik';
import AddRequiredText from '../../HelpingComponent/AddRequiredText';

export default function TagboxInput({ name, isCheckboxShow=false, label, wrapClass = "", labelClassName, inputClassName, isRequired, requiredText, dataSource = [], selectedTags = [], valueExpr = "id", displayExpr = "caption", placeholder = "Select tags...", keyUpdate = "", ...rest }) {
    // Access the Formik context
    const formik = useFormikContext();

    // Function to update the specific field
    const onValueChanged = useCallback((e) => {
        const { value = [], previousValue = [] } = e || {};
        let arr = e.component.option('values'); 
        console.log("arr",e);
        value && value.sort((a, b) => a - b);
        if (Array.isArray(value) && !_.isEqual(previousValue, value)) {
            console.log('my value --------------->', value)

            //check data type is array of object
            if (/\[.*\]/.test(name)) {//This is array type field
                const matches1 = /\[(\d+)\]/.exec(name);
                const extractedIndex = matches1[1];

                const match2 = name.match(/^(.*?)\[\d+\]/);
                const extractedText = match2[1];

                const { values = {} } = formik || {};

                let updatedState = values[extractedText] || [];

                if (updatedState[extractedIndex]) {
                    updatedState[extractedIndex] = { ...updatedState[extractedIndex], [keyUpdate]: value }
                }

                // console.log('my eee', e)
                // console.log('my eee name', name)
                console.log('my eee extractedText', extractedText)
                console.log('my eee name', updatedState)
                // console.log('my formik formik', formik)
                formik.setFieldValue(extractedText, updatedState);
            }
            //This is object type field
            else {
                formik.setFieldValue(name, value);
            }
        }
    }, []);

    return (
        <div className={`${wrapClass}`}>
            {label && (
                <label className={`${labelClassName}`}>
                    {label} {isRequired ? <AddRequiredText requiredText={requiredText} /> : null}
                </label>
            )}

            <TagBox
                className={`${inputClassName} !rounded-none`}
                dataSource={dataSource}
                valueExpr={valueExpr} // Specify the property to use as the value
                displayExpr={displayExpr} // Specify the property to display as the tag label
                value={selectedTags}
                placeholder={placeholder}
                showSelectionControls={true}
                showClearButton={true}
                onValueChanged={onValueChanged}

                {...rest}
            />
        </div>
    )
}