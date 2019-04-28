export const namespaced = true;

export const state = () => ({
  // no extra state field
  busy: false,
  loggedIn: false,
  strategy: "local",
  user: false,
  qrImage: null,
  loginId: null,
  qrImageTime: 0
});

export const getters = {
  hasAccess(state) {
    return sectionName => {
      if (!state.user || !state.user.sections)
        return false;
      return state.user.sections.includes(sectionName);
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