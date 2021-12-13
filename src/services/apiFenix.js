import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fenixapi.tecnoeste.net/rest/jsonPecasBF2021',
});

api.interceptors.request.use(async (config) => config);

export default api;
