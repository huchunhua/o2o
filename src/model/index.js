import qs from 'qs'
import axios from 'axios'
import store from '@/store/index'
import utoo from '@/utils/utoo'
import { Toast } from 'vant';

let modules = [];
const modulesContext = require.context('./modules', true, /\.js$/);

modulesContext.keys().forEach(module => {
    let moduleName = module.replace('./','').replace('.js','');
    modules[moduleName] = (modulesContext(module).default || modulesContext(module));
});
axios.interceptors.request.use(
    config => {
        store.dispatch("common/onLoading");
        config.baseURL = 'http://sichuan.95504.net/v4/';
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let _token = utoo.env.isUtoo() ? utoo.storage.get('token') : '30580467dc91ac73f803158acdba57a5';
        // let _token = utoo.env.isUtoo() ? utoo.storage.get('token') : '6c9f959633fff63714a902bbb953256f';
        // let _token =  '30580467dc91ac73f803158acdba57a5';
        if (_token) {
                if (typeof(config.data) == "undefined") {
                config.data = {token: _token};
            } else {
                config.data.token = _token;
            }
            if(config.url.indexOf('api.sichuan.95504.net') > -1) config.data.key = _token; //如果请求的是旧接口，则加上key
        }else  {
            utoo.navigate.to('login');
        }
        if (config.method === 'post') {
            config.data = qs.stringify(config.data)
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
axios.interceptors.response.use(response => {
    let resultData = response.data;
    if (resultData.code == 200) {
        store.dispatch("common/onLoaded");
        return Promise.resolve((response.config.url.indexOf('api.sichuan.95504.net') > -1) ? resultData.datas : resultData.data);
    }else{
        let msg = (response.config.url.indexOf('api.sichuan.95504.net') > -1) ? resultData.datas.error : resultData.msg;
        Toast(msg);
        return Promise.reject(msg)
    }
}, error => {
    store.dispatch("common/onLoaded");
    return Promise.reject(error)
});
export default new Object(modules);
