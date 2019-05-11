<template>
</template>

<script>
  let socketUrl = process.env._AXIOS_BASE_URL_;
  function convertJson(str) {
    let json = {empty: true};
    try {
      json = JSON.parse(str);
    } catch (e) {
    }
    return json;
  }

  import {mapActions} from 'vuex';

  export default {
    mounted(){
      if(io) {
        let socketObject = io.connect(socketUrl);

        socketObject.on('connect', function (data) {
          console.log('socket connected successfully.')
        });

        socketObject.on('signals', strData => {
          let data = convertJson(strData);
          console.log(data);
          // if (data.type === 'notification') {
          //   this.addNotification(data.notification);
          // }
        });

        socketObject.on('notification', strData => {
          let data = convertJson(strData);
          console.log('new notification', data);
          this.addNotification(data);
          this.onNotificationReceive(data);
        });
        socketObject.emit('join', 'user-' + this.$auth.user._id);
      }
      console.log('SocketIoHandler mounted');
    },
    methods:{
      ...mapActions('notifications', ['addNotification','clearNotification']),
      onNotificationReceive(notification){
        if(!notification.silent) {
          let audio = new Audio('/sound/plop.mp3');
          audio.play();
        }
      }
    }
  }
</script>
