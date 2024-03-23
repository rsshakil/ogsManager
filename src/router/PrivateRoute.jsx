
import { Navigate, useLocation} from "react-router-dom";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { useCheckSessionMutation } from "../features/auth/authApi";
import { useEffect } from "react";

export default function PrivateRoute({children}) {
    const location = useLocation();
    const {pathname} = location || {};
    const {accessToken, csrfToken} = useLoggedInUser();

    const [checkSession, {isLoading}] = useCheckSessionMutation();

    useEffect(() => {
        const triggerCheckSessionApi = async () => {
            const data = {path: pathname.slice(1), csrf: csrfToken}
            await checkSession(data);
        }

        triggerCheckSessionApi();
    }, [location])

    return (accessToken && csrfToken) ? children : <Navigate to="/" /> 
}