import express from "express"
import {Login, Logout, registerUser} from "../controllers/Auth.controller.js"


const AuthRouter = express.Router();


AuthRouter.post("/add",registerUser);
AuthRouter.post("/Login",Login);
AuthRouter.get("/LogOut",Logout);

export default AuthRouter;



