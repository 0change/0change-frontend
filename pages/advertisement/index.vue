<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header"><strong>Online Filter</strong></div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <div class="form-group">
                  <label for="select3">Type</label>
                  <select v-model="filter.type" class="form-control" id="select3" name="select3">
                    <option value="">All types</option>
                    <option value="sell">Sell</option>
                    <option value="buy">Buy</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="form-group">
                  <label for="token-search-input">Token</label>
                  <input v-model="filter.token" class="form-control" id="token-search-input" type="text" name="text-input" placeholder="Token name">
                </div>
              </div>
              <div class="col-sm-3">
                <div class="form-group">
                  <label for="token-search-pm">Payment method</label>
                  <input v-model="filter.paymentMethod" class="form-control" id="token-search-pm" type="text" name="text-input" placeholder="type method">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <strong>Advertisements</strong>
            <a href="/advertisement/new">
              <button class="btn btn-sm btn-primary pull-right" type="submit">
                <i class="fa fa-plus-square"></i>
                <span> New Advertisement</span>
              </button>
            </a>
          </div>
          <div class="card-body">
            <table class="table table-responsive-sm table-sm table-advs">
              <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Token</th>
                <th>Limit</th>
                <th>Payment method</th>
                <th>Price</th>
                <th>Enable</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(row, rowIndex) in getFilteredAdvertisements">
                <td>
                  <BaseLink :to="{name: 'advertisement-view-id', params: {id: row._id}}">{{row._id}}</BaseLink>
                </td>
                <td><span class="badge" :class="row.type.toLowerCase()=='buy' ? 'badge-success' : 'badge-danger'">{{row.type}}</span></td>
                <td><img class="transaction-coin-icon" :src="'/erc20-tokens/' + row.token.code + '.png'" alt=""> {{row.token.title}}</td>
                <td>{{row.limitMin}} - {{row.limitMax}}</td>
                <td>{{row.paymentMethod.title}}</a></td>
                <td>{{row.amount}}</td>
                <td>
                  <label class="switch switch-sm switch-label switch-outline-success-alt mb-0">
                    <input @click="toggleAdvertisementEnable(rowIndex)" class="switch-input" type="checkbox" :checked="row.enable">
                    <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                  </label>
                </td>
                <td>
                  <!--<BaseLink :to="{name: 'advertisement-edit-id',params:{id: row._id}}">-->
                    <!--<button class="btn btn-sm btn-primary" style="padding: 0px 0.25em" type="button">edit</button>-->
                  <!--</BaseLink>-->
                  <button @click="confirmAndDeleteAdvertisement(rowIndex)" class="btn btn-sm btn-danger" style="padding: 0px 0.25em" type="button">delete</button>
                </td>
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
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  export default {
    layout: 'coreui',
    data() {
      return {
        filter:{
          type: "",
          token: '',
          paymentMethod: ''
        },
        listInRefresh: false,
        // advertisements: [...templateAdvertisements]
      }
    },
//    asyncData ({ params, $axios }) {
//      return $axios.post(`/api/v0.1/advertisements/list`)
//          .then(({data}) => {
//            if(data.success)
//              return {advertisements: data.advertisements};
//            return {trades: []}
//          })
//    },
    async mounted(){
      this.listInRefresh = true;
      await this.loadUserAdvertisementList();
      this.listInRefresh = false;
    },
    computed: {
      ...mapGetters('global', {
        advertisements: 'userAdvertisementList'
      }),
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
      ...mapActions('global',['loadUserAdvertisementList']),
      ...mapMutations('global',['setAdvertisementEnable', 'deleteAdvertisement']),
      toggleAdvertisementEnable(index){
        let advertisement = this.advertisements[index];
        let _id = advertisement._id;
        let enable = advertisement.enable===false;
        this.setAdvertisementEnable({_id, enable});
        this.$axios.post('/api/v0.1/advertisement/set-enable',{id: _id, enable})
          .then(({data}) => data)
          .catch(error => error.response.data)
          .then(data => {
            if(data.success){
              this.$toast.success("Advertisement saved successfully");
            }else{
              this.$toast.error(data.message || "Server side error");
            }
          })
      },
      confirmAndDeleteAdvertisement(index){
        let deleteConfirmed = confirm('Are you sure to delete advertisement?');
        if(deleteConfirmed) {
          let advertisement = this.advertisements[index];
          let _id = advertisement._id;
          this.deleteAdvertisement(_id);
          this.$axios.post('/api/v0.1/advertisement/delete', {id: _id})
            .then(({data}) => data)
            .catch(error => error.response.data)
            .then(data => {
              if (data.success) {
                this.$toast.success("Advertisement deleted successfully");
              } else {
                this.$toast.error(data.message || "Server side error");
              }
            })
        }
      }
    }
  }
  const templateAdvertisements = [
    {
      id: 'f74f7g575744',
      type: 'Buy',
      token: {
        icon: '/erc20-tokens/dai_stablecoin.png',
        title: 'Dai Stable Coin (DAI)',
      },
      limit: {min: 0, max: 100},
      payment: {method: 'Cash payment', window: '04:30'},
      price: 46.58,
      enable: true,
    },
    {
      id: 'f74f7g575744',
      type: 'Sale',
      token: {
        icon: '/erc20-tokens/dai_stablecoin.png',
        title: 'Dai Stable Coin (DAI)',
      },
      limit: {min: 0, max: 100},
      payment: {method: 'Pay-Pal', window: '04:30'},
      price: 46.58,
      enable: true,
    },
    {
      id: 'f74f7g575744',
      type: 'Buy',
      token: {
        icon: '/erc20-tokens/dai_stablecoin.png',
        title: 'Dai Stable Coin (DAI)',
      },
      limit: {min: 0, max: 100},
      payment: {method: 'Method of payment', window: '04:30'},
      price: 46.58,
      enable: false,
    },
    {
      id: 'f74f7g575744',
      type: 'Sale',
      token: {
        icon: '/erc20-tokens/dai_stablecoin.png',
        title: 'Dai Stable Coin (DAI)',
      },
      limit: {min: 0, max: 100},
      payment: {method: 'Payment Method #3', window: '04:30'},
      price: 46.58,
      enable: false,
    },
    {
      id: 'f74f7g575744',
      type: 'Buy',
      token: {
        icon: '/erc20-tokens/dai_stablecoin.png',
        title: 'Dai Stable Coin (DAI)',
      },
      limit: {min: 0, max: 100},
      payment: {method: 'Payment', window: '04:30'},
      price: 46.58,
      enable: false,
    },
    {
      id: 'f74f7g575744',
      type: 'Sale',
      token: {
        icon: '/erc20-tokens/dai_stablecoin.png',
        title: 'Dai Stable Coin (DAI)',
      },
      limit: {min: 0, max: 100},
      payment: {method: 'Method of payment', window: '04:30'},
      price: 46.58,
      enable: true,
    },
    {
      id: 'f74f7g575744',
      type: 'Buy',
      token: {
        icon: '/erc20-tokens/dai_stablecoin.png',
        title: 'Dai Stable Coin (DAI)',
      },
      limit: {min: 0, max: 100},
      payment: {method: 'Method of payment', window: '04:30'},
      price: 46.58,
      enable: false,
    },
  ];
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
