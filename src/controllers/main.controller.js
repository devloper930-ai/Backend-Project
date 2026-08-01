import postmodel from "../Schema/post.model.js";
import usermodel from "../Schema/user.model.js";


export async function createpost(req, res) {
     const { title, description, image } = req.body;

     try {

          const user = await usermodel.findOne({ _id: req.id });
          if (!user) { return res.status(401).json({ "massage": "Unautharized user! user" }) };

          const createpost = await postmodel.create({ title, description, image });

          const PostSave = await usermodel.findByIdAndUpdate({ _id: req.id }, {
               $push: { posts: createpost._id }
          }, { new: true });

          return res.status(201).json({ "massage": "post created successfull.", PostSave });

     } catch (error) {
          console.log(error);
          return res.status(401).json({ "massage": "invalid token! somthing want wrrong" });
     }
}

export async function DeletePost(req, res) {
     const { postId } = req.params;
     const userId = req.id;

     if (!postId || !userId) {
          return res.status(400).json({
               success: false,
               message: "post id and user id is required."
          })
     }

     try {
          const post = await postmodel.findById(postId);
          if (!post) {
               return res.status(404).json({
                    message: "Post not found",
               })
          }
          await usermodel.findByIdAndUpdate(userId, {
               $pull: {
                    posts: post._id,
               },
          });
          await postmodel.findByIdAndDelete(postId);

          return res.status(200).json({
               message: "Post deleted successfully",
          });

     } catch (error) {
          return res.status(500).json({
               message: "Something went wrong.",
          });
     }

}

export async function GetProfile(req, res) {
     const { username } = req.params;

     if (!username) {
          return res.status(400).json({
               success: false,
               message: "username is required."
          })
     }

     try {
          const profile = await usermodel.findOne({ username: username }, { username: 1, name: 1, posts: 1 }).populate('posts', 'image');

          if (!profile) {
               return res.status(404).json({
                    success: false,
                    message: "User not found."
               });
          }
          return res.status(200).json({ profile });
     } catch (error) {
          return res.status(500).json({ massage: "somthing went wrrong" });
     }

}

export async function GetPost(req, res) {
     const { postId } = req.params;

     if (!postId) {
          return res.status(400).json({
               success: false,
               message: "post id is required."
          })
     }

     try {
          const post = await postmodel.findOne({_id:postId},{__v:0});
          if (!post) {
               return res.status(404).json({
                    success: false,
                    message: "post not found."
               })
          }
          return res.status(200).json({ success: true, post })
     } catch (error) {
          console.log(error);
          return res.status(500).json({
               success: false,
               message: "Somthing went wrong."
          })
     }
}

