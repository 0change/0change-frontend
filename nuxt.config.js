const pkg = require('./package');
const proxyConfig = require('./nuxt.proxy.config');


module.exports = {
  mode: 'universal',
  ssr: true,

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
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

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/global-component-loader.js',
    '~/plugins/v-viewer.js',
    '~/plugins/v-tooltip.js',
    '~/plugins/vue-clipboard.js',
    '~/plugins/custom-filters.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
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
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  toast: {
    position: 'top-center',
    duration: 3000
  },
  proxy: proxyConfig,
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
