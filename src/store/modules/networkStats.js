const s = {
  blockNumber: 0,
  blockHash: 0,
  networkId: 0,
};

const mutations = {
  setBlockDetails(payload) {
    s.blockNumber = payload;
  },
};

const actions = {
  setBlockNumber({ commit }) {
    commit('setBlockNumber', true);
  },
};

export default {
  namespaced: true,
  state: s,
  actions,
  mutations,
};
