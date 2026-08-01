import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
     title:{
          type:String,
          required:[true,'title is required!'],
     },
     description:{
          type:String,
          required:[true,'description is required!'],
     },
     image:{
          type:String,
     }
});

const postmodel = mongoose.model('post',PostSchema);

export default postmodel;