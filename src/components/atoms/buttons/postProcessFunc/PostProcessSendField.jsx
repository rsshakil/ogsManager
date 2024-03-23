import * as queries from "../../../../restapi/queries";
import httpService from "../../../../restapi/httpService";

export default function PostProcesFieldSendField(options = {}, sendData = {}) {
    console.log('Post process sendField clicked.....')
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

            //Set csrf Token
            const csrf = getCsrfToken();
            sendData.reservationCsrfToken = csrf;

            console.log("sendData", sendData);

            const getReservationData = await httpService.post(queries.fieldDataCreate, JSON.stringify(sendData));
            console.log("reservationData", getReservationData);
            const { status } = getReservationData;

            return { functionType, status }
        }
        catch (err) {
            console.log('error message ====0803====>', err);

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

