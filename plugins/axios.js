export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    if(config.url.indexOf('?') < 0)
      config.url += "?ts="+Date.now();
    else
      config.url += "&ts=" + Date.now();
    config.headers.common['locale'] = store.state.locales.locale;
  })
}
