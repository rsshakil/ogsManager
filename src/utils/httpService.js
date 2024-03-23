import axios from "axios";


const token = localStorage.getItem('accessToken');

//Create axios instance
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
    },
});

//Handle error commonly
instance.interceptors.response.use(
    (response) => {
        const { status = undefined, data } = response;
        if (status == 200 || status == 201) {
            return Promise.resolve(data);
        }

        console.log('Err >>', status);
        return Promise.reject(response);
    },
    (error) => {
        const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
        if (!expectedError) {
            console.log("Logging the error", error);
        }

        return Promise.reject(error);
    }
);


export default {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
};

