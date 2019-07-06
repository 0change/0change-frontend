// let socketUrl = "/socket.io";
let socketUrl = "/socket.io";
function convertJson(str) {
  let json = {empty: true};
  try {
    json = JSON.parse(str);
  } catch (e) {
  }
  return json;
}

let joinedRooms = [];
let socketObject = null;

function joinClientToRoom(room){
  if(joinedRooms.indexOf(room) < 0)
    joinedRooms.push(room);
  if(!socketObject)
    return;
  socketObject.emit('join', room);
}

export default ({ app, store }, inject) => {

  if(store.state.auth.loggedIn){
    joinedRooms.push('user-' + store.state.auth.user._id);
  }

  socketObject = io.connect(socketUrl, { forceNew: true });

  socketObject.on('connect', function (data) {
    console.log('socket connected successfully.');
    joinedRooms.map(room => {
      socketObject.emit('join', room);
    })
    if(app.$auth.loggedIn) {
      app.$axios.post('/api/v0.1/user/new-socket-id')
        .then(({data}) => {
          console.log('socket-id', data.socketId);
          socketObject.emit('socket-id', data.socketId);
        })
    }
  });

  socketObject.on('disconnect', function (data) {
    console.log('client disconnect');
  })

  socketObject.on('signals', strData => {
    let data = convertJson(strData);
    console.log(data);
  });

  function onNotificationReceive(notification){
    if(!notification.silent) {
      let audio = new Audio('/sound/plop.mp3');
      // When user not interacted with the web page, this line throws an error.
      // audio.play().catch(error => {});
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
      joinClientToRoom(room);
    },
    leave: function (room) {
      socketObject.emit('leave', room);
    },
    readNotification: function(notification){
      if(store.state.auth.loggedIn){
        if(notification._id)
          notification = notification._id;
        socketObject.emit('read-notification', notification.toString())
      }
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
}
