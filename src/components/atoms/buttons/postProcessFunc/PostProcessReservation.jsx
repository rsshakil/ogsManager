import * as queries from "../../../../restapi/queries";
import httpService from "../../../../restapi/httpService";

export default function PostProcessReservation(options = {}, sendData = {}) {
    console.log('Post process Reservation clicked.....')
    const {
        functionType,
        setSpinnerStateValue = () => { },
        setButtonDisabled = () => { },
        buttonSpinnerKey = '',
        getCsrfToken = () => { },
    } = options;

    const fetchApi = async () => {
        try {
            setSpinnerStateValue((prevState) => ({ ...prevState, [buttonSpinnerKey]: true }));
            setButtonDisabled(true);

            //Set csrf token
            const csrf = getCsrfToken();
            sendData.reservationCsrfToken = csrf;

            console.log("sendData", sendData);

            const getReservationData = await httpService.post(queries.reservationMethod, JSON.stringify(sendData));
            const { data, status } = getReservationData;

            console.log("try > reservation create", getReservationData);

            return { functionType, status, data }
        }
        catch (err) {
            console.log('catch error message reservation create >>', err);
            console.log('err.response', err.response);

            let statusCode = 400;
            if (err.response) {
                const { data = {}, status = 400 } = err.response || '';
                const { errorCode = '' } = data || '';

                statusCode = errorCode ? errorCode : status;
            }

            return { functionType, status: statusCode }
        }
    };

    return fetchApi;
} 
