import axios from "axios";
import {toast} from "react-toastify";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.response.use(
  ({ data }) => data,
  async (error) => {
    toast.error('Ocorreu um erro ao buscar, por favor, tente novamente mais tarde.', {
      position: toast.POSITION.TOP_CENTER
    });
    return Promise.reject(error);
  }
);

export const searchItems = (query) => instance.get(`items?q=${encodeURI(query)}`);

export const getItem = (id) => instance.get(`items/${id}`);

export default instance;