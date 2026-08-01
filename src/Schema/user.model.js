import mongoose from "mongoose";


const Schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username zaroori hai'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'name zaroori hai']
  },
  email: {
    type: String,
    required: [true, 'Email zaroori hai'],
    unique: true, 
    match: [/^.+@.+$/, 'Kripya sahi email dalein'] 
  },
  password:{
    type:String,
    required:[true,'password zaroori hain.']
  },
  posts: [{
    type: mongoose.Schema.ObjectId,
    ref:'post'
  }],
  schemaVersion: {
    type: Number,
    required: true,
    min: [1, 'Version 1 se kam nahi ho sakta'],
    default: 1
  }
}, { timestamps: true });


const usermodel = mongoose.model("user",Schema)

export default usermodel;