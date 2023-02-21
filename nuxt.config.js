export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Restaurants',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/axios.js", ssr: false },
    { src: "~/plugins/persistedState.client.js" },
    { src: "~/plugins/google-maps.js" }
  ],
  ssr: false,

  target: "static",
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',

    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    ['nuxt-gmaps', {
      key: 'AIzaSyAXsl7deCMhvVBsVRJHGks_RJvJ59kEAI4',
    }]
  ],
  proxy: {
    '/maps': {
      target: 'https://maps.googleapis.com/maps',
      pathRewrite: {
        '^/maps' : '/'
        }
      }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
