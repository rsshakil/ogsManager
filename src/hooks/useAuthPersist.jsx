import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

export default function useAuthPersist() {
    const dispatch = useDispatch();

    const [authPersist, setAuthPersist] = useState(false);

   useEffect(() => {
    const localAuthToken = localStorage.getItem('accessToken');
    const localAuthCsrf = localStorage.getItem('csrfToken');

    if(localAuthToken && localAuthCsrf) {
        dispatch(userLoggedIn({token: localAuthToken, csrf: localAuthCsrf}));
    }

    setAuthPersist(true);

   }, [])

   return authPersist
}

