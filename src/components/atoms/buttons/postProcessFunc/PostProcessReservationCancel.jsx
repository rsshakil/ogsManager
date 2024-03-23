import * as queries from "../../../../restapi/queries";
import httpService from "../../../../restapi/httpService";

export default function PostProcessReservationCancel(options = {}, sendData = {}) {
    console.log('Post process ReservationCancel clicked.....')
    const {
        functionType,
        setSpinnerStateValue = () => { },
        setButtonDisabled = () => { },
        buttonSpinnerKey = '',
        getCsrfToken = () => { },
    } = options;

    const fetchData = async () => {
        try {
            setSpinnerStateValue((prevState) => ({ ...prevState, [buttonSpinnerKey]: true }));
            setButtonDisabled(true);

            //Set csrf token
            const csrf = getCsrfToken();
            sendData.reservationCsrfToken = csrf;

            let reservationId = sendData["reservationId"].fieldValue
            let customerId = sendData["customerId"].fieldValue

            console.log("[PostProcessReservationCancel]sendData", sendData);
            console.log("[PostProcessReservationCancel]reservationId ===============", reservationId);
            console.log("[PostProcessReservationCancel]customerId ===============", customerId);

            // body は null なので updatedBy は pathParameter で渡す
            const getReservationData = await httpService.delete(queries.reservationMethod + reservationId + "?cid=" + customerId + "&updatedBy=" + sendData.updatedBy, { data: JSON.stringify(sendData) });
            // const getReservationData = await httpService.delete(queries.reservationMethod + reservationId + "?cid=" + customerId, JSON.stringify(sendData));
            console.log("[PostProcessReservationCancel]reservationData", getReservationData);
            const { data, status } = getReservationData;

            return { functionType, status, data }
        }
        catch (err) {
            console.log('error message ====0803====> cancel', err);
            console.log('error  cancel', err.response);

            let statusCode = 400;
            if (err.response) {
                const { data = {}, status = 400 } = err.response || '';
                const { errorCode = '' } = data || '';

                statusCode = errorCode ? errorCode : status;
            }

            return { functionType, status: statusCode }
        }
    };

    return fetchData;
}



