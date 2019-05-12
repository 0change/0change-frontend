<template>
  <div class="app header-fixed">
    <no-ssr>
      <SocketIoHandler />
    </no-ssr>
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
  import SocketIoHandler from '../components/SocketIoHandler';
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
    components: {HeaderNoSideMenu, Footer, LeftSideBar, RightSideBar, TopStatusBar, SocketIoHandler},
    async mounted(){
      let ct = await this.loadCryptoTokens();
      let cc = await this.loadCurrencies();
      let cn = await this.loadCountries();
      let cpml = await this.loadPaymentMethods();
      let urm = await this.loadUnreadMessages();
    },
    methods: {
        ... mapActions('global',['loadCryptoTokens','loadCurrencies','loadCountries']),
      ... mapActions('notifications',['loadUnreadMessages']),
    }
  }
</script>


<style lang="scss">
  @import '../design/global-styles.scss';
  @import '../design/ui-components.scss';
</style>
