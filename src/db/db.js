import mongoose from "mongoose";
import config from "../config/config.js"

const ConnectDB = async () => {
     try {
          const connected = await mongoose.connect(config.MONGO_URL);
          console.log("connected");
     } catch (error) {
          console.log("mongodb error : ", error);
     }
}

export default ConnectDB