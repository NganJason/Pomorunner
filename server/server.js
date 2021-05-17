import app from "./app.js"
import config from "./config.js"
import { initDBRepo } from "./repository/dbRepo.js";

import mongoose from "mongoose"

const PORT = config.port;
const mongoURI = config.mongoURI;

const run = async() => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully connected to database")

        initDBRepo()

        app.listen(PORT, err => {
            if(err) {
                throw err;
            } else {
                console.log(`App is listening at port ${PORT}!`);
            }
        })
    } catch(err) {
        console.log(`Failed to start server. Error: ${err}`)
    }
}

run();