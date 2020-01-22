module.exports = {
  lintOnSave: false,
  configureWebpack: {
    entry: './src/renderer/main.js',
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: './src/main/main.js',
    },
  },
}
