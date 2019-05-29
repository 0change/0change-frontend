<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header"><strong>List of wallets</strong></div>
          <div class="card-body">
            <h3>Wallets</h3>
            <table class="table table-responsive-sm table-sm">
              <thead>
              <tr>
                <!--<th>Date</th>-->
                <th>Address</th>
                <th>User</th>
                <th>balance</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="walletListInProgress">
                <td colspan="4" class="text-center">
                  <i style="font-size: 2em" class="fa fa-spinner fa-lg fa-spin"></i>
                </td>
              </tr>
              <tr v-for="(row,index) in wallets">
                <td><a target="_blank" :href="etherscanWallet(row.address)">{{row.address}}</a></td>
                <td><span v-if="row.user">{{row.user.username}}</span></td>
                <td v-if="getBalanceInProgress">
                  <i style="font-size: 2em" class="fa fa-spinner fa-spin"></i>
                </td>
                <td v-else>{{nonZeroBalance(row.balances)}}</td>
                <td>
                  <a v-for="token in withdrawableTokens(row)" href="#" class="badge badge-info"
                     @click="withdraw(row, token)">withdraw {{token}}</a>
                </td>
              </tr>
              </tbody>
            </table>
            <!--<Pagination-->
              <!--:count="5"-->
              <!--:current="2"-->
              <!--@change="onPageChange"-->
            <!--/>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {mapGetters, mapActions} from 'vuex';
  import Pagination from "../../components/Pagination";
  import moment from 'moment';

  export default {
    components: {Pagination},
    layout: 'coreui',
    data() {
      return {
        wallets: [],
        getBalanceInProgress: true,
        walletListInProgress: true,
        etherscanBaseUrl: process.env.ETHERSCAN_BASE_URL,
        pagination: {
          currentPage: 0,
          itemPerPage: 20,
          totalCount: 0
        },
      }
    },
    computed: {
      ...mapGetters('global', ['cryptoTokens'])
    },
    mounted() {
      this.getWalletList();
    },
    methods: {
      getWalletList() {
        // return;
        let {page, per_page} = this.$route.query;
        this.walletListInProgress = true;
        this.$axios.post('/api/v0.1/operator/get-withdraw-wallets',{
          page: page||0,
          itemPerPage: per_page || this.pagination.itemPerPage
        })
          .then(({data}) => {
            if (data.success && data.wallets) {
              this.wallets = data.wallets;
              Vue.set(this.pagination, 'currentPage', data.page);
              Vue.set(this.pagination, 'itemPerPage', data.itemPerPage);
              Vue.set(this.pagination, 'totalCount', data.totalCount);
              this.getAllWalletBalance()
            }
          })
          .catch(error => {})
          .then(()=>{
            this.walletListInProgress = false;
          })
      },
      onPageChange(page){
        alert(`page: ${page}`);
      },
      getAllWalletBalance() {
        this.getBalanceInProgress = true;
        // return;
        Promise.all(this.wallets.map(wallet => {
          return this.getSingleWalletBalance(wallet.address);
        }))
          .then(walletBalances => {
            for (let i = 0; i < walletBalances.length; i++)
              Vue.set(this.wallets[i], 'balances', walletBalances[i]);
          })
          .catch(error => {
          })
          .then(() => {
            this.getBalanceInProgress = false;
          })
      },
      getSingleWalletBalance(address) {
        // return;
        return this.$axios.post('/api/v0.1/operator/check-wallet-balance', {address})
          .then(({data}) => {
            if (data.success && data.balances) {
              return data.balances;
            }
            return {};
          })
      },
      nonZeroBalance(balance) {
        if (!balance) return;
        return Object.keys(balance)
          .filter(token => parseFloat(balance[token]) > 0)
          .map(token => `${token}: ${balance[token]}`)
          .join(' , ')
      },
      withdrawableTokens(row) {
        if (!row.balances)
          return [];
        return Object.keys(row.balances).filter(token => row.balances[token] > 0);
      },
      etherscanWallet(address) {
        return this.etherscanBaseUrl + 'address/' + address;
      },
      withdraw(row, tokenCode) {
        let addressToWithdraw = row.address;
        let token = this.cryptoTokens.find(t => t.code === tokenCode)
        let amount = prompt('Enter amount to withdraw:', row.balances[tokenCode]);
        if (!amount)
          return;
        // alert(JSON.stringify({
        //   token: tokenCode,
        //   contractAddress: token.contractAddress,
        //   balance: row.balances[tokenCode],
        //   amount
        // },null,2));
        if (typeof web3 == 'undefined' || !web3.currentProvider.isMetaMask /*|| ( web3.currentProvider.isMetaMask && typeof web3.eth.accounts[0] == 'undefined' ) */) {
          alert("MetaMask is not enabled.");
          return;
        }
        amount = web3.toBigNumber(amount);

        let minABI = [
          // withdraw
          {
            "constant": false,
            "inputs": [
              {
                "name": "_contract",
                "type": "address"
              },
              {
                "name": "_amount",
                "type": "uint256"
              }
            ],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ];

        web3.eth.defaultAccount = web3.eth.accounts[0];
        let contract = web3.eth.contract(minABI).at(addressToWithdraw);
        let value = amount.times(web3.toBigNumber(10).pow(token.decimals));
        try {
          contract.withdraw(token.contractAddress, value, (error, txHash) => {
            if (error) {
              alert(error.message || 'Internal Error!');
              return;
            }
            alert('successfully done');
            console.log('txHash: ', txHash);
          });
        } catch (e) {
          alert(e.message || 'fatal error');
          console.log(e);
        }
      }
    }
  }
</script>

<style>
  .cc-token-avatar {
    width: 20px;
    height: 20px
  }

  .table-coin-count {
    width: 100%
  }

  .table-coin-count td {
    padding: 0.5em 1em;
  }

  .table-coin-count td:nth-child(1) {
    padding-right: 3em;
  }

  .table-coin-count td:nth-child(2) {
    font-weight: bold;
  }

  .table-coin-count tr:nth-child(odd) {
    background: #eee;
  }

  .table-wallet-info {
    width: 100%;
    margin-bottom: 1.2em
  }

  .table-wallet-info td {
    padding: 0.5em 1em;
  }

  .table-wallet-info td:nth-child(1) {
    font-weight: bold;
    padding-right: 3em
  }

  .copy-button {
    display: inline-block;
    width: inherit;
    padding: 0.2em 0.5em;
    cursor: pointer;
  }

  .transaction-coin-icon {
    height: 1.5em;
  }
</style>
