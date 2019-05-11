<template>
  <tr>
    <td class="text-left">
      <div class="avatar">
        <img class="img-avatar" :src="advertisement.user.avatar" alt="admin@bootstrapmaster.com">
        <span class="avatar-status" :class="userAvatarStatusClass(advertisement.user)"></span>
      </div>
    </td>
    <td>
      <div>{{fullName(advertisement.user)}}</div>
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
    <td>
      <div class="small text-muted">Last login</div>
      <strong>{{lastSeen}}</strong>
    </td>
    <td>
      <BaseLink :to="{name:'offer-view-id', params:{id: advertisement._id}}">
        <button class="btn btn-block btn-outline-primary" type="button">{{advertisement.type == 'sell' ? 'Buy' : 'Sell'}}</button>
      </BaseLink>
    </td>
  </tr>
</template>

<script>
  import moment from 'moment';
  import LinearProgress from '~/components/LinearProgress';
  export default {
    components: {LinearProgress},
    props: ['advertisement'],
    computed:{
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
        else if(lastSeenMinutes < 6)
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

<style>
</style>
