<template>
  <header class="app-header navbar">
<!--    <LoginModal ref="loginModal"/>-->
    <EmailLoginModal ref="loginModal"/>
    <button class="navbar-toggler sidebar-toggler d-lg-none mr-auto h-100" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
      <span class="navbar-toggler-icon"></span>
    </button>
    <BaseLink class="navbar-brand" style="height: auto" :to="{path: '/'}">
      <img class="navbar-brand-full" src="/imgs/logo-small.png" width="89" height="25" alt="CoreUI Logo">
      <img class="navbar-brand-minimized" src="/imgs/logo-no-text.png" width="30" height="30" alt="CoreUI Logo">
    </BaseLink>
    <ul class="nav navbar-nav d-md-down-none">
      <li class="nav-item px-3">
        <BaseLink _class="nav-link" :to="{name: 'search'}">{{$t('topHeader.search')}}</BaseLink>
      </li>
      <li class="nav-item px-3">
        <BaseLink _class="nav-link" :loginProtect="true" :to="{name: 'offer-new'}">{{$t('topHeader.postATrade')}}</BaseLink>
      </li>
      <li class="nav-item px-3">
        <BaseLink _class="nav-link px-3" :loginProtect="true" :to="{name: 'wallet'}">{{$t('topHeader.deposit')}}</BaseLink>
      </li>
      <li class="nav-item px-3">
        <a class="nav-link" target="_blank" href="https://docs.google.com/document/d/1lO7LQ1W7gL_srVp-rpUQdAMAvWew3ZSPvCTuuRP00U0/edit#heading=h.6j9iv1dzd39h">{{$t('topHeader.help')}}</a>
      </li>
    </ul>
    <ul class="nav navbar-nav ml-auto">
      <li v-if="!loggedIn" class="nav-item px-3">
        <a class="nav-link" href="#"  @click="openLoginModal($event)">
          {{$t('topHeader.login')}}
        </a>
      </li>
      <li v-if="loggedIn" class="nav-item d-md-down-none px-3">
        <BaseLink _class="nav-link px-3" :to="{name: 'wallet'}">{{$t('topHeader.wallet')}}</BaseLink>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="icon-bell"></i>
          <span v-if="unseanNotificationCount > 0" class="badge badge-pill badge-danger">{{unseanNotificationCount}}</span>
        </a>
        <NotificationDropDownMenu />
      </li>
      <li v-if="loggedIn" class="nav-item d-md-down-none px-3">
        <BaseLink class="nav-link" :to="{path: '/profile'}">
          {{fullName}}
        </BaseLink>
      </li>
      <li v-if="loggedIn" class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
          <div style="width: 3em; height: 3em">
            <div class="avatar-bg" :style="{background: 'url(' + (user.avatar || '/imgs/profile-empty.jpg') + ')'}">&nbsp;</div>
          </div>
          <!--<img class="img-avatar" :src="user.avatar" alt="admin@bootstrapmaster.com">-->
        </a>
        <ProfileDropDownMenu />
      </li>
      <LanguageSwitch />
    </ul>
    <div  class="navbar-collapse collapse" id="navbarSupportedContent">
      <ul class="nav navbar-nav nav-v d-lg-none">
        <li class="nav-item">
          <a class="nav-link px-3" href="/search">{{$t('topHeader.search')}}</a>
        </li>
        <li class="nav-item">
          <BaseLink _class="nav-link px-3" :loginProtect="true" :to="{name: 'offer-new'}">{{$t('topHeader.postATrade')}}</BaseLink>
        </li>
        <li class="nav-item">
          <BaseLink _class="nav-link px-3" :loginProtect="true" :to="{name: 'wallet'}">{{$t('topHeader.deposit')}}</BaseLink>
        </li>
<!--        <li class="nav-item">-->
<!--          <a class="nav-link px-3" target="_blank" href="https://docs.google.com/document/d/1lO7LQ1W7gL_srVp-rpUQdAMAvWew3ZSPvCTuuRP00U0/edit#heading=h.6j9iv1dzd39h">{{$t('topHeader.help')}}</a>-->
<!--        </li>-->
      </ul>
    </div>
  </header>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';
  import ProfileDropDownMenu from './ProfileDropDownMenu';
  import LanguageSwitch from '../../components/LanguageSwitch';
  import NotificationDropDownMenu from '../../components/NotificationDropDownMenu';
  import LoginModal from '../../components/loginModal.vue';
  import EmailLoginModal from '../../components/EmailLoginModal.vue';
  import BaseLink from "../../components/global/BaseLink";
  export default {
    head () {
      return {
        titleTemplate: this.unseanNotificationCount> 0 ? `(${this.unseanNotificationCount}) %s` : `%s`
      }
    },
    components: {BaseLink, LoginModal, EmailLoginModal, ProfileDropDownMenu, NotificationDropDownMenu, LanguageSwitch},
    data(){
      return{
      };
    },
    computed: {
        ...mapState('auth',['loggedIn','user']),
        ...mapGetters('notifications',['notifications', 'unseanNotificationCount']),
      notificationCount: function(){
          return Object.keys(this.notifications).length;
      },
      fullName: function(){
          return (this.user.firstName + ' ' + this.user.lastName).trim();
      }
    },
    methods: {
      openLoginModal(event) {
        this.$refs.loginModal.show(event);
      },
      logout(){
        this.$refs.loginModal.logout();
      }
    }
  }
</script>

<style>
</style>
