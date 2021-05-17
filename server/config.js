import dotenv from "dotenv";
dotenv.config();

const dbName = "Pomodoro";

const config = {
  port: process.env.PORT || 5000,
  mongoURI: `mongodb+srv://jason-admin:${process.env.DB_PASSWORD}@cluster0.xmnss.mongodb.net/${dbName}?retryWrites=true&w=majority`,
};

export default config;
