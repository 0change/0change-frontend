import randomStr from '../utils/randomStr';
import Vue from 'vue';

export const namespaced = true;

export const state = () => ({
  notifications: {},
  unreadMessages:{
    //[trageID]: [tradeMessageId]
  },
  operatorUnreadMessage: {
    //[trageID]: [tradeMessageId]
  },
});



export const getters = {
  notifications(state){
    let result =  Object.keys(state.notifications)
      .map(id => state.notifications[id]);
    result = JSON.parse(JSON.stringify(result));
    result.sort((a, b) => {
      // console.log(`a:${a.sortIndex} b:${b.sortIndex} compare: ${a.sortIndex > b.sortIndex}`);
      return b.sortIndex - a.sortIndex;
    });
    return result.slice(0, 10);
  },
  unseanNotificationCount(state) {
    let n = 0;
    Object.keys(state.notifications).map(id => {
      if (!state.notifications[id].seen)
        n++;
    })
    return n;
  }
}

export const mutations = {
  addNotification(state, notification){
    if(notification._id === undefined){
      notification._id = randomStr();
    }
    if(notification.createdAt)
      notification.sortIndex = (new Date(notification.createdAt)).getTime();
    else
      notification.sortIndex = Date.now();

    Vue.set(state.notifications,notification._id,notification);
  },
  readNotification(state, id){
    Vue.set(state.notifications[id], 'seen', true);
  },
  clearNotifications(state){
    //state.notifications = {};
  },
  setUnreadMessages(state, messages){
    Vue.set(state, 'unreadMessages', messages);
  },
  readTradeMessages(state, tradeId){
    state.unreadMessages[tradeId] = [];
  },
  setOperatorUnreadMessages(state, messages){
    Vue.set(state, 'operatorUnreadMessages',messages);
  }
}

export const actions = {
  addNotification({dispatch, commit, state, rootState},notification) {
      commit('addNotification', notification);
  },
  readNotification({dispatch, commit, state, rootState}, id) {
      commit('readNotification', id);
  },
  clearNotifications({dispatch, commit, state, rootState}) {
      commit('clearNotifications');
  },
  loadUnreadMessages({dispatch, commit, state, rootState}) {
    return this.$axios.post('/api/v0.1/user/unread-messages')
      .then(({data}) => {
        if(data.success){
          commit('setUnreadMessages', data.unreadMessages);
          let tradeCount = 0;
          let messageCount = 0;
          Object.keys(data.unreadMessages).map(tradeId => {
            tradeCount ++;
            Object.keys(data.unreadMessages[tradeId]).map(userId => {
              messageCount ++;
            })
          });
          // if(messageCount > 0) {
          //   dispatch('addNotification', {
          //     _id: 'total_unread_message',
          //     message: `You have ${messageCount} unread message on ${tradeCount} trade.`,
          //     data: {commands: [{type: 'trades-list'}]}
          //   });
          // }
        }
        return data;
      })
      .catch(error => {
        return {}
      })
  },
  readTradeMessages({dispatch, commit, state, rootState}, tradeId) {
    return this.$axios.post('/api/v0.1/user/read-trade-messages', {tradeId})
      .then(({data}) => {
        if(data.success){
          commit('readTradeMessages', tradeId);
        }
        return data;
      })
      .catch(error => {})
      .then(() => {})
  },
  loadOperatorUnreadMessages({dispatch, commit, state, rootState}) {
    return this.$axios.post('/api/v0.1/operator/unread-messages')
      .then(({data}) => {
        if(data.success){
          commit('setOperatorUnreadMessages', data.unreadMessages);
          let tradeCount = 0;
          let messageCount = 0;
          Object.keys(data.unreadMessages).map(tradeId => {
            tradeCount ++;
            Object.keys(data.unreadMessages[tradeId]).map(userId => {
              messageCount ++;
            })
          });
          // if(messageCount > 0) {
          //   dispatch('addNotification', {
          //       _id: 'total_dispute_unread_message',
          //       message: `You have ${messageCount} unread message on ${tradeCount} dispute.`,
          //       data: {commands: [{type: 'disputes-list'}]}
          //   });
          // }
        }
        return data;
      })
      .catch(error => {
        return {}
      })
  }

}
