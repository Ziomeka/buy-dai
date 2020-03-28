function getMyOffersImpl(functions,db,eth,cors){
  return functions
  .runWith({ memory: '512MB', timeoutSeconds: 60 })
  .https.onRequest((request, response)=>{

    const account = request.query.account;

    return cors()(request, response, () => {

      return new Promise((resolve,reject)=>{
        
        db.child(account).child("myOffers").once("value").then((data)=>{
          console.log(data);
          resolve(data);
        });

      });

    });
  });
}

function addOfferImpl(functions,db,eth,cors){
  return functions
  .runWith({ memory: '512MB', timeoutSeconds: 60 })
  .https.onRequest((request, response)=>{

    const sourceAmount = request.query.sourceAmount;
    const destAmount = request.query.destAmount;
    const currency = request.query.currency;
    const account = request.query.account;
    const airport = request.query.airport;

    return cors()(request, response, () => {

      return new Promise((resolve,reject)=>{

        eth.addOffer(sourceAmount,destAmount,currency,account).then((data)=>{
          var myOffersRef = db.child(account).child("myOffers");
          myOffersRef.push({
            sourceAmount,destAmount,currency,airport,status:"SUGGESTED"
          }).then(x=>{
            data.key = "myOffers/"+x.key;
            var signaturesRef = db.child(account).child("toSign");
            delete data.account;
            signaturesRef.push(data);
            resolve(data);
            response.send(200);
          })
        }).catch(reject);

      });

    });
  });
}

exports.create = function(functions,db,eth,cors)
{
  const getMyOffers = getMyOffersImpl(functions, db, et, cors);
  const addOffer = addOfferImpl(functions, db, et, cors);

  return {
    addOffer,
    getMyOffers,
    getAirportsOffers
  }
}
