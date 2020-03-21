const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const unirest = require('unirest');

const rapid = require('./rapidApiQueries');
const eth = require('./ethApi');
const cors = require('cors');
const admin = require("firebase-admin");
const addOfferFactory = require("./operations/addOfferFactory");
const externalApiReadsFactory = require("./operations/externalApiReadsFactory");

admin.initializeApp();

        // Get a database reference to our blog
var dbA = admin.database();
var db = dbA.ref("/");

exports.getBalance = functions.https.onRequest((request, response)=>{

    const account = request.query.account;

    return new Promise((resolve)=>{

      eth.getBalance(account).then((data)=>{
        response.send(data);
        resolve(data);
      });

    });

});


exports.getBlockNumber =  functions

  .runWith({ memory: '1GB', timeoutSeconds: 60 })
  .https.onRequest((request, response)=>{

    return new Promise((resolve)=>{

      eth.getBlockNumber().then((data)=>{
        response.send(data.toString());
        resolve(data);
      });

    });

});


exports.getRate = externalApiReadsFactory.create(functions, rapid, cors).getRate;

exports.getAirports = externalApiReadsFactory.create(functions, rapid, cors).getAirports;

function sendTransaction(firebaseTxKey){

}

exports.enableDAI =   functions

  .runWith({ memory: '512MB', timeoutSeconds: 60 })
  .https.onRequest((request, response)=>{
        const account = request.query.account;
      //generate digest from market.generateDigest
      //create node in myPermits
      //add record to toSign with reference to 'myPermits'

      //after getting signatue

      //once signed, update split signatuere in myPermits
      //build relayCall for myPermits signatures
  });

exports.addOffer =  addOfferFactory.create(functions, db, eth, cors);

exports.handlerOnNewSignature = functions.database.ref('{account}/toSign/{id}/signature').onCreate((snap,ctx)=>{
  var signature = snap.val();
  console.log("signature");
  db.ref(`/${ctx.params.account}/toSign/${ctx.params.id}`).once('value').then(function(snapshot) {
    var rec = snapshot.val();

    console.log("signature rec", rec);
    var sig = eth.splitSig(signature);

    eth.sendTx(rec.data, rec.nonce, rec.to, sig.v, sig.r, sig.s).then((x)=>{
      console.log("Tx send");
    });
  });
  return true;
});



exports.getPendingSignatures = functions
.runWith({ memory: '1GB', timeoutSeconds: 60 })
.https.onRequest((request, response) => {
  const addr = request.query.account;

});
