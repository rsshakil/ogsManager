import { useSelector } from "react-redux";

export default function useLoggedInUser() {
    const {accessToken, csrfToken} = useSelector(state => state.auth) || {}

    return {
        accessToken,
        csrfToken,
    }
}

