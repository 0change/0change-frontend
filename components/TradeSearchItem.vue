<template>
  <tr v-if="advertisement">
    <td class="text-left">
      <div class="avatar">
        <!--<img class="img-avatar" :src="advertisement.user.avatar" alt="admin@bootstrapmaster.com">-->
        <div class="avatar-bg" :style="{background: 'url(' + advertisement.user.avatar+ ')'}">&nbsp;</div>
        <span class="avatar-status" :class="userAvatarStatusClass(advertisement.user)"></span>
      </div>
    </td>
    <td>
      <div>
        <BaseLink :to="{name: 'profile-id', params:{id: advertisement.user._id}}">
          {{fullName(advertisement.user)}}
        </BaseLink>
      </div>
      <div class="small text-muted">
        <!--<span>{{userAge(offer.user)}}</span> | Registered: {{registerDate(offer.user)}}-->
        <img src="/imgs/brightid-av-1.jpg" style="width: 10px"/>
        <strong>{{advertisement.user.brightIdScore}} | </strong>
        <img src="/imgs/star.jpg" alt="" style="width: 10px" />
        <strong>{{advertisement.user.score}} | {{advertisement.user.confirmedTrades}}</strong>
      </div>
    </td>
    <td class="text-left">
      <i class="flag-icon h4 mb-0" :class="['flag-icon-' + advertisement.user.country.toLowerCase()]" id="us" title="us"></i>
    </td>
    <!--<td>-->
      <!--<div class="clearfix">-->
        <!--<div class="float-left">-->
          <!--<strong>{{offer.user.score}}%</strong>-->
        <!--</div>-->
        <!--<div class="float-right">-->
          <!--<small class="text-muted">3 Star</small>-->
        <!--</div>-->
      <!--</div>-->
      <!--<LinearProgress v-model="offer.user.score" :status="userStatus(offer.user)" />-->
    <!--</td>-->
    <td class="text-left">
      <img class="cc-token-avatar" :src="'/erc20-tokens/' + advertisement.token.code + '.png'">
      <span>{{advertisement.token.title}}</span>
    </td>
    <td class="text-success text-left">
      <div><strong>{{advertisement.amount}}</strong></div>
      <strong>{{advertisement.currency.code}}</strong>
    </td>
    <td class="text-left">
      <div>{{$t('searchResult.max')}}: <span class="text-success">{{advertisement.limitMax}}</span></div>
      <div>{{$t('searchResult.min')}}: <span class="text-danger">{{advertisement.limitMin}}</span></div>
    </td>
    <td>
      <div class="small text-muted">{{$t('searchResult.lastSeen')}}</div>
      <strong :dir="pageDirection">{{lastSeen}}</strong>
    </td>
    <td>
      <BaseLink :to="{name:'offer-view-id', params:{id: advertisement._id}}">
        <button class="btn btn-block btn-outline-primary" type="button">{{advertisement.type == 'sell' ? $t('searchResult.buy') : $t('searchResult.sell')}}</button>
      </BaseLink>
    </td>
  </tr>
  <tr v-else>
    <td class="text-left">
        <div class="circle animated-background">&nbsp;</div>
    </td>
    <td>
      <div class="loading-placeholder animated-background">&nbsp;</div>
      <div class="loading-placeholder animated-background">&nbsp;</div>
    </td>
    <td>
      <div class="loading-placeholder animated-background">&nbsp;</div>
      <div class="loading-placeholder animated-background">&nbsp;</div>
    </td>
    <td>
      <div class="loading-placeholder animated-background">&nbsp;</div>
      <div class="loading-placeholder animated-background">&nbsp;</div>
    </td>
    <td>
      <div class="loading-placeholder animated-background">&nbsp;</div>
      <div class="loading-placeholder animated-background">&nbsp;</div>
    </td>
    <td>
      <div class="loading-placeholder animated-background">&nbsp;</div>
      <div class="loading-placeholder animated-background">&nbsp;</div>
    </td>
    <td>
      <div class="loading-placeholder animated-background">&nbsp;</div>
      <div class="loading-placeholder animated-background">&nbsp;</div>
    </td>
    <td></td>
  </tr>
</template>

<script>
  import {mapGetters} from 'vuex';
  import LinearProgress from '~/components/LinearProgress';
  import BaseLink from "./global/BaseLink";
  export default {
    components: {BaseLink, LinearProgress},
    props: ['advertisement'],
    computed:{
      ...mapGetters('locales', ['pageDirection']),
      lastSeen: function () {
        return this.advertisement.user.lastSeenInfo.title;
      }
    },
    methods:{
      userLastVisitMinutes(user){
        return user.lastSeenInfo.minutes;
      },
      userAvatarStatusClass(user){
        let lastSeenMinutes = this.userLastVisitMinutes(user);
        if(lastSeenMinutes < 5)
          return ['badge-success'];
        else if(lastSeenMinutes < 30)
          return ['badge-warning'];
        else
          return ['badge-secondary'];
      },
      fullName: function (user) {
        return (user.firstName + ' ' + user.lastName).trim() || user._id;
      },
      userAge: function (user) {
        return 'New';
      },
      registerDate: function (user) {
        return 'Jan 1, 2015';
      },
      userStatus: function (user) {
        if(user.score === 100) return 'success';
        if(user.score > 90) return 'info';
        if(user.score > 70) return 'warning';
        return 'danger';
      }
    },
  }
</script>

<style lang="SCSS" scoped>
  .loading-placeholder{
    height: 1em;
    margin: 4px 0;
  }
  .circle{
    width: 3em;
    height: 3em;
    display: block;
    border-radius: 50%;
  }
  @keyframes placeHolderShimmer{
    0%{
      background-position: -468px 0
    }
    100%{
      background-position: 468px 0
    }
  }
  .animated-background {
    animation-duration: 2s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;
    position: relative;
  }
</style>
