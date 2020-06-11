// vue.config.js

module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['nedb'],
      nodeIntegration: true,
      enableRemoteModule: true,
      width: 650,
      height: 650
    }
  }
}