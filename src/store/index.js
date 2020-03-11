import Vue from 'vue';
import Vuex from 'vuex';
import blockchainUser from './modules/blockchainUser';
import networkStats from './modules/networkStats';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    blockchainUser,
    networkStats,
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
});
