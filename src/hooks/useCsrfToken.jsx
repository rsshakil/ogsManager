import { useRecoilState } from 'recoil';
import session from '../store/sessionState';

export default function useCsrfToken() {
    const [sessionValue, setSessionValue] = useRecoilState(session)

    const getCsrfToken = () => {
        let token = getExistingTokenFromHeader();
        if (!token) {
            token = sessionValue.csrf;
        }
        return token;
    }

    const setCsrfToken = (token) => {
        document.querySelector('meta[name="csrf-token"]').setAttribute("content", token);

        console.log('my checking -------------')
        console.log('new token: ', token)
        console.log('new sessionValue: ', sessionValue)

        setSessionValue(prevState => ({
            ...prevState,
            csrf: token,
            error: 'bla bla'
        }))
    }

    return { getCsrfToken, setCsrfToken };
}

function getExistingTokenFromHeader() {
    return document.querySelector('meta[name="csrf-token"]').content;
}