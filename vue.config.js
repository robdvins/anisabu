module.exports = {
  lintOnSave: false,
  configureWebpack: {
    entry: './src/renderer/main.js',
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: './src/main/main.js',
      builderOptions: {
        appId: 'com.hanzuk.anisabu',
        win: {
          target: 'zip',
          icon: 'dist_electron/icons/win/icon.ico',
          publish: ['github'],
        },
      },
    },
  },
}
