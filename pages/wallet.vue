<template>
  <div>
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header"><strong>{{$t('pages.wallet.mainBox.title')}}</strong></div>
          <div class="card-body">
            <table class="table-wallet-info">
              <tbody>
              <tr>
                <td>{{$t('pages.wallet.mainBox.address')}}</td>
                <td>
                  <a target="_blank" :href="etherscanWallet($auth.user.address)">
                    <span class="wallet-address">{{$auth.user.address}}</span>
                  </a>
                  <button class="btn btn-block btn-outline-dark copy-button" type="button" @click="copyWalletAddress">
                    <i class="fa fa-copy fa-lg"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
            <h3>{{$t('pages.wallet.mainBox.transactions')}}</h3>
            <table class="table table-responsive-sm table-sm">
              <thead>
              <tr>
                <!--<th>Date</th>-->
                <th>{{$t('pages.wallet.mainBox.tableHead.trade')}}</th>
                <th>{{$t('pages.wallet.mainBox.tableHead.txHash')}}</th>
                <th>{{$t('pages.wallet.mainBox.tableHead.from')}}</th>
                <th>{{$t('pages.wallet.mainBox.tableHead.to')}}</th>
                <th>{{$t('pages.wallet.mainBox.tableHead.type')}}</th>
                <th>{{$t('pages.wallet.mainBox.tableHead.status')}}</th>
                <th>{{$t('pages.wallet.mainBox.tableHead.token')}}</th>
                <th>{{$t('pages.wallet.mainBox.tableHead.count')}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="row in transactions">
                <!--<td>{{row.txTime}}</td>-->
                <td>
                  <BaseLink v-if="row.trade" :to="{name: 'trade-id', params: {id: row.trade}}">
                    <span>{{row._id.substr(0,8) + '...'}}</span>
                  </BaseLink>
                </td>
                <td><a v-if="!row.trade && row.thHash" target="_blank" :href="etherscanTx(row.txHash)">{{row.txHash.substr(0,12) + ' ...'}}</a></td>
                <td><a target="_blank" :href="etherscanWallet(row.from)">{{row.from.substr(0,12) + ' ...'}}</a></td>
                <td><a target="_blank" :href="etherscanWallet(row.to)">{{row.to.substr(0,12) + ' ...'}}</a></td>
                <td>
                  <span
                    class="badge"
                    :class="transactionTypeClass(row)"
                  >{{$t('pages.wallet.mainBox.txType.' + txTitle(row))}}</span>
                </td>
                <td>
                  <span>{{$t('pages.wallet.mainBox.status.' + row.status)}}</span>
                </td>
                <td>
                  <img class="transaction-coin-icon" :src="'/erc20-tokens/' + row.token + '.png'" alt="">
                  <span>&nbsp;{{getTokenByCode(row.token).title}}</span></td>
                <td>{{row.count}}</td>
              </tr>
              </tbody>
            </table>
            <!--<ul class="pagination">-->
              <!--<li class="page-item">-->
                <!--<a class="page-link" href="#">Prev</a>-->
              <!--</li>-->
              <!--<li class="page-item active">-->
                <!--<a class="page-link" href="#">1</a>-->
              <!--</li>-->
              <!--<li class="page-item">-->
                <!--<a class="page-link" href="#">2</a>-->
              <!--</li>-->
              <!--<li class="page-item">-->
                <!--<a class="page-link" href="#">3</a>-->
              <!--</li>-->
              <!--<li class="page-item">-->
                <!--<a class="page-link" href="#">4</a>-->
              <!--</li>-->
              <!--<li class="page-item">-->
                <!--<a class="page-link" href="#">Next</a>-->
              <!--</li>-->
            <!--</ul>-->

          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-header"><strong>{{$t('pages.wallet.balanceBox.title')}}</strong></div>
          <div class="card-body">
            <table class="table-coin-count">
              <tbody>
              <tr v-for="(amount, code) in balance">
                <td>
                  <img class="cc-token-avatar" :src="'/erc20-tokens/'+code+'.png'">
                  <span>{{getTokenByCode(code).title}} ({{code}})</span>
                </td>
                <td>{{amount}}</td>
              </tr>
              </tbody>
            </table>
            <button v-if="balanceRefreshInProgress" style="margin-top: 1em" type="button" class="btn btn-block btn-primary">
              <i class="fa fa-spinner fa-spin"></i>
            </button>
            <button v-else @click="refreshBalance" style="margin-top: 1em" type="button" class="btn btn-block btn-primary">{{$t('pages.wallet.balanceBox.btnTitle')}}</button>
            <button v-if="false" @click="$refs.depositModal.show($event)" style="margin-top: 1em" type="button" class="btn btn-block btn-primary">Deposit</button>
            <BaseModal v-if="false" title="Fake deposit" ref="depositModal">
              <div style="padding: 1em">
                <div class="form-group">
                  <label>Select token to deposit</label>
                  <select v-model="depositData.token" class="form-control">
                    <option v-for="token in cryptoTokens" :value="token.code">{{token.title}} ({{token.code}})</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>select token amount</label>
                  <input v-model="depositData.amount" class="form-control" type="number">
                </div>
                <div class="form-group">
                  <button @click="doFakeDeposit" type="button" class="btn btn-block btn-primary">Deposit</button>
                </div>
              </div>
            </BaseModal>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><strong>{{$t('pages.wallet.withdrawBox.title')}}</strong></div>
          <div class="card-body">
            <div class="form-group">
              <label for="company">{{$t('pages.wallet.withdrawBox.wallet.label')}}</label>
              <input v-model="withdrawData.to" class="form-control" id="company" type="text" :placeholder="$t('pages.wallet.withdrawBox.wallet.placeholder')">
            </div>
            <div class="form-group">
              <label>{{$t('pages.wallet.withdrawBox.token.label')}}</label>
              <select v-model="withdrawData.token" class="form-control">
                <option v-for="(amount, token) in balance" :value="token">{{getTokenByCode(token).title}} ({{token}})</option>
              </select>
            </div>
            <div class="form-group">
              <label for="company">{{$t('pages.wallet.withdrawBox.amount.label')}}</label>
              <input
                  v-model="withdrawData.amount"
                  class="form-control"
                  id="company"
                  type="number"
                  placeholder="0.0000"
              >
            </div>
            <button @click="doWithdraw" class="btn btn-block btn-primary" type="button">{{$t('pages.wallet.withdrawBox.btnTitle')}}</button>
            <br />
            <div class="alert alert-warning">
              <span><strong>{{$t('pages.wallet.withdrawBox.alert.title')}}</strong>{{$t('pages.wallet.withdrawBox.alert.text')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import BaseLink from "../components/global/BaseLink";
  export default {
    components: {BaseLink},
    layout: 'coreui',
    data() {
      return {
        balanceRefreshInProgress: false,
        depositData: {
          token: null,
          amount: ''
        },
        withdrawData: {
          token: null,
          to: "", //"0xd86ffb989f06150e17c5b80c2a3751f16da50a61",
          amount: ''
        },
        etherscanBaseUrl: process.env.ETHERSCAN_BASE_URL
      }
    },
    computed: {
        ...mapGetters('global', ['cryptoTokens', 'balance', 'transactions']),
    },
    mounted(){
      this.loadUserBalance();
      this.refreshBalance();
    },
    methods: {
      ...mapActions('global',['fakeDeposit', 'withdraw', 'loadUserBalance']),
      copyWalletAddress(){
        this.$copyText(this.$auth.user.address)
            .then(e => {
              this.$toast.success('Address copied successfully.');
            })
            .catch(e => {
              this.$toast.error('Error on copying address.');
            })
      },
      async doFakeDeposit(){
        if(!this.depositData.token || parseInt(this.depositData.amount)===0)
          return alert('Enter token and amount to deposit');
        let response = await this.fakeDeposit(this.depositData);
        if(response.success){
          this.loadUserBalance();
          this.depositData = {token: null, amount: ''};
          this.$refs.depositModal.hide();
        }else{
          alert(response.message || "Server side error");
        }
      },
      async doWithdraw(){
        let response = await this.withdraw(this.withdrawData);
        if(response.success){
          this.transactions = response.transactions;
          this.balance = response.balance;
          this.withdrawData = {to: '', token: null, amount: ''};
        }else{
          alert(response.message || "Server side error");
        }
      },
      getTokenByCode(code){
        return this.cryptoTokens.find(t => t.code==code) || {code, title: code};
      },
      transactionType(tx){
        if(tx.to === this.$auth.user.address)
          return 'deposit';
        else
          return 'withdraw';
      },
      txTitle(row){
        return row.trade != null ? 'trade' : this.transactionType(row);
      },
      transactionTypeClass(tx){
        if(tx.status === 'cancel' || tx.status === 'fail'){
          return 'badge-danger';
        }
        let txType = this.transactionType(tx);
        switch (txType){
          case 'deposit': return 'badge-success';
          case 'withdraw': return 'badge-warning';
          default: return 'badge-secondary';
        }
      },
      refreshBalance(){
        this.balanceRefreshInProgress = true;
        this.$axios.post('/api/v0.1/user/check-deposit')
          .then(async response => {
            //if(response.newTransaction > 0)
              await this.loadUserBalance();
              this.balanceRefreshInProgress = false;
              this.$toast.success(this.$t('pages.wallet.balanceBox.refreshSuccess'))
          })
          .catch(error => {});
      },
      etherscanWallet(address){
        return this.etherscanBaseUrl + 'address/' + address;
      },
      etherscanTx(tx_hash){
        return this.etherscanBaseUrl + 'tx/' + tx_hash;
      }
    }
  }
</script>

<style>
  .cc-token-avatar{width: 20px; height: 20px}
  .table-coin-count{width: 100%}
  .table-coin-count td{
    padding: 0.5em 1em;
  }
  .table-coin-count td:nth-child(1){
    padding-right: 3em;
  }
  .table-coin-count td:nth-child(2){
    font-weight: bold;
  }
  .table-coin-count tr:nth-child(odd){
    background: #eee;
  }
  .table-wallet-info{width: 100%; margin-bottom: 1.2em}
  .table-wallet-info td{
    padding: 0.5em 1em;
  }
  .table-wallet-info td:nth-child(1){
    font-weight: bold;
    padding-right: 3em
  }
  .copy-button{
    display: inline-block;
    width: inherit;
    padding: 0.2em 0.5em;
    cursor: pointer;
  }
  .transaction-coin-icon{
    height: 1.5em;
  }
</style>
