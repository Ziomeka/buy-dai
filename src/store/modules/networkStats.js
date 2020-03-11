const s = {
  blockNumber: 0,
  blockHash: 0,
  networkId: 0,
};

const mutations = {
  setNetwork(state, payload) {
    state.networkId = payload;
  },
  setBlockDetails(state, payload) {
    state.blockNumber = payload;
  },
};

const actions = {
  setBlockNumber({ commit, dispatch }, payload) {
    if (payload !== s.blockNumber) {
      // read new events
      dispatch('readEvents', {
        old: s.blockNumber,
        new: payload,
      });
    }
    commit('setBlockDetails', payload);
  },
  setNetwork({ commit }, payload) {
    commit('setNetwork', payload);
  },
  readEvents(context, payload) {
    let { old } = payload;
    if (payload.old === 0) {
      old = payload.new - 100000;
    }
    if (payload.new - payload.old < 10) {
      old = payload.new - 10;
    }
    console.log('readEvents', old, payload.new);
  },
};

export default {
  namespaced: true,
  state: s,
  actions,
  mutations,
};
