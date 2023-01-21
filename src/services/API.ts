import axios from "axios";

export default (url = "https://images-api.nasa.gov") => {
  return axios.create({
    baseURL: url,
  });
};
