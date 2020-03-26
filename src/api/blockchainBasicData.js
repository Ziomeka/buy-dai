function factory(rec, store) {
  let latestBlockNumber = 0;
  let latestBlockHash = 0;
  // const marketAddress = '0xBB676E00BF32cADf7bB08cd77eE519f19194b07E';

  function fetchNetwork() {
    const web3 = rec.getWeb3();
    if (!web3) return;
    if (!web3.version.toString().startsWith('1.')) {
      web3.version.getNetwork((err, res) => {
        store.commit('networkStats/setNetwork', res);
      });
    } else {
      web3.eth.net.getNetworkType().then((res) => {
        store.commit('networkStats/setNetwork', res);
      });
    }
  }
  function getLatestBlock() {
    const web3 = rec.getWeb3();
    if (!web3) return;
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
  setInterval(() => {
    getLatestBlock();
    fetchNetwork();
  }, 1000);

  return {
    fetchNetwork,
    getLatestBlock,
  };
}
export default factory;
