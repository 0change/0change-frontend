<style scoped>
  .has-link{
    cursor: pointer;
    color: blue;
  }
  .notif-unseen{
    font-weight: bold;
  }
  .notif-seen{
    color: #999 !important;
  }
</style>

<template>
  <div
    v-observe-visibility="{callback:visibilityChanged, once: notification.seen==true, intersection: {threshold: 0.3}}"
    :class="{'notif-unseen': !notification.seen, 'notif-seen': notification.seen}"
  >
    <!--<BaseLink v-if="hasLinkToNextPage(notification)" :to="linkToNextPage(notification)">-->
      <!--<span>{{notification.message}}</span>-->
    <!--</BaseLink>-->
    <!--<span v-else>{{notification.message}}</span>-->
    <span
      @click="onClick"
      :class="{'has-link': hasLinkToNextPage}"
    >{{notification.message}}</span>
    <!--<div>{{notification.seen ? 'seen' : 'unseen'}}</div>-->
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  export default {
    props:['notification'],
    data(){
      return {
      }
    },
    computed:{
      hasLinkToNextPage() {
        let {notification} = this;
        return (notification
          && notification.data
          && notification.data.commands
          && notification.data.commands.length > 0
          && (
            notification.data.commands[0].type === 'trade-open'
            || notification.data.commands[0].type === 'trades-list'
            || notification.data.commands[0].type === 'disputes-list'
          ));
      },
      linkToNextPage() {
        let {notification} = this;
        if (notification.data.commands[0].type === 'trade-open')
          return {name: "trade-id", params: {id: notification.data.commands[0].params.id}}
        if (notification.data.commands[0].type === 'trades-list')
          return {name: "trades"}
        if (notification.data.commands[0].type === 'disputes-list')
          return {name: "operator-disputes"}
        else
          return null;
      }
    },
    methods: {
      ...mapActions('notifications', ['readNotification']),
      onClick(){
        if(this.hasLinkToNextPage){
          this.callReadNotification();
          if(this.readTimeout) {
            clearTimeout(this.readTimeout);
            this.readTimeout = undefined;
          }
          this.$router.push(this.linkToNextPage)
        }
      },
      callReadNotification(){
        this.readNotification(this.notification._id);
        this.$socket.readNotification(this.notification._id);
      },
      visibilityChanged(isVisible){
        if(isVisible){
          if(!this.notification.seen){
            this.readTimeout = setTimeout(() => {
              this.callReadNotification();
              this.readTimeout = undefined;
            }, 3000);
          }
        }else{
          if(this.readTimeout) {
            clearTimeout(this.readTimeout);
            this.readTimeout = undefined;
          }
        }
      }
    }
  }
</script>
