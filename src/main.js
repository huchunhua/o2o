import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import FastClick from 'fastclick'
import vueAMap from 'vue-amap'
import Vant from 'vant';
import VueQrcode from 'vue-qriously';
// import vconsole from 'vconsole';
import utils from '@/utils/common'
import model from '@/model/index'
import utoo from '@/utils/utoo'
import store from '@/store/index'
import 'vant/lib/index.css';
import '@/assets/styles/theme.css'
import '@/assets/styles/widget.css'
import norecord from '@/components/NoRecord';
import clipboard from 'clipboard';
import { Dialog } from 'vant';

import VueBarcode from '@xkeshi/vue-barcode';
// let vConsole = new vconsole();
Vue.use(vueAMap);
Vue.use(Vant);
Vue.use(VueQrcode);
Vue.use(Dialog);
Vue.prototype.clipboard = clipboard;
// Vue.use(vConsole);
Vue.component('norecord', norecord);
Vue.component('barcode', VueBarcode);
Vue.prototype.$utils = utils;
Vue.prototype.$http = axios;
Vue.prototype.$model = model;
Vue.prototype.$utoo = utoo;
FastClick.attach(document.body);
Vue.config.productionTip = false;
vueAMap.initAMapApiLoader({
  key: 'e95039a1960850d003fe2f3993a7a1cf',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    "AMap.Geolocation" //定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');
