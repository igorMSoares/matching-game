import API from "./API";

export default {
  search(query: string) {
    return API().get(`/search?keyword=${query}&media_type=image`);
  },
};
