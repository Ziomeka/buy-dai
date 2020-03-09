import Vue from 'vue';
import Portis from '@portis/web3';
import Web3 from 'web3';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';

const portis = new Portis('211b48db-e8cc-4b68-82ad-bf781727ea9e', 'rinkeby');
const web3 = new Web3(portis.provider);

Vue.config.productionTip = false;

Vue.prototype.$blockchain = {
  web3,
  portis,
  reader: undefined,
  submitter: undefined,
};


new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
