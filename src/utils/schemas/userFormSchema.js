import * as Yup from 'yup';
import { errorMessages } from '../errorMessages';

const userFormSchema = Yup.object().shape({
    userStatus: Yup.string().required(errorMessages.W_REQUIRED_01('総数')),
    userBillingFlag: Yup.string().required(errorMessages.W_REQUIRED_01('総数')),

});

export const USER_FORM_INITIAL_VALUE = {
    userID: '',
    userStatus: 1,
    userBillingFlag: 1,
    countryName: '',
    userEmail: '',
    password: '',
    userBillingStopperFlag: 0,
    userBirthday: '',
    userNickname: '',
    userName: '',
    userPalentalConsentFlag: '',
    userShippingAddress: [],
};

export default userFormSchema;