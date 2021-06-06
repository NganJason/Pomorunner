import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"

const app = express()
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "chrome-extension://fdpnjkhcndjnmmokfdchmklieiodblhm",
      "http://localhost:3000",
    ],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json())

export default app;