import Vue from 'vue';
import Portis from '@portis/web3';
import Web3 from 'web3';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';
import blockchainBasicDataFactory from './api/blockchainBasicData';
/* global web3 */
/* global ethereum */

let initialized = false;

function setBlckchainInPrototype(w3, isLogged, instance) {
  let rec;
  if (Vue.prototype.$blockchain) {
    rec = Vue.prototype.$blockchain;
  } else {
    rec = {
      web3Portis: w3,
      web3Inject: undefined,
      portis: instance,
      reader: undefined,
      submitter: undefined,
    };
    Vue.prototype.$blockchain = rec;
  }

  Vue.prototype.$blockchain.getWeb3 = function () {
    if (!isLogged && rec.web3Inject) {
      console.log('Web3 injected');
      return rec.web3Inject;
    }
    console.log('Web3 Portis');
    return rec.web3Portis;
  };
}

function initBlockchainData() {
  if (!Vue.prototype.$blockchainBasicData) {
    Vue.prototype.$blockchainBasicData = blockchainBasicDataFactory(
      Vue.prototype.$blockchain,
      store,
    );
  }
}

function initOrUpdateVue(portisWeb3, portisLogged, portisInstance) {
  Vue.config.productionTip = false;

  return new Promise((res, rej) => {
    setBlckchainInPrototype(portisWeb3, portisLogged, portisInstance);

    const isEthereum = !(typeof ethereum === 'undefined');

    if (isEthereum && portisLogged === false) {
      ethereum.enable().then(() => {
        Vue.prototype.$blockchain.web3Inject = web3;
        initBlockchainData();
        store.dispatch('networkStats/updateAccountInfo', Vue.prototype.$blockchain.getWeb3());
        res(true);
      }).catch((x) => {
        rej(x);
      });
    } else {
      initBlockchainData();
      res(false);
    }

    if (!initialized) {
      new Vue({
        router,
        vuetify,
        store,
        render: (h) => h(App),
      }).$mount('#app');
      initialized = true;
    }
  });
}

const portis = new Portis('ba1a2134-2bbe-441c-b856-5e8d13ebb80a', 'kovan', { gasRelay: true });
const web3Portis = new Web3(portis.provider);

portis.isLoggedIn().then(({ result }) => {
  if (result === false) {
    initOrUpdateVue(web3Portis, false, portis).then((status) => {
      if (!status) {
        portis.showPortis().then(() => {
          portis.changeNetwork('kovan');
        });
      }
    });
  } else {
    initOrUpdateVue(web3Portis, true, portis);
  }
});
portis.onLogin((walletAddress) => {
  store.commit('networkStats/setWalletAddress', walletAddress);
  initOrUpdateVue(web3Portis, true, portis);
  console.log('Portis onLogin');
});
portis.onLogout(() => {
  store.commit('networkStats/setWalletAddress', undefined);
  initOrUpdateVue(web3Portis, false, portis);
  console.log('Portis onLogout');
});
