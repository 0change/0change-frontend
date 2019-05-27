<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{path: '/'}">
            <i class="nav-icon icon-speedometer"></i> {{$t('leftSideBar.home')}}
            <span class="badge badge-primary">{{$t('leftSideBar.new')}}</span>
          </BaseLink>
        </li>
        <li class="nav-title">{{$t('leftSideBar.userMenus')}}</li>
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{name: 'profile-id'}">
            <i class="nav-icon icon-user"></i>
            <span> {{$t('leftSideBar.profile')}}</span>
          </BaseLink>
        </li>
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{name: 'wallet'}">
            <i class="nav-icon icon-wallet"></i>
            <span> {{$t('leftSideBar.wallet')}}</span>
          </BaseLink>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="nav-icon icon-bell"></i> {{$t('leftSideBar.notifications')}}</a>
        </li>
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{name: 'trades'}">
            <i class="nav-icon fa fa-handshake-o"></i>
            <span> {{$t('leftSideBar.trades')}}</span>
            <span v-if="tradeBadgeCount > 0" class="badge badge-danger">{{tradeBadgeCount}}</span>
          </BaseLink>
        </li>
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{name: 'disputes'}">
            <i class="nav-icon fa fa-balance-scale"></i>
            <span> {{$t('leftSideBar.disputes')}}</span>
          </BaseLink>
        </li>
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{name: 'offer'}">
            <i class="nav-icon icon-puzzle"></i>
            <span> {{$t('leftSideBar.offers')}}</span>
          </BaseLink>
        </li>
        <li class="nav-title">{{$t('leftSideBar.settings')}}</li>
        <li v-if="hasPermission('operator')" class="nav-title">{{$t('leftSideBar.adminMenuTitle')}}</li>
        <li v-if="hasPermission('operator')" class="nav-item nav-dropdown open">
          <a class="nav-link nav-dropdown-toggle" href="#">
            <i class="nav-icon icon-star"></i> {{$t('leftSideBar.opMenu')}}</a>
          <ul class="nav-dropdown-items">
            <li class="nav-item">
              <BaseLink class="nav-link" :to="{path: '/operator/withdraw-wallet'}">
                <i class="nav-icon icon-star"></i> {{$t('leftSideBar.opWithdrawWallet')}}
                <!--<span class="badge badge-success">NEW</span>-->
              </BaseLink>
            </li>
            <li class="nav-item">
              <BaseLink class="nav-link" :to="{path: '/operator/withdrawals'}">
                <i class="nav-icon icon-star"></i> {{$t('leftSideBar.opWithdrawals')}}
                <!--<span class="badge badge-success">NEW</span>-->
              </BaseLink>
            </li>
            <li class="nav-item">
              <BaseLink class="nav-link" :to="{path: '/operator/disputes'}">
                <i class="nav-icon icon-star"></i> {{$t('leftSideBar.opDisputes')}}
                <span v-if="operatorDisputeBadgeCount > 0" class="badge badge-danger">{{operatorDisputeBadgeCount}}</span>
              </BaseLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <button class="sidebar-minimizer brand-minimizer" type="button"></button>
  </div>
</template>
<script>
  import BaseLink from "../../components/global/BaseLink";
  import {mapState, mapGetters} from 'vuex';
  export default {
    components: {BaseLink},
    computed:{
      ...mapState('notifications', ['unreadMessages','operatorUnreadMessages']),
      ...mapGetters('auth', ['hasPermission']),
      tradeBadgeCount: function () {
        if(!this.unreadMessages)
          return 0;
        return Object.keys(this.unreadMessages)
          .map(tradeId => this.unreadMessages[tradeId])
          .filter(item => item.length > 0)
          .length;
      },
      operatorDisputeBadgeCount: function () {
        if(!this.operatorUnreadMessages)
          return 0;
        return Object.keys(this.operatorUnreadMessages)
          .map(tradeId => this.operatorUnreadMessages[tradeId])
          .filter(item => item.length > 0)
          .length;
      }
    }
  }
</script>
