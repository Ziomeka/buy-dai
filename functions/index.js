const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
var unirest = require('unirest');

var rapid = require('./rapidApiQueries');
var eth = require('./ethApi');
const cors = require('cors');

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


exports.getRate = functions

  .runWith({ memory: '256MB', timeoutSeconds: 60 })
  .https.onRequest((request, response)=>{

    const sum = request.query.sum;
    const currency = request.query.currency;

  return cors()(request, response, () => {

    return new Promise((resolve)=>{

      rapid.getRate(currency,sum).then((data)=>{
        response.send(data);
        resolve(data);
      });

    });

  });
})

exports.getAirports = functions
.runWith({ memory: '1GB', timeoutSeconds: 60 })
.https.onRequest((request, response) => {
  const text = request.query.q;
  console.log('getAirports Query',text);

  return cors()(request, response, () => {

    return new Promise((resolve)=>{

      Promise.all([rapid.getAirportsData(text),rapid.getCountries()]).then(([airports, countries])=>{
        console.log('Promise Results 1',airports);
        console.log('Promise Results 2',countries);
        var payload = airports.map(x=>{
            return {
                name:x.name,
                code:x.code,
                currency: countries[x.country],
            }
        });
        response.send(payload);
        resolve(true);
      });

    });
  });
});
