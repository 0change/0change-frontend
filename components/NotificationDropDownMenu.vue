<template>
  <div class="dropdown-menu dropdown-menu-right">
    <div class="message-container">
      <NotificationItem
        class="message-item"
        v-for="item in notifications"
        :notification="item"
        :key="item._id"
      />
      <!--<div class="message-item" v-for="(item, nID) in notifications" :key="nID">-->
        <!--<BaseLink v-if="hasLinkToNextPage(item)" :to="linkToNextPage(item)">-->
          <!--<span>{{item.message}}</span>-->
        <!--</BaseLink>-->
        <!--<span v-else>{{item.message}}</span>-->
      <!--</div>-->
    </div>
    <div class="dropdown-divider"></div>
    <!--<a class="dropdown-item" href="#">-->
    <!--<i class="fa fa-shield"></i> Lock Account</a>-->
    <a class="dropdown-item font-sm" href="#" @click="clearAll">
      <i class="fa fa-lock"></i> See All</a>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import NotificationItem from "./NotificationItem";

  export default {
    components: {NotificationItem},
    computed: {
      ...mapGetters('notifications', ['notifications'])
    },
    methods: {
      ...mapActions('notifications', ['clearNotifications']),
      clearAll() {
        //this.clearNotifications();
      }
    }
  }
</script>

<style scoped>
  .message-container {
    padding: 0.5em;
    min-height: 8em;
  }

  .message-item {
    font-size: 0.8em;
    color: #666;
  }

  .message-item:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
</style>
