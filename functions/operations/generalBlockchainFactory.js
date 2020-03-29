exports.create = function(functions, eth, db, cors){

  let lastTry = 0;
  const getBalanceImpl = functions.https
    .onRequest((request, response)=>{

        const account = request.query.account;


        return cors()(request, response, () => {
          return new Promise((resolve)=>{

            eth.getBalance(account).then((data)=>{
              response.send(data);
              resolve(data);
            });

          });
        });

    });

  const getBlockNumberImpl =  functions
    .runWith({ memory: '1GB', timeoutSeconds: 60 })
    .https.onRequest((request, response)=>{
      counter = counter + 1;


      return cors()(request, response, () => {
        return new Promise((resolve)=>{
          eth.getBlockNumber().then((data)=>{
            response.send(data.toString());
            resolve(data);
          });

        });
      });

  });

  return {
    getBalance:getBalanceImpl,
    getBlockNumber:getBlockNumberImpl
  }
}
