import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3001/api/'
});

instance.interceptors.response.use(
  ({ data }) => data,
  async (error) => {
    // TODO - Handle errors
    return Promise.reject(error);
  }
);

export const searchItems = (query) => instance.get(`items?q=${encodeURI(query)}`);

export const getItem = (id) => instance.get(`items/${id}`);

export default instance;