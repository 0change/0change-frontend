let socketUrl = process.env._SOCKET_IO_URL_;
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
  });

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
    store.dispatch('notifications/addNotification',{notification:data});
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
