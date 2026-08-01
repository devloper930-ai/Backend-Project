import express from "express"
import { createpost, DeletePost, GetPost, GetProfile } from "../controllers/main.controller.js";
import { verifyToken } from "../middleware/VerifyTokenMiddleware.js"

const mainRouter = express.Router();

mainRouter.get('/profile/:username',GetProfile);
mainRouter.post('/new', verifyToken, createpost);
mainRouter.delete('/delete/:postId', verifyToken, DeletePost);
mainRouter.get('/post/:postId',GetPost);



export default mainRouter;