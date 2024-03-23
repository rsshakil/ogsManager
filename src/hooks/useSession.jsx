import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import session from '../store/sessionState'
import { accessState } from '../store/accessState'
import useCsrfToken from './useCsrfToken'

const ENDPOINT =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_CHECK_SESSION_LOCALHOST
        : process.env.REACT_APP_CHECK_SESSION_PRODUCTION

const headers = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Access-Control-Allow-Origin': origin,
}

const useSession = (pathname) => {
    const navigate = useNavigate()
    const [{ loading, error, state }, setValid] = useRecoilState(session)
    const [recoilStateValue, setRecoilState] = useRecoilState(accessState);
    const { getCsrfToken } = useCsrfToken();

    const key = sessionStorage.getItem('key');

    useEffect(() => {
        setValid(prevState => ({
            ...prevState,
            loading: false
        }))

        console.log("ENDPOINT");
        console.log(ENDPOINT);
        fetch(ENDPOINT, {
            body: JSON.stringify({ csrf: getCsrfToken(), key: key }),
            method: 'POST',
            headers: headers,
            credentials: 'include',
            mode: 'cors',
        })
            .then((res) => res.json())
            .then(({ flag }) => {
                flag
                    ?
                    setValid(prevState => ({
                        ...prevState,
                        loading: false,
                        state: true,
                        error: null,
                    }))
                    :
                    setValid(prevState => ({
                        ...prevState,
                        loading: false,
                        state: false,
                        error: null,
                    }))
                !flag && navigate('/')
            })
            .catch((err) => {
                console.log('Error => ,', err)
                setValid(prevState => ({
                    ...prevState,
                    loading: false,
                    state: false,
                    error: err.message,
                }))
                navigate('/')
            })
    }, [pathname])

    return { loading, error, state }
}

export default useSession
