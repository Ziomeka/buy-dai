import Vue from 'vue';
import Portis from '@portis/web3';
import Web3 from 'web3';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';
import blockchainBasicDataFactory from './api/blockchainBasicData';

function initVue(web3instance, portisInstance) {
  Vue.config.productionTip = false;

  Vue.prototype.$blockchain = {
    web3: web3instance,
    portis: portisInstance,
    reader: undefined,
    submitter: undefined,
  };

  Vue.prototype.$blockchainBasicData = blockchainBasicDataFactory(web3instance, store);

  new Vue({
    router,
    vuetify,
    store,
    render: (h) => h(App),
  }).$mount('#app');
}

const portis = new Portis('ba1a2134-2bbe-441c-b856-5e8d13ebb80a', 'kovan', { gasRelay: true });
const web3 = new Web3(portis.provider);
portis.isLoggedIn().then(({ result }) => {
  initVue(web3, portis);
  if (result === false) {
    portis.showPortis().then(() => {
      portis.changeNetwork('kovan');
    });
  }
});
