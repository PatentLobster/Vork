// vue.config.js

module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['nedb'],
      nodeIntegration: true,
      enableRemoteModule: true,
      nativeWindowOpen: true,
      publish: ['github']
    }
  }
}