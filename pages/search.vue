<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <SearchBox ref="searchBox" @onSearch="onSearchButtonClick"/>
        <div class="text-center">
          <Pagination
            :count="Math.ceil(searchResult.length / itemPerPage)"
            :itemPerPage="itemPerPage"
            :current="page"
            @change="onPageChange"
          />
        </div>
        <table class="table table-responsive-sm table-sm mb-0">
          <thead class="thead-light">
          <tr>
            <th class="text-left">
              <i class="icon-people"></i>
            </th>
            <th>{{$t('searchResult.head.seller')}}</th>
            <th class="text-left">{{$t('searchResult.head.country')}}</th>
            <!--<th>Feedback Score</th>-->
            <th class="text-left">{{$t('searchResult.head.token')}}</th>
            <th class="text-left">{{$t('searchResult.head.price')}}</th>
            <th class="text-left">{{$t('searchResult.head.minMax')}}</th>
            <th>{{$t('searchResult.head.activity')}}</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="searchInProgress">
            <td colspan="7" class="text-center">
              <i style="font-size: 2em" class="fa fa-spinner fa-lg fa-spin"></i>
            </td>
          </tr>
          <TradeSearchItem
              v-for="(advertisement, index) in currentPage"
              :key="page * itemPerPage + index"
              :advertisement="advertisement"
              buttonTitle="Buy"
          />
          </tbody>
        </table>
        <div class="text-center">
          <Pagination
            :count="Math.ceil(searchResult.length / itemPerPage)"
            :itemPerPage="itemPerPage"
            :current="page"
            @change="onPageChange"
          />
        </div>
        <!--<pre>{{JSON.stringify(searchResult, null, 2)}}</pre>-->
      </div>
    </div>
  </div>
</template>

<script>
  import SearchBox from '~/components/SearchBox';
  import Pagination from '~/components/Pagination';
  import TradeSearchItem from '~/components/TradeSearchItem';
  import TabBox from '~/components/TabBox';
  import {mapActions, mapGetters, mapState} from 'vuex';

  export default {
    layout: 'coreui-no-sidemenu',
    components: {TabBox, SearchBox, TradeSearchItem, Pagination},
    data() {
      return {
        page: 0,
        itemPerPage: 20,
        searchInProgress: true,
        getResultInProgress: false,
        searchParams:{
          type: '',
          country: "",
          currency: 'USD',
          amount: "",
          paymentMethod: ""
        },
        searchId: null,
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
      currentPage: function () {
        let start = this.page * this.itemPerPage;
        let end = start + this.itemPerPage;
        for(let i=start ; i<end ; i++){
          if(this.searchResult[i] === null){
            this.getPageResult(this.page);
            break;
          }
        }
        return this.searchResult.slice(start, end)
      }
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
        this.$axios.post('/api/v0.1/search', {query: this.searchParams})
          .then(({data}) => {
            if(data.success){
              this.searchId = data.searchId;
              this.searchResult = new Array(data.count).fill(null);
              // setTimeout(()=>{
              //   this.getPageResult(0);
              // },500);
            }else{
            }
          })
          .catch(error => {
          })
          .then(() => {
            this.searchInProgress = false;
          })
        // let response = await this.search(this.searchParams);
        // if(response.success){
        //   this.searchResult = response.advertisements;
        // }else{
        //   this.searchResult = [];
        // }
      },
      getPageResult(page){
        if(this.getResultInProgress || !this.searchId)
          return;
        this.getResultInProgress = true;
        this.$axios.post('/api/v0.1/search/results',{search: this.searchId, page, itemPerPage: this.itemPerPage})
          .then(({data}) => {
            if(data.success){
              console.log(data);
              this.searchResult.splice(data.page * data.itemPerPage, data.results.length, ...data.results);
            }
          })
          .catch(error => {})
          .then(() => {
            this.getResultInProgress = false;
          })
      },
      onPageChange(page){
          this.page = page;
      }
    }
  }

</script>

<style>
  .cc-token-avatar{width: 30px; height: 30px}
</style>
