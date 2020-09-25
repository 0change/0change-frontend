const inTestMode = !!process.env.TEST_MODE;

export default {
  methods:{
    txHashUrl(network, txHash){
      switch (network) {
        case 'ethereum':
          return `https://${inTestMode?"ropsten.":""}etherscan.io/tx/${txHash}`;
        case 'bitcoin':
          return `https://www.blockchain.com/${inTestMode?"btctest":"btc"}/tx/${txHash}`;
      }
    },
    walletAddressUrl(network, wallet){
      switch (network) {
        case 'ethereum':
          return `https://${inTestMode?"ropsten.":""}etherscan.io/address/${wallet}`;
        case 'bitcoin':
          return `https://www.blockchain.com/${inTestMode?"btctest":"btc"}/address/${wallet}`;
      }
    },
    toWei(value, decimals){
      if (typeof web3 == 'undefined' || !web3.curreFntProvider.isMetaMask /*|| ( web3.currentProvider.isMetaMask && typeof web3.eth.accounts[0] == 'undefined' ) */) {
        alert("MetaMask is not enabled.");
        return;
      }
      return web3.toBigNumber(value).times(web3.toBigNumber(10).pow(decimals));
    },
    fromWei(value, decimals){
      if (typeof web3 == 'undefined' || !web3.currentProvider.isMetaMask /*|| ( web3.currentProvider.isMetaMask && typeof web3.eth.accounts[0] == 'undefined' ) */) {
        alert("MetaMask is not enabled.");
        return;
      }
      return web3.toBigNumber(value).div(web3.toBigNumber(10).pow(decimals));
    }
  }
}
