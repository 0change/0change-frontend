<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <SearchBox ref="searchBox" @onSearch="onSearchButtonClick"/>
        <table class="table table-responsive-xs table-hover table-outline mb-0">
          <thead class="thead-light">
          <tr>
            <th class="text-left">
              <i class="icon-people"></i>
            </th>
            <th>Seller</th>
            <th class="text-left">Country</th>
            <!--<th>Feedback Score</th>-->
            <th class="text-left">Token</th>
            <th class="text-left">Price</th>
            <th>Activity</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="searchInProgress">
            <td colspan="8">
              <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </td>
          </tr>
          <TradeSearchItem
              v-for="advertisement in searchResult"
              :key="advertisement._id"
              :advertisement="advertisement"
              buttonTitle="Buy"
          />
          </tbody>
        </table>
        <!--<pre>{{JSON.stringify(searchResult, null, 2)}}</pre>-->
      </div>
    </div>
  </div>
</template>

<script>
  import SearchBox from '~/components/SearchBox';
  import TradeSearchItem from '~/components/TradeSearchItem';
  import TabBox from '~/components/TabBox';
  import {mapActions, mapGetters, mapState} from 'vuex';
  export default {
    layout: 'coreui-no-sidemenu',
    components: {TabBox, SearchBox, TradeSearchItem},
    data() {
      return {
        searchInProgress: false,
        searchParams:{
          type: '',
          country: "",
          currency: 'USD',
          amount: "",
          paymentMethod: ""
        },
        searchResult: []
      }
    },
    computed:{
      ...mapState('global', {
        sellAdvertisements: 'sellSearchResult',
        buyAdvertisements: 'buySearchResult',
        currencies: 'allCurrencies',
        countries: 'allCountries',
      }),
    },
    mounted(){
      this.onQueryChange();
    },
    watch: {
      '$route' (to, from) {
        // react to route changes...
        this.onQueryChange();
      }
    },
    methods: {
        ...mapActions('global', ['search']),
      onQueryChange(){
        this.searchParams = this.$route.query;
        this.$refs.searchBox.setSearchParams(this.searchParams);
        this.doSearch();
      },
      onSearchButtonClick(query){
        this.$router.replace({name: 'search', query});
        this.searchParams = query;
      },
      async doSearch(){
//        alert(JSON.stringify(this.searchParams, null, 2));
        this.searchInProgress = true;
//      await this.search();
        let response = await this.search(this.searchParams);
        if(response.success){
          this.searchResult = response.advertisements;
        }else{
          this.searchResult = [];
        }
        this.searchInProgress = false;
      }
    }
  }

</script>

<style>
  .cc-token-avatar{width: 30px; height: 30px}
</style>