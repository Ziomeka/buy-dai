function getMyOffersImpl(functions,db,eth,cors){
  return functions
  .runWith({ memory: '512MB', timeoutSeconds: 60 })
  .https.onRequest((request, response)=>{

    const account = request.query.account.toUpperCase();

    return cors()(request, response, () => {

      return new Promise((resolve,reject)=>{
        console.log("Out getMyOffersImpl",account);
        db.child(account).child("myOffers").once("value").then((snapshot)=>{
          let data = snapshot.val();
          let retVal = Object.keys(data).map(x=>{
            let val = data[x];
            if(typeof(val)!=="object"){
              return undefined;
            }
            val.uniqueId = x;
            return val;
          }).filter(x=>x !== undefined);
          console.log("In getMyOffersImpl", retVal);
          response.send(retVal);
          resolve(retVal);
        }).catch((ex)=>{
          response.send(500);
          reject(error);
        });

      });

    });
  });
}

function getAirportsOffersImpl(functions,db,eth,cors){
  return functions
  .runWith({ memory: '512MB', timeoutSeconds: 60 })
  .https.onRequest((request, response)=>{

    const airport = request.query.airport;

    return cors()(request, response, () => {

      return new Promise((resolve,reject)=>{

        db.child(`airports/${airport}`).once("value").then((snapshot)=>{
          let data = snapshot.val();
          let retVal = Object.keys(data).map(x=>{
            let val = data[x];
            if(typeof(val)!=="object"){
              return undefined;
            }
            val.uniqueId = x;
            return val;
          }).filter(x=>x !== undefined);
          console.log(retVal);
          response.send(retVal);
          resolve(retVal);
        });

      });

    });
  });
}

function addOfferImpl(functions,db,eth,cors){
  return functions
  .runWith({ memory: '512MB', timeoutSeconds: 60 })
  .https.onRequest((request, response)=>{

    const sourceAmount = request.query.sourceAmount.toLowerCase();
    const destAmount = request.query.destAmount.toLowerCase();
    const currency = request.query.currency;
    const account = request.query.account.toLowerCase();
    const airport = request.query.airport.toUpperCase();
    const fno = request.query.fno;

    return cors()(request, response, () => {

      return new Promise((resolve,reject)=>{

        eth.addOffer(sourceAmount,destAmount,currency,account).then((data)=>{
          var myOffersRef = db.child(account).child("myOffers");
          var rec = {
            sourceAmount,destAmount,currency,airport,status:"SUGGESTED",blockChainStatus:"UNCONFIRMED",fno
          };
          myOffersRef.push(rec).then(x=>{
            data.accountKey = `${account}/myOffers/${x.key}`;
            rec.accountKey = `${account}/myOffers/${x.key}`;
            rec.creator = account ;
            console.log("put copy",data);
            var signaturesRef = db.child(account).child("toSign");
            var airportRef = db.child("airports").child(airport);
            delete data.account;
            signaturesRef.push(data);
            airportRef.push(rec);
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
  const getMyOffers = getMyOffersImpl(functions, db, eth, cors);
  const addOffer = addOfferImpl(functions, db, eth, cors);
  const getAirportsOffers = getAirportsOffersImpl(functions, db, eth, cors);

  return {
    addOffer,
    getMyOffers,
    getAirportsOffers
  }
}
