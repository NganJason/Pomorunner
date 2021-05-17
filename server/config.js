import dotenv from "dotenv"
dotenv.config()

const DB_NAME = 'Pomodoro'

const config = {
  port: process.env.PORT || 5000,
  mongoURI: `mongodb+srv://jason-admin:${process.env.DB_PASSWORD}@cluster0.xmnss.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
};

export default config