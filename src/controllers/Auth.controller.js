import usermodel from "../Schema/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HashPassword } from "./Hashing.js";
import config from "../config/config.js";

export async function registerUser(req, res) {
     const { username, email, name, password } = req.body;

     const isRegisterd = await usermodel.findOne({
          $or: [{ email }, { username }]
     });

     if (isRegisterd) { return res.status(409).json({ "massege": "user Alredy registerd!" }) };

     const hashpassword = await HashPassword(password)

     try {
          const registretion = await usermodel.create({
               username,
               email,
               name,
               password: hashpassword
          });
          const id = { id: registretion._id };
          const token = await jwt.sign(id, config.JWT_SECRET, { expiresIn: '1d' });

          res.cookie("AuthToken", token, {
               httpOnly: true,
               sameSite: "none",
               secure: true,
               maxAge: 7 * 24 * 60 * 60 * 1000
          });

          return res.status(201).json({ "massege": "user register successfull", "data": registretion });

     } catch (error) {
          console.log(error);
          return res.status(403).json({ message: "Something went wrong on the server. Please try again later." });
     }
}

export async function Login(req, res) {
     const { username, email, password } = req.body;
     try {
          const user = await usermodel.findOne({
               $or: [
                    { username },
                    { email }
               ]
          });
          if (!user) { return res.status(401).json({ message: "Invalid credentials" }) }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) { return res.status(401).json({ message: "Invalid credentials" }) };

          const id = { id: user._id };

          const token = await jwt.sign(id, config.JWT_SECRET, { expiresIn: '1d' });

          res.cookie("AuthToken", token, {
               httpOnly: true,
               sameSite: "none",
               secure: true,
               maxAge: 7 * 24 * 60 * 60 * 1000
          });

          return res.status(200).json({ message: "Login successful!" })
     } catch (error) {
          console.error("Login error:", error);
          return res.status(500).json({ message: "Something went wrong on the server. Please try again later." });
     }

}

export async function Logout(req, res) {
     const token = req.cookies.AuthToken;
     if (!token) { return res.status(200).json({ success: true, massege: "you have alredy logout!" }) };
     res.clearCookie('AuthToken');
     return res.status(200).json({
          success: true,
          massege: " Logged out successfully!"
     });
}