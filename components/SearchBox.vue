<template>
  <TabBox ref="searchTab" :tabs="['']">
    <div class="row">
      <div class="col-md-3">
        <input v-model="searchParams.amount" type="text" class="form-control" :placeholder="$t('searchBox.amount')">
      </div>
      <div class="col-md-3">
        <select v-model="searchParams.token" class="form-control">
          <option value="">{{$t('searchBox.allTokens')}}</option>
          <option v-for="t in tokens" :value="t.code">{{t.code}} - {{t.title}}</option>
        </select>
      </div>
      <div class="col-md-3">
        <select v-model="searchParams.currency" class="form-control">
          <option value="">{{$t('searchBox.allCurrencies')}}</option>
          <option v-for="c in currencies" :value="c.code">{{c.code}} - {{c.title}}</option>
        </select>
      </div>
      <div class="col-md-3">
        <select v-model="searchParams.country" class="form-control">
          <option value="" >{{$t('searchBox.allCountries')}}</option>
          <option v-for="c in countries" :value="c.code">{{c.code}} - {{c.name}}</option>
        </select>
      </div>
    </div>
    <div class="row" style="margin-top: 1em">
      <div class="col-md-3">
        <select v-model="searchParams.brightid" class="form-control">
          <option value="" >{{$t('searchBox.allBScore')}}</option>
          <option v-for="v in [10, 20, 30, 40, 50, 60, 70, 80 ,90, 95, 98, 99, 100]" :value="v"></option>
        </select>
      </div>
      <div class="col-md-3">
        <select v-model="searchParams.feedback" class="form-control">
          <option value="" >{{$t('searchBox.allFeedbackScore')}}</option>
          <option v-for="v in [1, 2, 2.5, 3, 3.5, 4, 4.5, 5]" :value="v">{{$t('searchBox.minFeedbackScore',{v:v.toString()})}}</option>
        </select>
      </div>
      <div class="col-md-3">
        <select v-model="searchParams.paymentMethod" class="form-control">
          <option value="">{{$t('searchBox.allPaymentMethods')}}</option>
          <option v-for="method in paymentMethods" :value="method._id" :key="method._id">{{method.title}}</option>
        </select>
      </div>
      <div class="col-md-3">
        <button class="form-control btn btn-success" @click="doSearch">{{$t('searchBox.search')}}</button>
      </div>
    </div>
  </TabBox>
</template>
<script>
  import TabBox from '~/components/TabBox';
  import {mapState} from 'vuex';
  export default {
    components: {TabBox},
    data(){
      return {
        searchParams:{
          type: "",
          country: process.env.SEARCH_DEFAULT_COUNTRY || "US",
          token: "",
          currency: process.env.SEARCH_DEFAULT_CURRENCY || 'USD',
          amount: "",
          paymentMethod: "",
          brightid: "",
          feedback: ""
        },
      };
    },
    computed:{
      ...mapState('global', {
        currencies: 'allCurrencies',
        countries: 'allCountries',
        tokens: 'cryptoTokens',
        paymentMethods: 'allPaymentMethods'
      }),
    },
    methods: {
      setSearchParams: function(params){
        switch (params.type){
          case 'sell': this.$refs.searchTab.switchToTab(0); break;
          case 'buy': this.$refs.searchTab.switchToTab(1); break;
        }
        this.searchParams = {
            ...this.searchParams,
            ...params
        };
      },
      doSearch(){
        //alert(this.$refs.searchTab.getSelectedIndex());
        let tabIndex = this.$refs.searchTab.getSelectedIndex();
        let searchType = ['sell', 'buy'][tabIndex] || 'sell';
//        return alert(searchType);
        let query = {
          ... this.searchParams,
          type: searchType,
        }
//        return alert(JSON.stringify(query, null, 2));
        this.$emit('onSearch', query);
//        this.$router.push({name: 'search', query})
      }
    }
  }
</script>
