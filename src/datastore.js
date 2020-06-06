import Datastore from 'nedb'
import path from 'path'
import { app } from 'electron'

export default new Datastore({
  filename: path.join(app.getPath('userData'), '/data.db'),
  autoload: true
})
// import Datastore from 'nedb'
// import path from 'path'
// // import { remote } from 'electron'
// const app = require('electron').remote.app;
// // console.log(path.join(app.getPath('userData'), '/data.db'))
// // console.log(path.join(remote.app.getPath('userData'), '/data.db'));
// export default new Datastore({
//   autoload: true,
//   filename: path.join(app.getPath('userData'), '/data.db')
// })

// export default new Datastore({
//   autoload: true,
//   filename: 'data.db'
// })