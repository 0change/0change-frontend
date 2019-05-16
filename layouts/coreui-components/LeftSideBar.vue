<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{path: '/'}">
            <i class="nav-icon icon-speedometer"></i> Home
            <span class="badge badge-primary">NEW</span>
          </BaseLink>
        </li>
        <li class="nav-title">Theme</li>
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{name: 'profile-id'}">
            <i class="nav-icon icon-user"></i>
            <span> Profile</span>
          </BaseLink>
        </li>
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{name: 'wallet'}">
            <i class="nav-icon icon-wallet"></i>
            <span> Wallet</span>
          </BaseLink>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="nav-icon icon-bell"></i> Notifications</a>
        </li>
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{name: 'trades'}">
            <i class="nav-icon fa fa-handshake-o"></i>
            <span> Trades</span>
            <span v-if="tradeBadgeCount > 0" class="badge badge-danger">{{tradeBadgeCount}}</span>
          </BaseLink>
        </li>
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{name: 'disputes'}">
            <i class="nav-icon fa fa-balance-scale"></i>
            <span> Disputes</span>
          </BaseLink>
        </li>
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{name: 'offer'}">
            <i class="nav-icon icon-puzzle"></i>
            <span> Offers</span>
          </BaseLink>
        </li>
        <li class="nav-title">Settings</li>
        <li v-if="hasPermission('operator')" class="nav-title">Operator menu</li>
        <li v-if="hasPermission('operator')" class="nav-item nav-dropdown open">
          <a class="nav-link nav-dropdown-toggle" href="#">
            <i class="nav-icon icon-star"></i> Operator</a>
          <ul class="nav-dropdown-items">
            <li class="nav-item">
              <BaseLink class="nav-link" :to="{path: '/operator/withdrawals'}">
                <i class="nav-icon icon-star"></i> Withdrawals
                <!--<span class="badge badge-success">NEW</span>-->
              </BaseLink>
            </li>
            <li class="nav-item">
              <BaseLink class="nav-link" :to="{path: '/operator/disputes'}">
                <i class="nav-icon icon-star"></i> Disputes
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
