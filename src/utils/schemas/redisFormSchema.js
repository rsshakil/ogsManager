import * as Yup from 'yup';
import { errorMessages } from '../errorMessages';

const redisFormSchema = Yup.object().shape({
    redisCommand: Yup.string().required('This field is required')
});

export const REDIS_FORM_INITIAL_VALUE = {
    redisCommand: "",
};

export default redisFormSchema;