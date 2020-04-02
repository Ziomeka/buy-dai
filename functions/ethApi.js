// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
var Web3 = require('web3');
var abi = require('./abi/abi');
var marketAbi = require('./abi/Market').abi;
const HDWalletProvider = require('@truffle/hdwallet-provider');
var apiKey = '770b57737fc2496f8dc603dd6b26c4ad';
const provider = new HDWalletProvider('jar bubble paper swarm reward bird brand floor kick friend what express','https://kovan.infura.io/v3/' + apiKey);
const fromAdr = provider.getAddress();
const web3 = new Web3(provider);

const marketAdr = "0x322Ec891912e14e2851971Cc775047544498A60A";

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
  console.log(`Prepering send from=${fromAdr} data=${data} nonce=${nonce} to=${to}, v=${v}, r=${r}, s=${s}`);

  return new Promise((res,rej) =>{
    var method = market.methods.relayCallEmpty(data, nonce, v, r, s);

    var ethCallArgs = {
        from:fromAdr,
        gas:5000000,
      };

    method.estimateGas(ethCallArgs, function(error, gasAmount){
      if(gasAmount == ethCallArgs.gas){
        rej(`Method ran out of gas (${gasAmount})`);
      }else{
        console.log(`Gas estimate ${gasAmount} `);
      }
      if(error){
        rej(`Estimate gas error ${error}`);
      }
    });

    method.send(ethCallArgs).then(function(receipt){
      console.error("In sendTx success ",receipt);
      res(hash);
    }).catch(rej);
  })

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

exports.splitSig = function (signature){
  signature = signature.substr(2);
  const r = signature.substr(0, 64);
  var s = signature.substr(64, 64);
  var v = signature.substr(128, 2);
  return {
    v:"0x"+v,
    r:"0x"+r,
    s:"0x"+s,
  };
}

exports.sendTx = sendTx;
exports.getBalance = getBalance;
exports.getBlockNumber = getBlockNumber;
exports.addOffer = addOffer;
exports.getAllEvents = getAllEvents;
