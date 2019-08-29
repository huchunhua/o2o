import axios from 'axios'
export default {
    stafferCompany(params = {}) {
        return axios.post("member/staffer/picker", params);
    },
    getSeccode(params = {}) {
        return axios.post("member/account/sendsms", params);
    },
    getCarBrandLists(params = {}) {
        return axios.post("member/Car/getCarBrandLists", params);
    },
};