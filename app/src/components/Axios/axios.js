import axios from 'axios'

const mainAxios = axios.create({
    baseURL: 'https://hr-portal-api-v2.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        "Accept-Language": "az"
    },
});

/*
mainAxios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});
*/

/*
mainAxios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            localStorage.clear();
            window.location.href = '/login';
        }

        if (error.response.status === 406) {
            mainAxios({
                method: 'post',
                url: '/auth/refresh',
                data: {
                    token : localStorage.getItem('token')
                }
            }).then((res) => {
                console.log(res.data.data)
                localStorage.setItem('token', res.data.data);
                })
        }

        return Promise.reject(error);

    }
)
*/

export {
    mainAxios,
    axios
}

