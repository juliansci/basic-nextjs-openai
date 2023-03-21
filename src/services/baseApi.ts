import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const axiosClient = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })
);

export default axiosClient;
