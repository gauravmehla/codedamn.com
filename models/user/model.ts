import * as mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({  
  name: String,
  username: String,
  email: String,
  password: String,
  facebookLinked: {type: String, default: ""},
  twitterLinked: {type: String, default: ""},
  githubLinked: {type: String, default: ""},
  googleLinked: {type: String, default: ""}
}, { collection: 'users' })

mongoose.model('User', UserSchema)
export default mongoose.model('User')