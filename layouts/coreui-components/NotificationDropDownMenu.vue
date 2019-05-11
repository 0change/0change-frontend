<template>
  <div class="dropdown-menu dropdown-menu-right">
    <div class="message-container">
      <div class="message-item" v-for="item in notifications" :key="item.id">
        <BaseLink v-if="hasLinkToOtherPage(item)" :to="linkToOtherPage(item)">
          <span>{{item.notification.message}}</span>
        </BaseLink>
        <span v-else>{{item.notification.message}}</span>
      </div>
    </div>
    <div class="dropdown-divider"></div>
    <!--<a class="dropdown-item" href="#">-->
      <!--<i class="fa fa-shield"></i> Lock Account</a>-->
    <a class="dropdown-item" href="#" @click="clearAll">
      <i class="fa fa-lock"></i> Clear All</a>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import BaseLink from "../../components/global/BaseLink";
  export default {
    components: {BaseLink},
    computed:{
      ...mapState('notifications', ['notifications'])
    },
    methods:{
      ...mapActions('notifications', ['clearNotifications']),
      clearAll(){
        this.clearNotifications();
      },
      hasLinkToOtherPage(notification){
        return false;
      },
      linkToOtherPage(notification){
        return {name: "", params: {}}
      }
    }
  }
</script>

<style scoped>
  .message-container{
    padding: 0.5em
  }
  .message-item{
    font-size: 0.8em;
    color: #666;
  }

  .message-item:not(:last-child){
    border-bottom: 1px solid #eee;
  }
</style>
