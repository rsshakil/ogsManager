import axios from "axios";

const token = localStorage.getItem('accessToken');

//Create axios instance
const instance = axios.create({
    //baseURL: `${process.env.REACT_APP_API_URL??'https://rmam9v5a55.execute-api.ap-northeast-1.amazonaws.com'}/${process.env.REACT_APP_ENVIRONMENT??'develop'}`,
    baseURL: `${process.env.REACT_APP_API_URL ?? 'https://rmam9v5a55.execute-api.ap-northeast-1.amazonaws.com'}`,
    timeout: 120000, // 120 seconds
    headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
    },
});

// eslint-disable-next-line
export default {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
};