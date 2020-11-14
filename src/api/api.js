import axios from 'axios';

let $axios = axios.create({
  baseURL: 'http://localhost:3000/walking',
});

export const api = {
  getWalks(query) {
    return $axios
      .get(`/${query}`)
      .then(resp => resp.data)
      .catch(err => err);
  },
};
