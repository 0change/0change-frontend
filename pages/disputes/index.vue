<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <strong>Disputes</strong>
          </div>
          <div class="card-body">
            <table class="table table-responsive-sm table-sm table-advs">
              <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Trader</th>
                <th>Trade</th>
                <th>Token</th>
                <th></th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="row in disputes">
                <td>{{row.date}}</td>
                <td><span class="badge" :class="row.status.toLowerCase()=='open' ? 'badge-danger' : 'badge-success'">{{row.status}}</span></td>
                <td><a href="/profile/4545445f54f45f">{{row.trader}}</a></td>
                <td><a href="/buy/4545445f54f45f">{{row.trade}}</a></td>
                <td><img class="transaction-coin-icon" :src="row.token.icon" alt=""> {{row.token.title}}</td>
                <td>
                  <BaseLink :to="{name: 'disputes-id',params:{id: row.id}}">
                    <button class="btn btn-sm btn-primary" type="button">View</button>
                  </BaseLink>
                </td>
              </tr>
              </tbody>
            </table>
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#">Prev</a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="#">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">4</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'coreui',
    data() {
      return {
        filter:{
          type: "",
          token: '',
          paymentMethod: ''
        },
        disputes: [
          {
            id: '4565fd7c776',
            date: '2018-10-05',
            status: 'Open',
            owner: '465475847538',
            trader: 'trade_user_1',
            trade: '465fd65543ffd7',
            token: {
              icon: '/erc20-tokens/dai_stablecoin.png',
              title: 'Dai Stable Coin (DAI)',
            },
          },
          {
            id: '4565fd7c776',
            date: '2018-10-05',
            status: 'Done',
            owner: '465475847538',
            trader: 'trade_user_1',
            trade: '465fd65543ffd7',
            token: {
              icon: '/erc20-tokens/dai_stablecoin.png',
              title: 'Dai Stable Coin (DAI)',
            },
          },
          {
            id: '4565fd7c776',
            date: '2018-10-05',
            status: 'Done',
            owner: '465475847538',
            trader: 'trade_user_1',
            trade: '465fd65543ffd7',
            token: {
              icon: '/erc20-tokens/dai_stablecoin.png',
              title: 'Dai Stable Coin (DAI)',
            },
          },
        ]
      }
    },
    computed: {
      getFilteredAdvertisements(){
        let filtered = this.advertisements;
        if(!!this.filter.type) {
          filtered = filtered.filter(adv => {
            return adv.type.toLowerCase() === this.filter.type;
          });
        }
        if(!!this.filter.token){
          filtered = filtered.filter(adv => {
            return adv.token.title.toLowerCase().includes(this.filter.token.toLowerCase());
          });
        }
        if(!!this.filter.paymentMethod){
          filtered = filtered.filter(adv => {
            return adv.payment.method.toLowerCase().includes(this.filter.paymentMethod.toLowerCase());
          });
        }
        return filtered;
      }
    },
    methods: {
    }
  }
</script>

<style>
  .cc-token-avatar{width: 30px; height: 30px}
  .table-advs td {vertical-align: middle}
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