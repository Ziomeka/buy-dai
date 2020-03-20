
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
var unirest = require('unirest');

function getCountries(){
  return new Promise((resolve, reject)=>{
        var req = unirest("GET", "https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all");
        req.headers({
            "x-rapidapi-host": "ajayakv-rest-countries-v1.p.rapidapi.com",
            "x-rapidapi-key": "3a760a0db3mshefa726354bc499dp14d9e5jsn302d67decc2a"
        });

        req.end(function (res) {
            if (res.error) reject(res.error);

            var payload = {};

            res.body.forEach(element => {
                payload[element.alpha2Code] = element.currencies[0]
            });

            resolve(payload);
        });
    });
}

function getAirportsData(text){

  return new Promise((resolve)=>{

        var req = unirest('GET', 'https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-text');
        req.query({
        'text': text
        });

        req.headers({
        'x-rapidapi-host': 'cometari-airportsfinder-v1.p.rapidapi.com',
        'x-rapidapi-key': '3a760a0db3mshefa726354bc499dp14d9e5jsn302d67decc2a'
        });

        req.end(function (res) {
        if (res.error) throw new Error(res.error);

        var payload = res.body.map(x=>
            {
                return {
                    name : x.name,
                    code : x.code,
                    country : x.countryCode,
                }
            });

        resolve(payload);
        });
    });
}

function getRate(currency,sum){
  return new Promise((resolve)=>{

      var req = unirest("GET", "https://currencyscoop.p.rapidapi.com/latest");

      req.headers({
        "x-rapidapi-host": "currencyscoop.p.rapidapi.com",
        "x-rapidapi-key": "3a760a0db3mshefa726354bc499dp14d9e5jsn302d67decc2a"
      });

      req.end(function (res) {
        if (res.error) throw new Error(res.error);
        const exRate = res.body.response.rates[currency];
        const margin = 0.07;

        let payload = {};
        payload['after'] = sum * exRate * (1-margin);
        payload['before'] = sum;
        payload['value'] = sum * exRate ;
        payload['margin'] = margin ;
        resolve(payload);
      });
  });
}

exports.getRate = getRate;

exports.getAirportsData = getAirportsData;
exports.getCountries = getCountries;
