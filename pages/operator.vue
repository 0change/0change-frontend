<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header"><strong>List of withdrawals</strong></div>
          <div class="card-body">
            <h3>Transactions</h3>
            <table class="table table-responsive-sm table-sm">
              <thead>
              <tr>
                <!--<th>Date</th>-->
                <th>Date</th>
                <th>tx hash</th>
                <th>From</th>
                <th>To</th>
                <th>Type</th>
                <th>status</th>
                <th>Token</th>
                <th>count</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(row,index) in transactions">
                <!--<td>{{row.txTime}}</td>-->
                <td>
                  <span>{{transactionDate(row)}}</span>
                </td>
                <td><a v-if="!row.trade && row.txHash" target="_blank" :href="etherscanTx(row.txHash)">{{row.txHash.substr(0,12)
                  + ' ...'}}</a></td>
                <td><a target="_blank" :href="etherscanWallet(row.from)">{{row.from.substr(0,12) + ' ...'}}</a></td>
                <td><a target="_blank" :href="etherscanWallet(row.to)">{{row.to.substr(0,12) + ' ...'}}</a></td>
                <td>
                  <span
                    class="badge"
                    :class="transactionTypeClass(row)"
                  >{{row.trade != null ? 'trade' : transactionType(row)}}</span>
                </td>
                <td>
                  <span>{{row.status}}</span>
                </td>
                <td>
                  <img class="transaction-coin-icon" :src="'/erc20-tokens/' + row.token + '.png'" alt="">
                  <span>&nbsp;{{getTokenByCode(row.token).title}}</span></td>
                <td>{{row.count}}</td>
                <td>
                  <a v-if="needToPay(row)" href="#" class="badge badge-info" @click="payTransaction(row, index)">Pay</a>
                  <a v-else-if="needToUpdate(row)" href="#" class="badge badge-success"
                     @click="updateTransaction(row, index)">update-status</a>
                </td>
              </tr>
              </tbody>
            </table>
            <ul v-if="paginationItems.length > 1" class="pagination">
              <!--<li class="page-item">-->
              <!--<a class="page-link" href="#">Prev</a>-->
              <!--</li>-->
              <li v-for="item in paginationItems" class="page-item" :class="{active: item.page==pagination.currentPage}">
                <a class="page-link" :href="'?page=' + item.page + '&per_page=' + item.itemPerPage">{{item.page}}</a>
              </li>
              <!--<li class="page-item">-->
              <!--<a class="page-link" href="#">Next</a>-->
              <!--</li>-->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {mapGetters, mapActions} from 'vuex';
  import BaseLink from "../components/global/BaseLink";
  import moment from 'moment';

  export default {
    components: {BaseLink},
    layout: 'coreui',
    data() {
      return {
        transactions: [],
        pagination: {
          currentPage: 0,
          itemPerPage: 30,
          totalCount: 0
        },
        ERC20: null,
        etherscanBaseUrl: process.env.ETHERSCAN_BASE_URL
      }
    },
    computed: {
      ...mapGetters('global', ['cryptoTokens']),
      paginationItems() {
        let result = [];
        for (let i = 0; i * this.pagination.itemPerPage < this.pagination.totalCount; i++) {
          result.push({
            page: i,
            itemPerPage: this.pagination.itemPerPage
          });
        }
        return result;
      },
    },
    mounted() {
      this.refreshTransactions();
    },
    methods: {
      transactionDate(tx) {
        return moment(tx.createdAt).format('YYYY-MM-DD HH:mm')
      },
      getTokenByCode(code) {
        return this.cryptoTokens.find(t => t.code == code) || {code, title: code};
      },
      transactionType(tx) {
        if (tx.to === this.$auth.user.address)
          return 'deposit';
        else
          return 'withdraw';
      },
      transactionTypeClass(tx) {
        let txType = this.transactionType(tx);
        switch (txType) {
          case 'deposit':
            return 'badge-success';
          case 'withdraw':
            return 'badge-danger';
          default:
            return 'badge-secondary';
        }
      },
      refreshTransactions() {
        // return;
        let {page, per_page} = this.$route.query;
        this.$axios.post('/api/v0.1/operator/get-withdrawals',{page: page||0, itemPerPage: per_page || this.pagination.itemPerPage})
          .then(({data}) => {
            if (data.success && data.transactions) {
              this.transactions = data.transactions;
              this.ERC20 = data.ERC20;
              Vue.set(this.pagination, 'currentPage', data.page);
              Vue.set(this.pagination, 'itemPerPage', data.itemPerPage);
              Vue.set(this.pagination, 'totalCount', data.totalCount);
            }
          })
      },
      etherscanWallet(address) {
        return this.etherscanBaseUrl + 'address/' + address;
      },
      etherscanTx(tx_hash) {
        return this.etherscanBaseUrl + 'tx/' + tx_hash;
      },
      needToPay(tx) {
        return (tx.status === 'new' || tx.status === 'fail');
      },
      needToUpdate(tx) {
        return (tx.status === 'pending');
      },
      payTransaction(item, index) {
        console.log(item);
        if (typeof web3 == 'undefined' || !web3.currentProvider.isMetaMask /*|| ( web3.currentProvider.isMetaMask && typeof web3.eth.accounts[0] == 'undefined' ) */) {
          alert("MetaMask is not enabled.");
          return;
        }

        let token = this.getTokenByCode(item.token);
        console.log('token:', token);

        let decimals = web3.toBigNumber(token.decimals);
        let amount = web3.toBigNumber(item.count);

        console.log('ABI: ', this.ERC20.abi);
        console.log('To contract address: ' + token.contractAddress);
        console.log('To wallet address: ' + item.to);

        let minABI = [
          // transfer
          {
            "constant": false,
            "inputs": [
              {
                "name": "_to",
                "type": "address"
              },
              {
                "name": "_value",
                "type": "uint256"
              }
            ],
            "name": "transfer",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "type": "function"
          }
        ];

        web3.eth.defaultAccount = web3.eth.accounts[0];
        // personal.unlockAccount(web3.eth.defaultAccount);

        // Get ERC20 Token contract instance
        let contract = web3.eth.contract(this.ERC20.abi).at(token.contractAddress);

        // calculate ERC20 token amount
        let value = amount.times(web3.toBigNumber(10).pow(token.decimals));
        console.log('value: ', value.toNumber());

        // call transfer function
        try {
          contract.transfer(item.to, value, (error, txHash) => {
            if (error) {
              alert('Internal Error!');
              return;
            } else {
              this.$axios.post('/api/v0.1/operator/set-paid', {id: item._id, txHash})
                .then(({data}) => {
                  if (data.success) {
                    this.$toast.success('Transaction paid successfully');
                    Vue.set(this.transactions[index], 'status', 'pending');
                    Vue.set(this.transactions[index], 'txHash', txHash);
                  } else {
                    this.$toast.error(data.message || "Somethings went wrong.")
                  }
                })
                .catch(error => {
                  this.$toast.error(error.response.message || "Somethings went wrong.")
                })
            }
            // it returns tx hash because sending tx
            console.log('txHash: ', txHash);
            // axios
            //   .post("/api/withdraws/accept", self.selected_transaction)
            //   .then(response => {
            //     //self.$refs.acceptWithdrawModal.hide();
            //     self.updatePage(self);
            //   })
            //   .catch(error => {
            //     console.log("error: ", error);
            //   });
          });
        } catch (e) {
          alert(e.message || 'fatal error')
          console.log(e);
        }
      },
      updateTransaction(item, index) {
        this.$axios.post('/api/v0.1/operator/check-status', {id: item._id})
          .then(({data}) => {
            if (data.success) {
              this.$toast.success('Transaction update successfully');
              Vue.set(this.transactions[index], 'status', data.status);
            } else {
              this.$toast.error(data.message || "Somethings went wrong.")
            }
          })
          .catch(error => {
            this.$toast.error(error.response.message || "Somethings went wrong.")
          })
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
