import randomStr from '../utils/randomStr';

export const namespaced = true;

export const state = () => ({
  notifications: [],
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
}
