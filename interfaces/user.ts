import * as mongoose from "mongoose";

export interface user extends mongoose.Document {
    name: String,
    username: String,
    email: String,
    password: String,
    facebookLinked?: String,
    twitterLinked?: String,
    githubLinked?: String,
    googleLinked?: String,
    firstTime: Boolean
}