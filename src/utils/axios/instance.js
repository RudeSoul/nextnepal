import Axios from "axios";
// import env from "dotenv";

export const instance = Axios.create({
  // baseURL: process.env.REACT_APP_CN_API_URL,
  baseURL: "https://cateringnepal.com/public/api/",
  // baseURL: "https://project.justnep.com/public/api/",
});
