import axios from 'axios'

/**
 * 商城数据接口
 */
export default {
    goodsList(params = {}) {
        return axios.post("mall/goods/index", params);
    },
    goodsInfo(params = {}) {
        return axios.post("mall/goods/detail", params);
    },
    storeStreet(params = {}){
        return axios.post("promotion/store/street",params);
    }
};