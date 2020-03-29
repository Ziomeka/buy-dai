import Vue from 'vue';
import Vuex from 'vuex';
import blockchainUser from './modules/blockchainUser';
import networkStats from './modules/networkStats';
import firebase from './modules/firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    blockchainUser,
    networkStats,
    firebase,
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
});
