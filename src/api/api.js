import axios from 'axios';

let $axios = axios.create({
  baseURL: 'localhost:3000/',
});

export const api = {
  getWalks() {
    return $axios.get('').then(resp => resp.data);
  },
};
