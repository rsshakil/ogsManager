import * as queries from "../../../../restapi/queries";
import httpService from "../../../../restapi/httpService";

export default function PostProcessReservationChange(options = {}, sendData = {}) {
    console.log('Post process ReservationChange clicked.....')

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

            let reservationId = sendData["reservationId"].fieldValue
            let customerId = sendData["customerId"].fieldValue

            console.log("[PostProcessReservationChange]sendData", sendData);
            console.log("[PostProcessReservationChange]reservationId ===============", reservationId);
            console.log("[PostProcessReservationChange]customerId ===============", customerId);

            const getReservationData = await httpService.put(queries.reservationMethod + reservationId + "?cid=" + customerId, JSON.stringify(sendData));
            console.log("reservationData", getReservationData);
            const { data, status } = getReservationData;

            return { functionType, status, data }
        }
        catch (err) {
            console.log('error message ====0803====>', err);
            console.log('error  change', err.response);

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

