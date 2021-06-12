import axios from "axios"
import { LocalService } from "./localServices/LocalService.js"

let devURL = "http://localhost:5000/api";
let liveURL = "https://pomorunner.herokuapp.com/api";

let baseURL = {
  'development' : devURL,
  'production' : liveURL
}

class Service {
    constructor() {
        const instance = axios.create({
          baseURL: baseURL[process.env.NODE_ENV],
          withCredentials: true,
        });

        this.localService = new LocalService(instance)
    }
}

var service = null;

export const getService = () => {
  if (service === null) {
    service = new Service();
    console.log("Init new service");
  }

  return service;
};