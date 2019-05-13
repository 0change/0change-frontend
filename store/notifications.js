import randomStr from '../utils/randomStr';

export const namespaced = true;

export const state = () => ({
  notifications: [],
  unreadMessages:{
    //[trageID]: [tradeMessageId]
  }
});

export const mutations = {
  addNotification(state, notification){
    state.notifications.push({id: randomStr(), notification});
  },
  readNotification(state, id){
    let index = state.notifications.findIndex(item => item.id===id);
    if(index >= 0)
      state.notifications.splice(index, 1);
  },
  clearNotifications(state){
    state.notifications = [];
  },
  setUnreadMessages(state, messages){
    state.unreadMessages = messages;
  },
  readTradeMessages(state, tradeId){
    state.unreadMessages[tradeId] = [];
  },
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
  },

}
