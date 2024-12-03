import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://dev.mindwave.kz/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance };
