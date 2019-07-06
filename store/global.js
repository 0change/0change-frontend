export const namespaced = true;

export const state = () => ({
  // List of all tokens available for sell/buy
  cryptoTokens: [],
  // list of all currencies available
  allCurrencies: [],
  allCountries: [],
  allPaymentMethods: [],
  // offer that user registered for sell or buy
  userAdvertisements: [],
  sellSearchResult: [],
  buySearchResult: [],
  userTransactions:[],
  userBalance: {}
});

export const getters = {
  balance(state) {
    return state.userBalance;
  },
  transactions(state) {
    return state.userTransactions;
  },
  cryptoTokens(state) {
    return state.cryptoTokens;
  },
  currencies(state) {
    return state.allCurrencies;
  },
  countries(state) {
    return state.allCountries;
  },
  allPaymentMethods(state) {
    return state.allPaymentMethods;
  },
  userAdvertisementList(state) {
    return state.userAdvertisements;
  }
}

export const mutations = {
  setUserBalanceAndTransactions(state, {transactions, balance}){
    state.userTransactions = transactions;
    state.userBalance = balance
  },
  setCryptoTokens(state, tokens) {
    state.cryptoTokens = tokens;
  },
  setCurrencies(state, currencies) {
    state.allCurrencies = currencies;
  },
  setCountries(state, countries) {
    state.allCountries = countries;
  },
  setPaymentMethodList(state, allPaymentMethods) {
    state.allPaymentMethods = allPaymentMethods;
  },
  setUserAdvertisementList(state, userAdvertisements) {
    state.userAdvertisements = userAdvertisements;
  },
  setSearchResult(state, {sellResults, buyResults}) {
    state.sellSearchResult = sellResults;
    state.buySearchResult = buyResults;
  },
  setAdvertisementEnable(state, {_id, enable}){
    let index = state.userAdvertisements.findIndex(adv => adv._id === _id);
    if(index >= 0){
      state.userAdvertisements[index].enable = enable;
    }
  },
  deleteAdvertisement(state, _id){
    let index = state.userAdvertisements.findIndex(adv => adv._id === _id);
    if(index >= 0){
      state.userAdvertisements.splice(index, 1);
    }
  }
}

