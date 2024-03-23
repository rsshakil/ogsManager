import * as Yup from 'yup';

const loginFormSchema = Yup.object().shape({
    accountId: Yup.string().required('ID is required'),
    password: Yup.string().required('Password is required'),
});

export const LOGIN_FORM_INITIAL_VALUE = {
    accountId: '',
    password: '',
};

export default loginFormSchema;