import bcrypt from "bcrypt"
import usermodel from "../Schema/user.model.js";

const salt = 10;

export async function HashPassword(password) {
     const hashpassword = await bcrypt.hash(password, salt);
     return hashpassword;
}