export const actions = {
  loadUserBalance({dispatch, commit, state, rootState}) {
    return this.$axios.post(`/api/v0.1/user/transactions`)
      .then(({data}) => {
        if(data.success) {
          commit('setUserBalanceAndTransactions', data);
          return {transactions: data.transactions, balance: data.balance};
        }else {
          return {transactions: [], balance: {}}
        }
      })
  },
  loadCryptoTokens({dispatch, commit, state, rootState}) {
    return this.$axios.get('/api/v0.1/resource/tokens')
        .then(({data}) => {
          if (data.success) {
            commit('setCryptoTokens', data.tokens);
            return data.tokens;
          } else {
            return [];
          }
        }).catch(err => {
        })
  },
  loadCurrencies({dispatch, commit, state, rootState}) {
    return this.$axios.get('/api/v0.1/resource/currencies')
        .then(({data}) => {
          if (data.success) {
            commit('setCurrencies', data.currencies);
            return data.currencies;
          } else {
            return [];
          }
        }).catch(err => {
        })
  },
  loadCountries({dispatch, commit, state, rootState}) {
    return this.$axios.get('/api/v0.1/resource/countries')
        .then(({data}) => {
          if (data.success) {
            commit('setCountries', data.countries);
            return data.countries;
          } else {
            return [];
          }
        }).catch(err => {
        })
  },
  loadPaymentMethods({dispatch, commit, state, rootState}) {
    return this.$axios.get('/api/v0.1/resource/payment-methods')
        .then(({data}) => {
          if (data.success) {
            commit('setPaymentMethodList', data.allPaymentMethods);
            return data.allPaymentMethods;
          } else {
            return [];
          }
        }).catch(err => {
        })
  },
  loadUserAdvertisementList({dispatch, commit, state, rootState}) {
    console.log('loading user offer list ...');
    return this.$axios.get('/api/v0.1/offer/list')
        .then(({data}) => {
          console.log('loadUserAdvertisementList', data);
          if (data.success) {
            commit('setUserAdvertisementList', data.advertisements);
            return data.advertisements;
          } else {
            return [];
          }
        }).catch(err => {
        })
  },
  registerNewAdvertisement({dispatch, commit, state, rootState}, advertisement) {
    return this.$axios.post('/api/v0.1/offer/publish', {advertisement})
        .then(({data}) => {
          // alert(JSON.stringify(data, null, 2));
          return data;
        }).catch(err => {
          return err.response.data;
        })
  },
  editAdvertisement({dispatch, commit, state, rootState}, {id, advertisement}) {
    return this.$axios.post('/api/v0.1/offer/edit', {id, advertisement})
        .then(({data}) => {
          // alert(JSON.stringify(data, null, 2));
          return data;
        }).catch(err => {
          return err.response.data;
        })
  },
  homeSearch({dispatch, commit, state, rootState}, filters) {
    let sellAdvs = [], buyAdvs = [];
    return Promise.all([
      this.$axios.post('/api/v0.1/trade/search', {filters: {type: 'sell', ...filters},skip: 0, limit: 20})
        .then(({data}) => data),
      this.$axios.post('/api/v0.1/trade/search', {filters: {type: 'buy', ...filters},skip: 0, limit: 20})
        .then(({data}) => data)
    ])
      .then(results => {
          commit('setSearchResult', {
            sellResults: results[0].success ? results[0].advertisements : [],
            buyResults: results[1].success ? results[1].advertisements : []
          });
      })
      .catch(console.error)
  },
  search({dispatch, commit, state, rootState}, filters) {
    return this.$axios.post('/api/v0.1/trade/search', {filters})
        .then(({data}) => {
          return data;
        }).catch(err => {
          return err.response.data;
        })
  },
  createTrade({dispatch, commit, state, rootState}, {advertisementId, count, message}) {
    return this.$axios.post('/api/v0.1/trade/create', {advertisementId, count, message})
        .then(({data}) => {
          return data;
        }).catch(err => {
          if(err.response && err.response.data)
            return err.response.data;
          return err;
        })
  },
  sendTradeMessage({dispatch, commit, state, rootState}, {tradeId,message}) {
    return this.$axios.post('/api/v0.1/trade/message', {tradeId, message})
        .then(({data}) => {
          return data;
        }).catch(err => {
          if(err.response && err.response.data)
            return err.response.data;
          return err;
        })
  },
  startTrade({dispatch, commit, state, rootState}, tradeId) {
    return this.$axios.post('/api/v0.1/trade/start', {id:tradeId})
        .then(({data}) => {
          return data;
        }).catch(err => {
          if(err.response && err.response.data)
            return err.response.data;
          return err;
        })
  },
  setTradePaid({dispatch, commit, state, rootState}, tradeId) {
    return this.$axios.post('/api/v0.1/trade/set-paid', {id:tradeId})
        .then(({data}) => {
          return data;
        }).catch(err => {
          if(err.response && err.response.data)
            return err.response.data;
          return err;
        })
  },
  releaseTrade({dispatch, commit, state, rootState}, tradeId) {
    return this.$axios.post('/api/v0.1/trade/release', {id:tradeId})
        .then(({data}) => {
          return data;
        }).catch(err => {
          if(err.response && err.response.data)
            return err.response.data;
          return err;
        })
  },
  fakeDeposit({dispatch, commit, state, rootState}, {token, amount}) {
    return this.$axios.post('/api/v0.1/user/fake-deposit', {token, amount})
        .then(({data}) => {
          return data
        }).catch(err => {
          if(err.response && err.response.data)
            return err.response.data;
          return err;
        })
  },
  withdraw({dispatch, commit, state, rootState}, {token, amount, to}) {
    return this.$axios.post('/api/v0.1/user/withdraw', {token, amount, to})
        .then(({data}) => {
          return data
        }).catch(err => {
          if(err.response && err.response.data)
            return err.response.data;
          return err;
        })
  },
}
