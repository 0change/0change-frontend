export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    config.headers.common['locale'] = store.state.locales.locale;
  })
}
