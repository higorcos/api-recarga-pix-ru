import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:3003`,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Max-Age": "86400",
  },
});
