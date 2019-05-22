export const state = () => ({
  locales: [
    {
      code: 'en',
      flag: 'us',
      name: 'EN',
      direction: 'ltr'
    },
    {
      code: 'fa',
      flag: 'ir',
      name: 'FA',
      direction: 'rtl'
    }

  ],
  locale: 'en'
});

export const getters = {
  pageDirection(state){
    return state.locales.find(l => l.code === state.locale).direction || 'ltr';
  }
}

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.find(el => el.code === locale)) {
      state.locale = locale
    }
  }
};

export const actions = {
  setLang({dispatch, commit, state, rootState}, lang) {
      commit('SET_LANG', lang);
  },
}
