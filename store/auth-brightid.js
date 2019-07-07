export const namespaced = true;

export const state = () => ({
  qrImage: null,
  loginId: null,
  qrImageTime: 0
});

export const getters = {
  hasPermission(state, getters, rootState) {
    return permission => {
      if (!rootState.auth.user || !rootState.auth.user.permissions || rootState.auth.user.permissions.length === 0)
        return false;
      return rootState.auth.user.permissions.includes(permission);
    };
  }
}

export const mutations = {
  clearQrImage(state) {
    state.qrImage = null;
    state.loginId = null;
    state.qrImageTime = 0;
  },
  setQrImage(state, {qrImage, loginId, timestamp}) {
    state.qrImage = qrImage;
    state.loginId = loginId;
    state.qrImageTime = timestamp;
  },
}

export const actions = {
  generateQrCode({dispatch, commit, state, rootState}) {
    // re-generate after 30 minutes
    if(Date.now() - state.qrImageTime > 3*60*1000){
      commit('clearQrImage');
      this.$axios.get('/api/v0.1/auth/genqr')
        .then(({data}) => {
          console.log('generateQrCode', data);
          if(data.success) {
            commit('setQrImage', {
              qrImage: data.qrImage,
              loginId: data.id,
              timestamp: Date.now()
            });
          }
        })
    }
  },
  tryToLogin({dispatch, commit, state, rootState}){
    return this.$auth.loginWith('local',{data:{
        id: state.loginId
      }});
  }
}
