
// import { toast } from 'react-toastify';

export function handleApiResponse(response) {
    const { success, data = undefined, error = undefined } = response || {};

    if (error) {
        const errorObj = error?.data || error;
        const statusCode = error?.status;

        if (statusCode == 422) {
            const validationErrors = Object.values(errorObj?.error);
            const singleError = validationErrors.length > 0 ? validationErrors[0][0] : '';
            // toast.error(singleError);

        } else {
            const errorMessage = errorObj?.error || errorObj.message;
            // toast.error(errorMessage);
        }
    }

    return data;
}