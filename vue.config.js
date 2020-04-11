module.exports = {
  publicPath: '',
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
