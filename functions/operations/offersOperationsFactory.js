function getMyOffersImpl(functions,db,eth,cors){
  return functions
  .runWith({ memory: '512MB', timeoutSeconds: 60 })
  .https.onRequest((request, response)=>{

    const publicKey = request.query.publicKey.toLowerCase();

    return cors()(request, response, () => {

      return new Promise((resolve,reject)=>{
        console.log("Out getMyOffersImpl",publicKey);
        db.child(publicKey).child("myOffers").once("value").then((snapshot)=>{
          let data = snapshot.val();
          console.log("In getMyOffersImpl 1", data);
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
          console.log(ex);
          response.send(500);
          reject(ex);
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
          let retVal = [];
          if(!data){
            retVal = [];
          } else {
            let retVal = Object.keys(data).map(x=>{
              let val = data[x];
              if(typeof(val)!=="object"){
                return undefined;
              }
              val.uniqueId = x;
              return val;
            }).filter(x=>x !== undefined);
          }

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

    if (request.method != "POST") {
        response.status(405).send("Use POST");
        return;
    }

    console.log("Call body", request.body);

    const body = JSON.parse(request.body);

    const sourceAmount = body.sourceAmount.toString().toLowerCase();
    const destAmount = body.destAmount.toString().toLowerCase();
    const currency = body.currency;
    const publicKey = body.publicKey.toLowerCase();
    const airport = body.airport.toUpperCase();
    const fno = body.fno;

    return cors()(request, response, () => {

      return new Promise((resolve,reject)=>{

        eth.addOffer(sourceAmount,destAmount,currency,publicKey).then((data)=>{
          var myOffersRef = db.child(publicKey).child("myOffers");
          var rec = {
            sourceAmount,destAmount,currency,airport,status:"SUGGESTED",blockChainStatus:"UNCONFIRMED",fno
          };
          myOffersRef.push(rec).then(x=>{
            data.accountKey = `${publicKey}/myOffers/${x.key}`;
            rec.accountKey = `${publicKey}/myOffers/${x.key}`;
            rec.creator = publicKey ;
            console.log("put copy",data);
            var signaturesRef = db.child(publicKey).child("toSign");
            var airportRef = db.child("airports").child(airport);
            delete data.publicKey;
            signaturesRef.push(data);
            airportRef.push(rec);
            resolve(data);
            response.send(200);
          }).catch(reject);
        }).catch(reject);

      });

    });
  });
}


function updateSignaturesImpl(functions,db,eth,cors){
  return functions
  .runWith({ memory: '512MB', timeoutSeconds: 60 })
  .https.onRequest((request, response)=>{

    const id = request.query.id;
    const publicKey = request.query.publicKey.toLowerCase();
    const signature = request.query.signature.toLowerCase();

    return cors()(request, response, () => {

      return new Promise((resolve, reject) => {

        var updates = {};
        const path = `/${publicKey}/toSign/${id}/signature`;
        updates[path] = signature;
        db.update(updates)
        .then( () => {
          resolve(true);
          response.send(200);
        }).catch( () => {
          reject(true);
          response.send(500);
        });
      });

    });
  });
}

exports.create = function(functions,db,eth,cors)
{
  const getMyOffers = getMyOffersImpl(functions, db, eth, cors);
  const addOffer = addOfferImpl(functions, db, eth, cors);
  const getAirportsOffers = getAirportsOffersImpl(functions, db, eth, cors);
  const updateSignature = updateSignaturesImpl(functions, db, eth, cors);

  return {
    addOffer,
    getMyOffers,
    getAirportsOffers,
    updateSignature,
  }
}
