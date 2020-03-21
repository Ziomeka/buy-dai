
function scanEvents(from, to, eth){
  console.log(`scanning from ${from} to ${to}`);
  return eth.getAllEvents(from, to);
}

exports.create = function(functions, db, eth){
  const scanFormerEventsImpl = functions.database.ref('/blockChain/blockNumber').onUpdate((snap, ctx)=>{
    console.log("Getting block OnUpdate");
    return new Promise((res, rej)=>{
      db.child(`/blockChain/lastScanned`).once('value').then(function(snapshot) {
        var lastScanned = snapshot.val();
        var lastBlock = snap.after.val();
        console.log('last scanned',lastScanned,lastBlock);
        if(!lastScanned){
          db.child("/blockChain/lastScanned").set(17500000).then(()=>{
              res(true);
            });;
        }else{
          if(lastScanned<lastBlock-5){
            scanEvents(lastScanned+1,lastBlock -5, eth).then((result)=>{
              var operations = [];
              result.forEach((x)=>{
                operations.push(db.child("/events").push(x));
              });
              operations.push(db.child("/blockChain/lastScanned").set(lastBlock -5));
              Promise.all(operations)
              .then(()=>{
                res(true);
              });

            });
          }else{
            res(false);
          }
        }
      });
    })
  });

  const handleAnyChangeImpl = functions.database.ref('/')
    .onUpdate((snap, ctx)=>{
      console.log("Getting blockOnUpdate");

      return new Promise((res,rej)=>{
          eth.getBlockNumber().then((data)=>{
            db.child("/blockChain/blockNumber").set(data).then(()=>{
              res(true);
            });

          });
      })
    });

  return {
    handleAnyChange:handleAnyChangeImpl,
    scanFormerEvents:scanFormerEventsImpl
  }
}
