import * as mongoose from 'mongoose'
import { user } from '../../interfaces/user';

const UserSchema = new mongoose.Schema({  
  name: String,
  username: String,
  email: String,
  password: String,
  ltags: {type: [String], default: []},
  facebookLinked: {type: String, default: ""},
  twitterLinked: {type: String, default: ""},
  githubLinked: {type: String, default: ""},
  googleLinked: {type: String, default: ""},
  firstTime: { type: Boolean, default: true },
  level: { type: String, default: "0" }
}, { collection: 'users' })

const model = mongoose.model<user>('User', UserSchema)
export default model