<template>
  <div class="dropdown-menu dropdown-menu-right">
    <div class="dropdown-header text-center">
      <strong>Account</strong>
    </div>
    <a class="dropdown-item" href="/profile">
      <i class="fa fa-user"></i> {{$t('topHeader.profile')}}</a>
    <a class="dropdown-item" href="/wallet">
      <i class="icon-wallet icons"></i> {{$t('topHeader.wallet')}}</a>
    <!--<a class="dropdown-item" href="#">-->
      <!--<i class="fa fa-wrench"></i> Settings</a>-->
    <!--<a class="dropdown-item" href="#">-->
      <!--<i class="fa fa-bell-o"></i> Notifications-->
      <!--<span class="badge badge-danger">42</span>-->
    <!--</a>-->
    <div class="dropdown-divider"></div>
    <!--<a class="dropdown-item" href="#">-->
      <!--<i class="fa fa-shield"></i> Lock Account</a>-->
    <a class="dropdown-item" href="#" @click="$auth.logout()">
      <i class="fa fa-lock"></i> {{$t('topHeader.logout')}}</a>
  </div>
</template>
