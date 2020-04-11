// import 'core-js/stable'
// import 'regenerator-runtime/runtime'
//
import '@babel/polyfill';
import 'intersection-observer';
//import "quasar/dist/quasar.css";
import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { getServerAddress } from './server-address.js';

import globalmixin from './mixin/global.js';
import CCHub from './hub/cchub.js';
import './quasar';

Vue.config.productionTip = false;

// J.Galanza - create event hub
Vue.prototype.$eventHub = new Vue();

var server_address = getServerAddress();
if (window.cashcall.serverAddress) server_address = window.cashcall.serverAddress
console.log('mainjs', window.cashcall)

// const instance = axios.create({
//   baseURL: server_address,
//   withCredentials: true,
//   header: {
//     'Access-Control-Allow-Origin': '*',
//   },
// });

axios.defaults.baseURL = server_address;
axios.defaults.withCredentials = true;
// axios.defaults.header = {
//   'Access-Control-Allow-Origin': 'http://localhost:8080/',
// };

Vue.prototype.$http = axios; // instance;


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(CCHub);

/**
 * Add default functions in Vue that's available globally
 */
Vue.mixin(globalmixin);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
