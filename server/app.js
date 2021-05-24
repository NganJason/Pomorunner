import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"

const app = express()
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json())

export default app;