
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
var Web3 = require('web3');
var abi = require('./abi/abi');
var apiKey = '770b57737fc2496f8dc603dd6b26c4ad';
var web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/' + apiKey));

var token = new web3.eth.Contract(abi.token, "0xa2e9a6ed3835746aadbad195d32d6442b2d7335a");

function getBalance(acc){
  return new Promise((resolve, reject)=>{
    token.methods.balanceOf(acc).call().then((v)=>{
      resolve(web3.utils.fromWei(v,'ether'));
    }).catch(reject);
  })
}

function getBlockNumber(){
  return new Promise((resolve, reject)=>{
    web3.eth.getBlockNumber().then((r)=>{
      resolve(r);
    }).catch(reject);
  });
}

function getAllOffers(airport){

}

function getMyOffers(acc){

}

exports.getBalance = getBalance;
exports.getBlockNumber = getBlockNumber;

exports.getAllOffers = getAllOffers;
exports.getMyOffers = getMyOffers;
