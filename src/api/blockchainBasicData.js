function factory(web3, store) {
  let latestBlockNumber = 0;
  let latestBlockHash = 0;
  function fetchNetwork() {
    if (!web3.version.toString().startsWith('1.')) {
      web3.version.getNetwork((err, res) => {
        store.dispatch('networkStats/setNetwork', res);
      });
    } else {
      web3.eth.net.getNetworkType().then((res) => {
        store.dispatch('networkStats/setNetwork', res);
      });
    }
  }
  function getLatestBlock() {
    web3.eth.getBlockNumber((err, res) => {
      if (latestBlockNumber !== res) {
        web3.eth.getBlock(res, (e, r) => {
          if (!e && r && r.hash !== latestBlockHash) {
            store.dispatch('networkStats/setBlockNumber', latestBlockNumber);
            latestBlockHash = r.hash;
          }
        });
      }
      latestBlockNumber = res;
    });
  }
  if (web3 && web3.eth && web3.eth.getBlock) {
    fetchNetwork();
    setInterval(getLatestBlock, 1000);
  }
  return {
    fetchNetwork,
    getLatestBlock,
  };
}
export default factory;
