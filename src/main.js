import Vue from 'vue'
//import Vuex from 'vuex'
import App from './App.vue'
import store from './store/store'

Vue.config.productionTip = false
export const serverBus = new Vue();

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo)
//Vue.use(Vuex)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');

