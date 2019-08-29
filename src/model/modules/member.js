import axios from 'axios'

/**
 * 个人中心数据
 */
export default {
    //我的优惠券
    couponList(params = {}) {
        return axios.post("member/coupon/index", params);
    },
    //积分记录
    integralList(params = {}) {
        return axios.post("member/integral/index", params);
    },
    //收藏列表
    favoriteList(params = {}) {
        return axios.post("member/favorites/index", params);
    },
    //收货地址列表
    addressList(params = {}) {
        return axios.post("member/address/index", params);
    },
    //我的消息列表
    messageList(params = {}) {
        return axios.post("member/message/index", params);
    },
    //我的账单
    billList(params = {}) {
        return axios.post("member/bill/index", params);
    },
    //我的订单
    orderList(params = {}) {
        return axios.post("member/order/index", params);
    },
    //车辆列表
    catList(params = {}) {
        return axios.post("member/car/index", params);
    },
    //会员介绍
    vip(params = {}) {
        return axios.post("member/vip/index", params);
    },
    //会员介绍
    stafferRegister(params = {}) {
        return axios.post("member/staffer/register", params);
    },
};