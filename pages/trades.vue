<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header"><strong>{{$t('pages.trades.mainBox.title')}}</strong></div>
          <div class="card-body">
            <table class="table table-responsive-sm table-sm">
              <thead>
              <tr>
                <th>{{$t('pages.trades.mainBox.table.head.id')}}</th>
                <th>{{$t('pages.trades.mainBox.table.head.msg')}}</th>
                <th>{{$t('pages.trades.mainBox.table.head.status')}}</th>
                <th>{{$t('pages.trades.mainBox.table.head.date')}}</th>
                <th>{{$t('pages.trades.mainBox.table.head.trader')}}</th>
                <th>{{$t('pages.trades.mainBox.table.head.type')}}</th>
                <th>{{$t('pages.trades.mainBox.table.head.token')}}</th>
                <th>{{$t('pages.trades.mainBox.table.head.price')}}</th>
                <th>{{$t('pages.trades.mainBox.table.head.count')}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="row in trades">
                <td>
                  <BaseLink :to="{name: 'trade-id', params: {id: row._id}}">{{row.id}}</BaseLink>
                </td>
                <td>
                  <span v-if="tradeUnreadMessages(row) > 0"
                        class="badge badge-danger">{{tradeUnreadMessages(row)}}</span>
                </td>
                <td>{{$t('trade.status.'+row.status)}}</td>
                <td>{{row.createdAt | std_datetime}}</td>
                <td>
                  <BaseLink :to="{name: 'profile-id', params: {id: extractTrader(row)._id}}">
                    {{extractTrader(row).username}}
                  </BaseLink>
                </td>
                <td><span class="badge"
                          :class="row.advertisement.type.toLowerCase()=='sell' ? 'badge-success' : 'badge-danger'">{{$t('trade.type.'+row.advertisement.type)}}</span>
                </td>
                <td><img class="transaction-coin-icon" :src="'/erc20-tokens/' + row.advertisement.token.code + '.png'"
                         alt=""> {{row.advertisement.token.title}} ({{row.advertisement.token.code}})
                </td>
                <td>{{row.advertisement.amount}}</td>
                <td>{{row.tokenCount}}</td>
              </tr>
              </tbody>
            </table>
            <!--<pre>{{JSON.stringify(trades, null, 2)}}</pre>-->
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
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex';

  export default {
    layout: 'coreui',
    data() {
      return {
        loading: true,
        trades: []
      }
    },
    computed: {
      ...mapState('notifications', ['unreadMessages'])
    },
    mounted() {
      this.loadTradeList();
    },
    methods: {
      loadTradeList() {
        this.loading = true;
        this.$axios.post(`/api/v0.1/trade/list`)
          .then(({data}) => {
            if (data.success)
              this.trades = data.trades;
          })
          .catch(error => {})
          .then(() => {
            this.loading = false;
          })
      },
      extractTrader: function (trade) {
        if (trade.user._id === this.$auth.user._id)
          return trade.advertisementOwner;
        else
          return trade.user;
      },
      tradeUnreadMessages(trade) {
        if (!!this.unreadMessages && this.unreadMessages[trade._id])
          return this.unreadMessages[trade._id].length;
        else
          return 0;
      }
    }
  }
</script>

<style>
  .cc-token-avatar {
    width: 30px;
    height: 30px
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
