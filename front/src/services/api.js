import axios from "axios";
import {toast} from "react-toastify";

const instance = axios.create({
  baseURL: 'http://localhost:3001/api/'
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