import { useToast } from "../contexts/ToastContext";

export default function useMutationApiResponse(validationSchema, ignoredNumberCheckKeys =[]) {
    const { showToast } = useToast();

    const trigger = async ({ values, setSubmitting = () => { }, mutatedApi = () => { }, resetForm = () => { }, closeModal = () => { } }) => {
        try {
            const modifiedValues = convertCommaSeparatedValuesToNumber(values, ignoredNumberCheckKeys);

            if (validationSchema) await validationSchema.validate(modifiedValues, { abortEarly: false });

            setSubmitting(true);
            const { data, error } = await mutatedApi(modifiedValues);
            setSubmitting(false);

            if (!error) {
                closeModal();
                resetForm();

                return { success: true, data };
            }
            //Handle server error
            else {
                const { data: { message } = {} } = error || {};
                showToast(message, 'error');

                return { success: false, data: undefined };
            }
        } catch (error) {
            // console.error('All errors:', error);
            if (error.name === 'ValidationError') {
                const validationErrors = [];
                error.inner.forEach((validationError) => {
                    validationErrors.push(validationError.message);
                });

                showToast(validationErrors, 'warning');
                console.error('Validation errors:', validationErrors);
            }

            return { success: false, data: undefined };
        }
    }


    function convertCommaSeparatedValuesToNumber(obj, ignoredNumberCheckKeys = []) {
        for (const key in obj) {
        

            if (obj.hasOwnProperty(key) && !ignoredNumberCheckKeys.includes(key)) {
                const value = obj[key];

                if (typeof value === 'string' && value.includes(',')) {
                    const numericValue = parseFloat(value);

                    if (!isNaN(numericValue)) {
                        // Remove commas and convert to a number
                        obj[key] = parseFloat(value.replace(/,/g, ''));
                    }
                }
                else if (Array.isArray(value)) {
                    // If the property is an array, recursively process its elements
                    obj[key] = value.map(item => {
                        if (typeof item === 'object') {
                            return convertCommaSeparatedValuesToNumber(item, ignoredNumberCheckKeys);
                        }
                        return item;
                    });
                }
                else if (typeof value === 'object') {
                    // If the property is an object, recursively process its properties
                    obj[key] = convertCommaSeparatedValuesToNumber(value, ignoredNumberCheckKeys);
                }
            }
        }
        return obj;
    }


    return {
        trigger
    }
}