import Vue from 'vue';
import Vuex from 'vuex';
import blockchainUser from './modules/blockchainUser';
import myOffers from './modules/myOffers';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    blockchainUser,
    myOffers,
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
});
