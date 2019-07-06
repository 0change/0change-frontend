require('dotenv').config();
const pkg = require('./package');
// const proxyConfig = require('./nuxt.proxy.config');


module.exports = {
  mode: 'universal',
  ssr: true,
  server:{
    port: process.env.SITE_PORT,
    host: process.env.SITE_HOST,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.WEBSITE_BASE_TITLE || "zero change",
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script:[
      {src: "/coreui/vendors/jquery/js/jquery.min.js"},
      {src: "/back-script/socketio/socket.io.js"},
      // {src: "/coreui/vendors/popper.js/js/popper.min.js"},
      {src: "/coreui/vendors/bootstrap/js/bootstrap.min.js"},
      // {src: "/coreui/vendors/pace-progress/js/pace.min.js"},
      // {src: "/coreui/vendors/perfect-scrollbar/js/perfect-scrollbar.min.js"},
      {src: "/coreui/vendors/@coreui/coreui/js/coreui.min.js"},
      // {src: "/coreui/vendors/chart.js/js/Chart.min.js"},
      // {src: "/coreui/vendors/@coreui/coreui-plugin-chartjs-custom-tooltips/js/custom-tooltips.min.js"},
      // {src: "/coreui/js/main.js"},
    ],
    link: [

      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

      { rel: 'stylesheet' , href: '/coreui/vendors/@coreui/icons/css/coreui-icons.min.css' },
      { rel: 'stylesheet' , href: '/coreui/vendors/flag-icon-css/css/flag-icon.min.css' },
      { rel: 'stylesheet' , href: '/coreui/vendors/font-awesome/css/font-awesome.min.css' },
      { rel: 'stylesheet' , href: '/coreui/vendors/simple-line-icons/css/simple-line-icons.css' },
      // { rel: 'stylesheet' , href: '/coreui/vendors/pace-progress/css/pace.min.css' },
      { rel: 'stylesheet' , href: '/coreui/css/style.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  router:{
    middleware: 'i18n'
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/axios.js',
    '~/plugins/global-component-loader.js',
    '~/plugins/v-viewer.js',
    '~/plugins/vue-observe-visibility.js',
    '~/plugins/v-tooltip.js',
    '~/plugins/vue-clipboard.js',
    '~/plugins/custom-filters.js',
    {src: '~/plugins/socket-io.js', ssr: false}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [

    // Docs: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',

    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',

    '@nuxtjs/proxy',
    '@nuxtjs/toast',

    '@nuxtjs/auth',

    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },

  /*
  ** Build configuration
  */
  build: {
    // analyze: true,

    chunks: 'all',
    automaticNameDelimiter: '.',
    extractCSS: {
      //allChunks: true
    },
    splitChunks: {
      layouts: true
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    vendor: ['vue-i18n'],
  },

  toast: {
    position: 'top-center',
    duration: 3000
  },
  proxy: {
    '/api': {
      target: process.env._AXIOS_BASE_URL_,
      //target: "http://localhost:5554",
      // changeOrigin: true,
      // pathRewrite: {'^/api': '/api'}
    },
    /**
     * This proxy only cover http & https protocol
     * You also need to add server side proxy (like nginx proxy) to cover [ws://] protocol
     * this proxy should forward frontend "/socket.io" path to backend root "/"
     */
    '/socket.io': {
      target: process.env._AXIOS_BASE_URL_,
      //target: "http://localhost:5554",
      changeOrigin: true,
      // pathRewrite: {'^/socket.io': '/'}
    },
    '/back-script':{
      target: process.env._AXIOS_BASE_URL_,
      pathRewrite: {
        '/back-script': "/scripts"
      }
    }
  },
  auth: {
    // nuxtjs-auth options
    strategies: {
      local: {
        endpoints: {
          login: {url: '/api/v0.1/auth/login', method: 'post', propertyName: 'token'},
          logout: {url: '/api/v0.1/auth/logout', method: 'post' },
          // logout: false,
          user: {url: '/api/v0.1/user/get-info', method: 'post', propertyName: 'user'}
        },
        tokenRequired: true,
        tokenType: 'bearer',
      }
    },
    redirect: {
      home: false
    }
  },
}
