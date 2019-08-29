const UtooUtil = {
    clientVersion() {
        let ua = window.navigator.userAgent.toUpperCase(), clientVersion = null;
        if (ua.indexOf("UTOOCLIENT/IOS") > -1 || ua.indexOf("UTOOCLIENT/ANDROID") > -1) clientVersion = 'V3';
        if (ua.indexOf("UTOOCLIENT/IOS/V4") > -1 || ua.indexOf("UTOOCLIENT/ANDROID/V4") > -1) clientVersion = 'V4';
        return clientVersion;
    },
    clientType() {
        let ua = window.navigator.userAgent.toUpperCase(), clientType = null;
        if (ua.indexOf("UTOOCLIENT/IOS") > -1 || ua.indexOf("UTOOCLIENT/IOS/V4") > -1) clientType = 'IOS';
        if (ua.indexOf("UTOOCLIENT/ANDROID") > -1 || ua.indexOf("UTOOCLIENT/ANDROID/V4") > -1) clientType = 'ANDROID';
        return clientType;
    },
    bridgeV3Caller(func, params) {
        let result = null;
        switch (func) {
            case 'getStorage':
                result = appInterface.getToken(params.Key);
                break;
            case 'setStorage':
                result = appInterface.setToken(params.Key, params.Value);
                break;
            case 'rmStorage':
                result = appInterface.delToken(params.Key);
                break;
            case 'navigateTo':
                if (params.Name == 'login') {
                    result = appInterface.gotoLogin();
                }
                break;
            case 'navigateBack':
                result = appInterface.appBack();
                break;
            case 'navigateUrl':
            case 'navigateClose':
            case 'paycashier':
            case 'paychannel':
            default:
                break;
        }
        return result;
    },
    bridgeCaller(func, params = {}, isJson = true) {
        let clientVersion = UtooUtil.clientVersion(), clientType = UtooUtil.clientType(), result = null;
        try {
            switch (clientType) {
                case 'IOS':
                    if (clientVersion == 'V3') {
                        result = UtooUtil.bridgeV3Caller(func, params);
                    } else if (clientVersion == 'V4') {
                        result = prompt(JSON.stringify({funcName: func, args: params}));
                    } else {
                        throw new Error("发生异常:没有识别到正确的优途客户端.");
                    }
                    break;
                case 'ANDROID':
                    if (clientVersion == 'V3') {
                        result = UtooUtil.bridgeV3Caller(func, params);
                    } else if (clientVersion == 'V4') {
                        result = utoo[func](isJson ? JSON.stringify(params) : params);
                    } else {
                        throw new Error("发生异常:没有识别到正确的优途客户端");
                    }
                    break;
                default:
                    throw new Error("不支持优途客户端外使用");
                    break;
            }
            if (result && result !== "" && result !== undefined && result != null) {
                let res;
                try {
                    res = JSON.parse(result);
                } catch (e) {
                    res = result;
                }
                return res;
            } else {
                throw new Error("未获取到数据");
            }
        } catch (e) {
            console.warn(e.message);
            return false;
        }
    }
};
const UtooClient = {
    init(callback) {
        window.UtooPayCallBack = function (state) {
            if (typeof callback == "function") {
                callback(state);
            }
        };
    },
    env: {
        isUtoo() {
            let client = (UtooUtil.clientType() != null) && (UtooUtil.clientVersion() != null);
            console.debug(client, UtooUtil.clientType(), UtooUtil.clientVersion());
            return client;
        },
        isAndroid() {
            let u = window.navigator.userAgent;
            return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        },
        isIOS() {
            let u = window.navigator.userAgent;
            return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        }
    },
    native: {
        calltel(phone) {
            return UtooUtil.bridgeCaller('onCalltel', phone,false);
        },
        share(params = {}) {
            return UtooUtil.bridgeCaller('nativeshare', params);
        }
    },
    storage: {
        /**
         * 从存储区根据KEY获取一个数据
         * @param {String}key 键名称
         * @returns {*}
         */
        get(key) {
            return UtooUtil.bridgeCaller('getStorage', key, false);
        },
        /**
         * 存储区写入一个数据
         * @param {String}key 键名称
         * @param {String}value 内容
         * @returns {*}
         */
        set(key, value) {
            return UtooUtil.bridgeCaller('setStorage', {
                Key: key,
                Value: value
            });
        },
        /**
         * 从存储区删除一个数据
         * @param key
         * @returns {*}
         */
        rm(key) {
            return UtooUtil.bridgeCaller('rmStorage', key, false);
        }
    },
    navigate: {
        /**
         * 跳转到Name指定的界面
         * @param Name 界面标识
         * @param Params 携带的参数
         * @returns {*}
         */
        to(Name, Params = {}) {
            return UtooUtil.bridgeCaller('navigateTo', {
                Name: Name,
                Params: Params,
            });
        },
        url(Url, External) {
            return UtooUtil.bridgeCaller('navigateUrl', {
                Url: Url,
                External: External
            });
        },
        back() {
            return UtooUtil.bridgeCaller('navigateBack', null);
        },
        close() {
            return UtooUtil.bridgeCaller('navigateClose', null);
        }
    },
    pay: {
        cashier(orderSn, totalFee) {
            return UtooUtil.bridgeCaller('paycashier', {
                orderSn: orderSn,
                totalFee: totalFee
            });
        },
        channel(channelName = 'alipay', orderSn) {
            return UtooUtil.bridgeCaller('paychannel', {
                type: channelName,
                sn: orderSn
            });
        }
    },

};
export default UtooClient;