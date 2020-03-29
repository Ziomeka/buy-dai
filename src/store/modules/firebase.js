import * as firebase from 'firebase/app';

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/database';

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
  keys: {},
};

const actions = {
  setSignaturesListener({ commit }, payload) {
    const account = payload.toLowerCase();
    const path = `${account}/toSign`;
    const toSignRef = database.ref(path);
    toSignRef.on('child_added', (snapshot) => {
      const newSignature = snapshot.val();
      newSignature.key = snapshot.key;
      if (!data[newSignature.key]) {
        console.log('new signature', newSignature);
        commit('updateSignatures', newSignature);
        data.keys[newSignature.key] = true;
      }
    });
  },
};

const mutations = {
  updateSignatures(state, val) {
    state.signatures.push(val);
  },
};

export default {
  namespaced: true,
  state: data,
  actions,
  mutations,
};
