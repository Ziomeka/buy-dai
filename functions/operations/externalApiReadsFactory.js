
exports.create = function(functions, rapid, cors, db) {

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
      const text = request.query.q;

      return cors()(request, response, () => {

        return new Promise((resolve)=>{

          Promise.all([rapid.getAirportsData(text),rapid.getCountries()]).then(([airports, countries])=>{
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

  return {
    getRate : getRateImpl,
    getAirports : getAirportsImpl,
  }
}
