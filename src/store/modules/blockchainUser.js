const data = {
  isDaiEnabled: false,
  isEnablingPending: false,
  userType: 'traveler',
  airport: {},
};

const mutations = {
  setDaiState(state, payload) {
    state.isDaiEnabled = payload;
  },
  setPendingState(state, payload) {
    state.isEnablingPending = payload;
  },
  setUserType(state, payload) {
    state.userType = payload;
  },
  setAirport(state, payload) {
    state.airport = payload;
  },
};

const actions = {
  getState({ commit, state }) {
    const enableStateToSend = !state.isDaiEnabled;
    const mockSucess = Math.round(Math.random());
    const mockblockChain = (success) => new Promise((resolve, reject) => {
      setTimeout(() => {
        if (success) {
          resolve();
        } else {
          reject(new Error(['Blockchain Failed']));
        }
      }, 10000);
    });
    commit('setPendingState', true);
    mockblockChain(mockSucess)
      .then(() => {
        commit('setDaiState', enableStateToSend);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        commit('setPendingState', false);
      });
  },
};

export default {
  namespaced: true,
  state: data,
  actions,
  mutations,
};
