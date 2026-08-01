import jwt from "jsonwebtoken";
import config from "../config/config.js";



export async function verifyToken(req, res, next) {
     const token = req.cookies.AuthToken;
     if (!token) {
          return res.status(401).json({ massage: "unauthrized user" });
     }
     try{
          const verifytoken = await jwt.verify(token, config.JWT_SECRET);
          if(!verifyToken){return res.status(401).json({ massage: "invalid token" }) }
          req.id = verifytoken.id;
          next();
     }catch(error){
          console.log(error);
         return res.status(401).json({ massage: "invalid token" }) 
     }
}
