function factory(web3, store) {
  let latestBlockNumber = 0;
  let latestBlockHash = 0;
  function fetchNetwork() {
    web3.version.getNetwork((err, res) => {
      store.dispatch('networkStats/setNetwork', res);
    });
  }
  function getLatestBlock() {
    web3.eth.getBlockNumber((err, res) => {
      if (latestBlockNumber !== res) {
        web3.eth.getBlock(res, (e, r) => {
          if (r.hash !== latestBlockHash) {
            store.dispatch('networkStats/setBlockNumber', latestBlockNumber);
          }
          latestBlockHash = r.hash;
        });
      }
      latestBlockNumber = res;
    });
  }
  fetchNetwork();
  setInterval(getLatestBlock, 1000);
  return {
    fetchNetwork,
    getLatestBlock,
  };
}
export default factory;
