import axios from 'axios'

export default {
    discover(params = {}) {
        return axios.post("promotion/page/index", params);
    },
    detail(params = {}) {
        return axios.post("promotion/page/detail", params);
    },
};