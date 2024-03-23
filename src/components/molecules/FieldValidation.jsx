import React, { useState } from "react";

export default function FieldValidation({ children, ...rest }) {
    // console.log('restttttttttttt', rest)

    const [validate, setValidate] = useState({
        isTouched: false,
        isValid: true,
        errorType: ''
    });

    const fieldValidate = (e) => {
        console.log('event >>>>>>>', e)

        const validityObj = e.target.validity
        const { valid } = validityObj;

        let myObject = {};
        for (var key in validityObj) {
            myObject[key] = validityObj[key]
        }

        const trueKey = Object.keys(myObject).find(key => myObject[key] === true);

        let errorType = '';
        if (trueKey && trueKey !== 'valid') {
            errorType = trueKey
        }

        // console.log('validityObj ----------------->', validityObj)
        // console.log('trueKey', trueKey)
        // console.log('error type ????', errorType)

        setValidate({
            isTouched: true,
            isValid: valid,
            errorType: errorType
        })
    }

    return (
        children(validate, fieldValidate, rest)
    )
}