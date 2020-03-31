const data = {
  offers: [],
};

const mutations = {
  setOffers(state, payload) {
    state.offers = payload;
  },
};

const actions = {
  getMyOffers({ commit }, publicKey) {
    const url = `https://us-central1-daimarket.cloudfunctions.net/getMyOffers?publicKey=${publicKey}`;
    fetch(url, { method: 'GET', mode: 'cors' })
      .then((response) => {
        response.json()
          .then((responseData) => {
            commit('setOffers', responseData);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default {
  namespaced: true,
  state: data,
  actions,
  mutations,
};
