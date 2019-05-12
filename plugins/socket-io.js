let socketUrl = process.env._AXIOS_BASE_URL_;
function convertJson(str) {
  let json = {empty: true};
  try {
    json = JSON.parse(str);
  } catch (e) {
  }
  return json;
}

let socketObject = null;
socketObject = io.connect(socketUrl);

socketObject.on('connect', function (data) {
  console.log('socket connected successfully.')
});

export default ({ app, store }, inject) => {
  socketObject.on('signals', strData => {
    let data = convertJson(strData);
    console.log(data);
  });

  function onNotificationReceive(notification){
    if(!notification.silent) {
      let audio = new Audio('/sound/plop.mp3');
      audio.play();
    }
  }

  socketObject.on('notification', strData => {
    let data = convertJson(strData);
    console.log('new notification', data);
    store.dispatch('notifications/addNotification',data);
    onNotificationReceive(data);
  });

  inject('socket', {
    io: socketObject,
    join: function (room) {
      socketObject.emit('join', room);
    },
    leave: function (room) {
      socketObject.emit('leave', room);
    },
    on: function (event, callback) {
      socketObject.on(event, data => {
        try{
          data = JSON.parse(data);
        }catch (e) {}
        callback(data);
      });
    }
  });

  if(store.state.auth.loggedIn){
    socketObject.emit('join', 'user-' + store.state.auth.user._id);
  }
}
