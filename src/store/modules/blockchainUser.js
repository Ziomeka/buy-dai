const state = {
  isDaiEnabled: false,
};

const mutations = {
  setDaiState(payload) {
    state.isDaiEnabled = payload;
  },
};

const actions = {
  getState({ commit }) {
    setTimeout(() => {
      commit('setDaiState', true);
    }, 1000);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
