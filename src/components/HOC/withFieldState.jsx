import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import _ from 'lodash';

const onChangeRecoilStateUpdateApplicableInputs = ['checkbox', 'radio'];

const withFieldState = (OriginalComponent) => {

    return class withFieldState extends React.Component {
        static propTypes = {
            initialFields: PropTypes.object
        }

        state = {
            fields: this.props.initialFields || {},
            touched: {},
            errorType: '',
            isValid: true,
        }

        componentWillReceiveProps(nextProps) {
            // replace fields with the incoming initialFields
            if (!isEqual(nextProps.initialFields, this.props.initialFields)) {
                this.setState(prevState => {
                    return {
                        fields: nextProps.initialFields,
                        touched: {}
                    }
                })
            }
        }

        checkboxProps = (name) => {
            return {
                ...this.inputProps(name),
                checked: Boolean(this.state.fields[name])
            }
        }

        handleBlurEvent = (event, callBackFunc = () => { }, unchangableIds = []) => {
            const { name, type, value } = event.target;
            let options = {};

            if (type !== 'checkbox') {
                if (type.includes("select")) {
                    if (!unchangableIds.includes(value)) {
                        let min = Number(event.target.getAttribute('min'));
                        let max = Number(event.target.getAttribute('max'));

                        let currentState = Array.isArray(this.state.fields[name]) ? this.state.fields[name] : [this.state.fields[name]];
                        const totalItemCount = currentState.length;

                        console.log('im checking value', totalItemCount)
                        console.log('im checking value min', min)
                        if (min) {
                            options = { validateCustom: true, validationType: 'min', value: min, totalSelected: totalItemCount };
                        }
                    }
                }

                this.validityCheck(event, options);
                this.touchField(event.target.name);

                // if (!onChangeRecoilStateUpdateApplicableInputs.includes(type) && _.isFunction(callBackFunc)) {
                //     callBackFunc(value);
                // }
            }
        }

        handleChangeEvent = (event, callBackFunc = () => { }, unchangableIds = []) => {
            const { checked, name, type, value } = event.target;

            if (type === 'checkbox') {
                if (!unchangableIds.includes(name)) {

                    const updatedCheckedValues = (checked == true) ? { ...this.state.fields, [name]: checked } : _.omit(this.state.fields, name);

                    let min = event.target.min ? Number(event.target.min) : event.target.min;
                    let max = event.target.max ? Number(event.target.max) : event.target.max;

                    if (min) {
                        const totalItemCount = Object.values(updatedCheckedValues).filter((value) => value).length;  // take only true value

                        this.validityCheck(event, { validateCustom: true, validationType: 'min', value: min, totalSelected: totalItemCount });
                    }

                    if (max && (checked && max <= Object.values(this.state.fields).filter((value) => value).length)) {
                        return;
                    }


                    this.setState(prevState => ({
                        ...prevState,
                        fields: updatedCheckedValues
                    }))

                    // this.setField(name, checked);

                    console.log('name name ................>', updatedCheckedValues)
                    console.log('max counting ................> max', max)
                    console.log('max counting ................> checked', checked)
                }

                this.touchField(event.target.name);
            }
            else if (type.includes("select")) {
                const max = event.target.getAttribute('max') ? Number(event.target.getAttribute('max')) : event.target.getAttribute('max');
                const selectedItems = [...event.target.selectedOptions].map(option => option.value);
                const totalItemCount = selectedItems.length;

                // console.log('my val checking event ??', selectedItems)
                // console.log('value cjeckiii > totalItemCount', totalItemCount)
                // console.log('max value >>', max)

                if (max && totalItemCount > max) {
                    return;
                }
                // console.log('passing ...', max)
                this.setFields({ [name]: selectedItems.map(k => { return { id: k, checked: true } }) });
            }
            else {
                this.setField(name, value);
            }

            // if (type === 'radio' && _.isFunction(callBackFunc)) {
            //     callBackFunc(value);
            // }

            if (_.isFunction(callBackFunc)) {
                callBackFunc(value);
            }
        }

        validityCheck = (e, option = { validateCustom: false, validationType: '' }) => {
            let errorType = '';
            let isValid = true;

            const { validateCustom, validationType } = option;

            if (!validateCustom) {
                //validation from input event like: pattern, required, min, max
                const {
                    badInput,
                    customError,
                    patternMismatch,
                    rangeOverflow,
                    rangeUnderflow,
                    stepMismatch,
                    tooLong,
                    tooShort,
                    typeMismatch,
                    valueMissing,
                    valid
                } = e.target.validity;

                if (!valid) {
                    if (valueMissing) errorType = 'required';
                    else if (patternMismatch) errorType = 'pattern';
                    else if (typeMismatch) errorType = 'type';
                    else if (rangeUnderflow) errorType = 'min';
                    else if (rangeOverflow) errorType = 'max';
                    else if (stepMismatch) errorType = 'step';
                    // else if (rangeOverflow || rangeUnderflow) errorType = 'range';
                    // else if (patternMismatch) errorType = 'pattern';
                    console.log('something went wrong ? errorType', errorType)
                }
                isValid = valid;
            }
            else {
                //custom validation for checkbox min selection
                if (validationType === 'min') {
                    if (option.totalSelected < option.value) {
                        errorType = validationType;
                        isValid = false;
                    }
                }
            }

            this.setState(prevState => ({
                ...prevState,
                errorType,
                isValid: isValid,
            }))
        }

        isFieldDirty = (name) => {
            const initialValue = (this.props.initialFields || {})[name]
            // console.log('>>>>>>>>>>>>>>>>>>>>>>> name', name)
            // console.log('>>>>>>>>>>>>>>>>>>>>>>> initialValue', initialValue)
            // console.log('>>>>>>>>>>>>>>>>>>>>>>> this.state.fields[name]', this.state.fields[name])
            return this.state.fields[name] !== initialValue
        }

        isFieldTouched = (name) => {
            return Boolean(this.state.touched[name])
        }

        inputProps = (name, callBackFunc = () => { }, unchangableIds = [], allowValue = true) => {
            const value = this.state.fields[name] || '';

            let obj = {
                onBlur: (e) => this.handleBlurEvent(e, callBackFunc, unchangableIds),
                onChange: (e) => this.handleChangeEvent(e, callBackFunc, unchangableIds)
            }

            if (allowValue) {
                obj.value = value;
            }

            return obj;
        }

        setField = (name, value) => {
            this.setFields({ [name]: value })
        }

        setFields = (fields = {}) => {
            this.setState(prevState => {
                return {
                    fields: {
                        ...prevState.fields,
                        ...fields
                    }
                }
            })
        }

        touchField = (name) => {
            if (this.isFieldTouched(name)) {
                return
            }

            this.setState(prevState => {
                return {
                    touched: {
                        ...prevState.touched,
                        [name]: true
                    }
                }
            })
        }

        render() {
            const isDirty = !isEqual(this.state.fields, this.props.initialFields)
            const isTouched = Object.keys(this.state.touched).length > 0
            const errorType = this.state.errorType;


            console.log('*****************************************TTTT', this.state.touched)

            const props = {
                ...this.props,
                errorType,
                checkboxProps: this.checkboxProps,
                fields: this.state.fields,
                // handleChangeEvent: this.handleChangeEvent,
                inputProps: this.inputProps,
                isDirty,
                isFieldDirty: this.isFieldDirty,
                isFieldTouched: this.isFieldTouched,
                isTouched,
                setField: this.setField,
                setFields: this.setFields,
                touchField: this.touchField
            }

            return <OriginalComponent {...props} />
        }
    }

}


export default withFieldState;