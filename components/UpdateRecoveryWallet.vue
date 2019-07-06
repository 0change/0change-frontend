<template>
  <div class="form-group">
    <label for="userWalletInput">Recovery wallet</label>
    <div class="input-group">
      <div class="input-group-prepend">
              <span class="input-group-text">
                <!--<i class="fa fa-at fa-lg"></i>-->
                <i class="icons font-lg d-block cui-credit-card"></i>
              </span>
      </div>
      <input
          type="email"
          class="form-control"
          :class="inputClass"
          id="userWalletInput"
          v-model="textToChange"
          placeholder="0xF90D55AB ...."
          disabled="disabled"
      />
      <span class="input-group-append">
        <button class="btn btn-primary" @click="updateWallet" type="button">{{$t('components.updateEmail.btnTitle')}}</button>
      </span>
    </div>
    <span class="help-block">Recovery wallet help's you when you lost your brightID.</span>
    <div v-if="(messageVisible && responseSuccess) || updateSuccessfullyDone" class="valid-feedback" style="display: block">{{responseMessage || 'Email is available.'}}</div>
    <div v-if="messageVisible && !responseSuccess" class="invalid-feedback" style="display: block">{{responseMessage || 'Unknown error.'}}</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    data(){
      return {
        textToChange: "",
        walletChecked: false,
        responseSuccess: false,
        responseMessage: "",
        updateSuccessfullyDone: false,
      }
    },
    computed: {
      ...mapState('auth', ['loggedIn', 'user']),
      inputClass: function () {
        return {
          'is-valid': (this.textToChange !== this.user.recoveryWallet && this.walletChecked && this.responseSuccess),
          'is-invalid': (this.textToChange !== this.user.recoveryWallet && this.walletChecked && !this.responseSuccess)
        };
      },
      messageVisible: function () {
        return this.walletChecked;
      }
    },
    mounted(){
      this.textToChange = this.user.recoveryWallet || '';
    },
    methods: {
      updateWallet(){
        // alert(`send ${this.swap.receivingAmount} ${this.swap.receivingCoin.code} to address ${this.swap.recipientWallet}`);
        if (typeof web3 == 'undefined' || !web3.currentProvider.isMetaMask /*|| ( web3.currentProvider.isMetaMask && typeof web3.eth.accounts[0] == 'undefined' ) */) {
          alert("MetaMask is not enabled.");
          return;
        }

        function signMsg(msgParams, from) {
          return new Promise(function (resolve, reject) {
            web3.currentProvider.sendAsync({
              method: 'eth_signTypedData',
              params: [msgParams, from],
              from: from,
            }, function (err, result) {
              if (err)
                reject(err);
              if (result.error) {
                return reject(result.error)
              }
              resolve(result.result);
              // const recovered = sigUtil.recoverTypedSignature({
              //   data: msgParams,
              //   sig: result.result
              // })
              // if (recovered === from ) {
              //   alert('Recovered signer: ' + from)
              // } else {
              //   alert('Failed to verify signer, got: ' + result)
              // }
            })
          })
        }
        /**
         * request MetaMask permission to access the accounts
         */
        if (web3.eth.accounts.length == 0) {
          ethereum.enable();
          return;
        }

        let walletToUpdate = web3.eth.accounts[0];
        this.textToChange = walletToUpdate;

        web3.eth.defaultAccount = walletToUpdate;

        // creating deposit signature
        let signMessageParams = [
          {
            type: 'string',      // Any valid solidity type
            name: 'recoveryWallet',     // Any string label you want
            value: walletToUpdate  // The value to sign
          },
          {
            type: 'string',      // Any valid solidity type
            name: 'user',     // Any string label you want
            value: this.$auth.user._id  // The value to sign
          }
        ];
        let from = walletToUpdate;
        signMsg(signMessageParams, from)
          .then(updateSignature => {
            console.log('sign', updateSignature);
            this.sendUpdateRequest(walletToUpdate, updateSignature);
          })
          .catch(error => {
            alert("Recovery wallet update error.\n\n" + error.message);
          });
      },
      sendUpdateRequest(wallet, sign){
        this.walletChecked = false;
        this.updateSuccessfullyDone = false;
        return this.$axios.post('/api/v0.1/user/update-recovery-wallet',{wallet, sign})
          .then(({data}) => {
            this.walletChecked = true;
            this.responseSuccess = data.success === true;
            this.responseMessage = data.message;
            if(data.success) {
              this.updateSuccessfullyDone = true;
              this.$auth.fetchUser();
            }
          })
          .catch(error => {
            let data = error.response.data;
            this.walletChecked = true;
            this.responseSuccess = data.success === true;
            this.responseMessage = data.message;
          })
      }
    }
  }
</script>

<style>
</style>
