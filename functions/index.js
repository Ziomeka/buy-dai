const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const unirest = require('unirest');

const rapid = require('./rapidApiQueries');
const eth = require('./ethApi');
const cors = require('cors');
const admin = require("firebase-admin");
const offersOperationsFactory = require("./operations/offersOperationsFactory");
const externalApiReadsFactory = require("./operations/externalApiReadsFactory");
const generalBlockchainFactory = require("./operations/generalBlockchainFactory");
const dbEventsFactory = require("./operations/dbEvents");


admin.initializeApp();

        // Get a database reference to our blog
const dbA = admin.database();
const db = dbA.ref("/");

const readBlockNumber =  generalBlockchainFactory.create(functions, eth, db, cors).getBlockNumber;


exports.getBalance = generalBlockchainFactory.create(functions, eth, db, cors).getBalance;


exports.getRate = externalApiReadsFactory.create(functions, rapid, cors).getRate;

exports.getAirports = externalApiReadsFactory.create(functions, rapid, cors).getAirports;

exports.getAirprtOffers = offersOperationsFactory.create(functions, db, eth, cors).getAirprtOffers;

exports.getMyOffers = offersOperationsFactory.create(functions, db, eth, cors).getMyOffers;

exports.addOffer =  offersOperationsFactory.create(functions, db, eth, cors).addOffer;

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


exports.handlerOnNewSignature = functions.database.ref('{account}/toSign/{id}/signature').onCreate((snap,ctx)=>{
  var signature = snap.val();
  console.log("signature");
  return new Promise((res,rej)=>{
    db.ref(`/${ctx.params.account}/toSign/${ctx.params.id}`).once('value').then(function(snapshot) {
      var rec = snapshot.val();

      console.log("signature rec", rec);
      var sig = eth.splitSig(signature);

      eth.sendTx(rec.data, rec.nonce, rec.to, sig.v, sig.r, sig.s).then((x)=>{
        console.log("Tx send");
      });
    });
    res(true);
  })
});

exports.handleAnyChange = dbEventsFactory.create(functions, db, eth).handleAnyChange;

exports.scanFormerEvents = dbEventsFactory.create(functions, db, eth).scanFormerEvents;
