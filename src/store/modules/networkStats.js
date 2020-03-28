const s = {
  blockNumber: 0,
  blockHash: 0,
  networkName: 'unknown',
  user: '',
};

const mutations = {
  setNetwork(state, payload) {
    const status = Number.isNaN(parseInt(payload.toString(), 10));
    if (status) {
      state.networkName = payload;
    } else {
      const networkId = parseInt(payload.toString(), 10);
      if (networkId === 1) {
        state.networkName = 'main';
      } else
      if (networkId === 42) {
        state.networkName = 'kovan';
      } else {
        state.networkName = 'invalid';
      }
    }
    console.log('Network set', state.networkName);
  },
  setBlockDetails(state, payload) {
    state.blockNumber = payload;
  },
  setWalletAddress(state, payload) {
    state.user = payload;
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
  updateAccountInfo({ commit }, w3) {
    w3.eth.getAccounts((e, acc) => {
      console.log('Acc found', acc[0]);
      commit('setAccount', acc[0]);
    });
  },
};

export default {
  namespaced: true,
  state: s,
  actions,
  mutations,
};
