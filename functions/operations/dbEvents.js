
function scanEvents(from, to, eth){
  return eth.getAllEvents(from, to);
}

exports.create = function(functions, db, eth){
  const scanFormerEventsImpl = functions.database.ref('/blockChain').onUpdate((snap, ctx)=>{
    return new Promise((res, rej)=>{
      db.child(`/blockChain`).once('value').then(function(snapshot) {
        var blockChainBefore = snapshot.val();
        var blockChainAfter = snap.after.val();
        if(!blockChainBefore.lastScanned){
          db.child("/blockChain/lastScanned").set(17500000).then(()=>{
              res(true);
            });;
        }else{
          if(blockChainBefore.lastScanned<blockChainBefore.blockNumber-5){
            scanEvents(blockChainBefore.lastScanned+1, blockChainBefore.blockNumber-5, eth).then((result,error)=>{
              var operations = [];
              if(!(typeof(result) === "undefined" || result === null)){
                result.forEach((x)=>{
                  operations.push(db.child("/events").push(x));
                });
              }
              operations.push(db.child("/blockChain/lastScanned").set(blockChainBefore.blockNumber -5));
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
