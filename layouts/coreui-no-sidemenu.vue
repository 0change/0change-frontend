<template>
  <div class="app header-fixed">
    <HeaderNoSideMenu />
    <div class="app-body">
      <!--<LeftSideBar />-->
      <main class="main pd10 bg-white">
        <!--<TopStatusBar />-->
        <!--<div class="container-fluid">-->
          <div class="animated fadeIn container">
            <nuxt/>
          </div>
        <!--</div>-->
      </main>
      <!--<RightSideBar />-->
    </div>
    <Footer />
  </div>
</template>

<script>

  import HeaderNoSideMenu from './coreui-components/HeaderNoSideMenu';
  import Footer from './coreui-components/Footer';
  import LeftSideBar from './coreui-components/LeftSideBar';
  import RightSideBar from './coreui-components/RightSideBar';
  import TopStatusBar from './coreui-components/TopStatusBar';

  import {mapActions} from 'vuex';

  export default {
    head: {
      bodyAttrs: {
        class: "app header-fixed"
      }
    },
    components: {HeaderNoSideMenu, Footer, LeftSideBar, RightSideBar, TopStatusBar},
    async mounted(){
      let ct = await this.loadCryptoTokens();
//      console.log('tokens: ',ct);
      let cc = await this.loadCurrencies();
//      console.log('curencies: ', cc);
      let cn = await this.loadCountries();
//      console.log('countries: ', cn);
    },
    methods: {
        ... mapActions('global',['loadCryptoTokens','loadCurrencies','loadCountries'])
    }
  }
</script>


<style lang="scss">
  @import '../design/global-styles.scss';
  @import '../design/ui-components.scss';
</style>
