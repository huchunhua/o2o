import axios from 'axios'
export default {
    getBillList(params = {}){
        return axios.post("member/bill",params);
    },
    getBillStat(params = {}){
        return axios.post("member/bill/stat",params);
    },
    getBillDetail(params = {}){
        return axios.post("member/bill/detail",params);
    }
};