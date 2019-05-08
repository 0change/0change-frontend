<template>
  <div class="dropdown-menu dropdown-menu-right">
    <div class="message-container">
      <div class="message-item" v-for="notif in notifications" :key="notif.id">{{notif.message}}</div>
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
  export default {
    computed:{
      ...mapState('notifications', ['notifications'])
    },
    methods:{
      ...mapActions('notifications', ['clearNotifications']),
      clearAll(){
        // this.clearNotifications();
        let audio = new Audio('/sound/plop.mp3');
        audio.play();
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
