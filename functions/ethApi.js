
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
var Web3 = require('web3');
var abi = require('./abi/abi');
var marketAbi = require('./abi/Market').abi;
var apiKey = '770b57737fc2496f8dc603dd6b26c4ad';
var web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/' + apiKey));

const marketAdr = "0xD6Ea4AAFc8d7044E24ebcfCc9d11e6C62fFC4e55";

var token = new web3.eth.Contract(abi.token, "0xa2e9a6ed3835746aadbad195d32d6442b2d7335a");
var market =  new web3.eth.Contract(marketAbi, marketAdr);

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

function addOffer(sourceAmount,destAmount,currency,account){
  return new Promise((resolve, reject)=>{
    sourceAmount = web3.utils.toWei(sourceAmount,'ether');
    destAmount = web3.utils.toWei(destAmount,'ether');
    var data =  market.methods.addOffer(sourceAmount,destAmount,currency).encodeABI();
    market.methods.generateMethodCallDigest(data,account).call().then((x)=>{
      resolve({digest : x.digest, nonce : x.nonce, data, to : marketAdr});
    })
  });
}

function sendTx(data, nonce, to, v, r, s){
  market.methods.relayCall(data, nonce, v, r, s).send({
    to:to
  });
}

function getAllEvents(from, to){
  return new Promise((res, rej) => {
    let events = market.events.allEvents({
      fromBlock:from,
      toBlock:to,
    }, (err, data) =>{
      if(err){
        res(data);
      }else{
        rej(err);
      }
    });
  })
}

exports.splitSig = function (sing){
  return {
    v:"",
    r:"",
    s:""
  };
}

exports.sendTx = sendTx;
exports.getBalance = getBalance;
exports.getBlockNumber = getBlockNumber;
exports.addOffer = addOffer;
exports.getAllEvents = getAllEvents;
