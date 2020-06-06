import Datastore from 'nedb'
import path from 'path'
import { app } from 'electron'

export default new Datastore({
  filename: path.join(app.getPath('userData'), '/data.db'),
  autoload: true
})
