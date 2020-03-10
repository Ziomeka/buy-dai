import Vue from 'vue';
import Portis from '@portis/web3';
import Web3 from 'web3';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';



let portis ;
let web3 ;

if(!ethereum){
  portis = new Portis('ba1a2134-2bbe-441c-b856-5e8d13ebb80a', 'mainnet');
  web3 = new Web3(portis.provider);
  portis.isLoggedIn().then(({ result }) => {
    if (result === false) {
      portis.showPortis().then(() => {
        portis.changeNetwork('kovan');
        initVue(web3,portis);
      });
    }
  });
}
else{
  portis = undefined;
  ethereum.enable().then(()=>{
    initVue(web3,portis);
  })
}

function initVue(web3,portis){
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
  
}
