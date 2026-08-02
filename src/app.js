import express from "express"
import cookieParser from "cookie-parser";
import ApiRouter from "./routes/main.route.js";
import ConnectDB from "./db/db.js";
import AuthRouter from "./routes/Auth.route.js";
import mainRouter from "./routes/main.route.js";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();
ConnectDB();

const allowedOrigins = [
  "https://project-pearl-nine-63.vercel.app/",
  "https://project-pearl-nine-63.vercel.app"
];
const limiter = rateLimit({
  windowMs: 2 * 1000,
  max: 1,
  message: {
    success: false,
    message: "Too many requests. Please try again after 5 seconds."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }));

app.use('/Auth', AuthRouter);
app.use('/apis', mainRouter);


export default app;
