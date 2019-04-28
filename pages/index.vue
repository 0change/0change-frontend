<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <SearchBox @onSearch="onSearchButtonClick"/>
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
          <TradeSearchItem
              v-for="advertisement in sellAdvertisements"
              :key="advertisement._id"
              :advertisement="advertisement"
              buttonTitle="Buy"
          />
          </tbody>
        </table>
        <div class="text-right">
          <BaseLink :to="{name: 'quickBuy'}">
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
        searchInRefresh: false,
        sellers: [
          {
            name: "Yiorgos Avraamu",
            avatar: '/coreui/img/avatars/1.jpg',
            status: 'success',
            age: 'New',
            registered: 'Jan 1, 2015',
            country: 'us',
            score: 50,
            token: {
              icon: '/erc20-tokens/dai_stablecoin.png',
              code: 'DAI',
              title: 'Dai Stable Coin (DAI)',
              price: '1.05',
              currency: 'USD'
            },
            lastActivity: '10 sec ago'
          },
          {
            name: "Avram Tarasios",
            avatar: '/coreui/img/avatars/2.jpg',
            status: 'danger',
            age: 'Recurring',
            registered: 'Jan 1, 2015',
            country: 'br',
            score: 10,
            token: {
              icon: '/erc20-tokens/dai_stablecoin.png',
              title: 'Dai Stable Coin (DAI)',
              code: 'DAI',
              price: '1.05',
              currency: 'USD'
            },
            lastActivity: '5 minutes ago'
          },
          {
            name: "Quintin Ed",
            avatar: '/coreui/img/avatars/3.jpg',
            status: 'warning',
            age: 'New',
            registered: 'Jan 1, 2015',
            country: 'in',
            score: 74,
            token: {
              icon: '/erc20-tokens/dai_stablecoin.png',
              title: 'Dai Stable Coin (DAI)',
              code: 'DAI',
              price: '1.05',
              currency: 'USD'
            },
            lastActivity: '1 hour ago'
          },
          {
            name: "Enéas Kwadwo",
            avatar: '/coreui/img/avatars/4.jpg',
            status: 'info',
            age: 'New',
            registered: 'Jan 1, 2015',
            country: 'fr',
            score: 98,
            token: {
              icon: '/erc20-tokens/dai_stablecoin.png',
              title: 'Dai Stable Coin (DAI)',
              code: 'DAI',
              price: '1.05',
              currency: 'USD'
            },
            lastActivity: 'Last month'
          },
          {
            name: "Agapetus Tadeáš",
            avatar: '/coreui/img/avatars/5.jpg',
            status: 'success',
            age: 'New',
            registered: 'Jan 1, 2015',
            country: 'es',
            score: 22,
            token: {
              icon: '/erc20-tokens/dai_stablecoin.png',
              title: 'Dai Stable Coin (DAI)',
              code: 'DAI',
              price: '1.05',
              currency: 'USD'
            },
            lastActivity: 'Last week'
          },
          {
            name: "Friderik Dávid",
            avatar: '/coreui/img/avatars/6.jpg',
            status: 'danger',
            age: 'New',
            registered: 'Jan 1, 2015',
            country: 'pl',
            score: 43,
            token: {
              icon: '/erc20-tokens/dai_stablecoin.png',
              title: 'Dai Stable Coin (DAI)',
              code: 'DAI',
              price: '1.05',
              currency: 'USD'
            },
            lastActivity: 'Yesterday'
          },
        ]
      }
    },
    computed:{
      ...mapState('global', {
        sellAdvertisements: 'sellSearchResult',
        buyAdvertisements: 'buySearchResult'
      }),
    },
    async mounted(){
      this.searchInRefresh = true;
      await this.homeSearch();
      this.searchInRefresh = false;
    },
    methods: {
        ...mapActions('global', ['homeSearch']),
      onSearchButtonClick(query){
        this.$router.push({name: 'search', query})
      },
    }
  }

</script>

<style>
  .cc-token-avatar{width: 30px; height: 30px}
</style>