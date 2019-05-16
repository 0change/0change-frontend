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

export const mutations = {
  addNotification(state, {id, notification}){
    if(id === undefined)
      id = randomStr();
    Vue.set(state.notifications,id,notification);
  },
  readNotification(state, id){
    delete state.notifications[id];
  },
  clearNotifications(state){
    state.notifications = {};
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
  addNotification({dispatch, commit, state, rootState},payload) {
      commit('addNotification', payload);
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
          if(messageCount > 0) {
            dispatch('addNotification', {
              id: 'total_unread_message',
              notification: {
                message: `You have ${messageCount} unread message on ${tradeCount} trade.`,
                commands: [{type: 'trades-list'}]
              }
            });
          }
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
          if(messageCount > 0) {
            dispatch('addNotification', {
              id: 'total_dispute_unread_message',
              notification: {
                message: `You have ${messageCount} unread message on ${tradeCount} dispute.`,
                commands: [{type: 'disputes-list'}]
              }
            });
          }
        }
        return data;
      })
      .catch(error => {
        return {}
      })
  }

}
