/* global firebase */
const firebaseConfig = {
  apiKey: 'AIzaSyBIPnjrxS4rSVd46SaZaC_MnYacSGh1Qp8',
  authDomain: 'daimarket.firebaseapp.com',
  databaseURL: 'https://daimarket.firebaseio.com',
  projectId: 'daimarket',
  storageBucket: 'daimarket.appspot.com',
  messagingSenderId: '239689267818',
  appId: '1:239689267818:web:48110e1095a81c5f9de813',
  measurementId: 'G-78JL84YX5Q',
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get a reference to the database service
const database = firebase.database();

const data = {
  signatures: [],
};

const actions = {
  setSignaturesListener({ comit }, acc) {
    const starCountRef = database.ref(`${acc}\toSign`);
    starCountRef.on('value', (snapshot) => {
      const newSignature = snapshot.val();
      console.log('currentSignatures', newSignature);
      comit('updateSignatures', newSignature);
    });
  },
};

const mutations = {
  addSignature(state, val) {
    state.signatures.push(val);
  },
};

export default {
  namespaced: true,
  state: data,
  actions,
  mutations,
};
