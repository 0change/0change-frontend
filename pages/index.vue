<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <SearchBox @onSearch="onSearchButtonClick"/>

        <h4>Buy Tokens from this offers</h4>
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
            <td colspan="8" class="text-center">
              <i style="font-size: 2em" class="fa fa-spinner fa-lg fa-spin"></i>
            </td>
          </tr>
          <TradeSearchItem
            v-for="advertisement in sellAdvertisements"
            :key="advertisement._id"
            :advertisement="advertisement"
            buttonTitle="Buy"
          />
          </tbody>
        </table>

        <div class="text-right">
          <BaseLink :to="{name: 'search', query: {type: 'sell'}}">
            <i class="fa fa-plus-circle fa-lg mt-2 mb-4"></i>
            <span>See more options ...</span>
          </BaseLink>
        </div>

        <h4>Sell your Tokens to this offers</h4>
        <table class="table table-responsive-sm table-sm mb-0">
          <thead class="thead-light">
          <tr>
            <th class="text-left">
              <i class="icon-people"></i>
            </th>
            <th>{{$t('searchResult.head.buyer')}}</th>
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
            <td colspan="8" class="text-center">
              <i style="font-size: 2em" class="fa fa-spinner fa-lg fa-spin"></i>
            </td>
          </tr>
          <TradeSearchItem
            v-for="advertisement in buyAdvertisements"
            :key="advertisement._id"
            :advertisement="advertisement"
            buttonTitle="Buy"
          />
          </tbody>
        </table>

        <div class="text-right">
          <BaseLink :to="{name: 'search', query: {type: 'buy'}}">
            <i class="fa fa-plus-circle fa-lg mt-2 mb-4"></i>
            <span>See more options ...</span>
          </BaseLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TradeSearchItem from '~/components/TradeSearchItem';
  import SearchBox from '~/components/SearchBox';
  import TabBox from '~/components/TabBox';
  import {mapActions, mapGetters, mapState} from 'vuex';
  export default {
    layout: 'coreui-no-sidemenu',
    components: {TabBox, TradeSearchItem, SearchBox},
    data() {
      return {
        searchInProgress: true,
      }
    },
    computed:{
      ...mapState('global', {
        sellAdvertisements: 'sellSearchResult',
        buyAdvertisements: 'buySearchResult'
      }),
    },
    async mounted(){
      this.searchInProgress = true;
      await this.homeSearch({});
      this.searchInProgress = false;
    },
    methods: {
        ...mapActions('global', ['homeSearch']),
      onSearchButtonClick(query){
        this.$router.push({name: 'search', query})
      }
    }
  }

</script>

<style>
  .cc-token-avatar{width: 30px; height: 30px}
</style>
