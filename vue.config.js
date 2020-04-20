module.exports = {
  publicPath: process.env.CORDOVA_PLATFORM === 'electron' || process.env.CORDOVA_PLATFORM === 'android' ? '' :  process.env.NODE_ENV === 'production' ? '/clientapp/dist/' : '/',
  productionSourceMap: false,

  chainWebpack: (config) => {
    config.module.rules.delete('eslint');
    config.plugins.delete('prefetch');
    // config.module.rule("js")
    //   .exclude
    //   .add('/src/server-address.js');
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'manual',
      rtlSupport: false
    },
    cordovaPath: 'src-cordova'
  },

  transpileDependencies: [
    'vuetify',
    'quasar',
  ],
};

// publicPath: process.env.NODE_ENV === 'production' ? '/clientapp/dist/' : '/',
