
exports.create = function(functions, rapid, cors, db) {

  const buildUpdates = function(prefix, keySelector, elements){
    let updates = {};
    elements.forEach(x => {
      const key = `${prefix}/${keySelector(x)}`;
      updates[key] = x;
    });
    return updates;
  }

  const getRateImpl = functions
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
    });

  const getAirportsImpl =  functions
    .runWith({ memory: '1GB', timeoutSeconds: 60 })
    .https.onRequest((request, response) => {
      const start = Date.now();
      const text = request.query.q;

      return cors()(request, response, () => {

        return new Promise((resolve)=>{

          Promise.all([rapid.getAirportsData(text),rapid.getCountries()]).then(([airports, countries])=>{
            console.log("getAirportsImpl promises resolved",Date.now() - start);
            var payload = airports.map(x=>{
                return {
                    name:x.name,
                    code:x.code,
                    currency: countries[x.country],
                }
            });
            var updates = buildUpdates("/allAirports/", x => x.code, payload);
            console.log("getAirportsImpl updates defined",Date.now() - start);
            db.update(updates);
            response.send(payload);
            console.log("getAirportsImpl firebase saved",Date.now() - start);
            resolve(true);
          });

        });
      });
    });

  return {
    getRate : getRateImpl,
    getAirports : getAirportsImpl,
  }
}
