import axios from 'axios';

let $axios = axios.create({
  baseURL: 'http://localhost:3000/walking',
});

export const api = {
  getWalks(query) {
    return $axios
      .get(`/${query}`)
      .then(resp => resp.data)
  },

  postWalk(walk) {
    return $axios
      .post('/', walk)
      .then(resp => resp)
  },

  putWalk(walk, id) {
    return $axios
      .put(`/${id}`, walk)
      .then(resp => resp)
  },

  deleteWalk(id) {
    return $axios
      .delete(`/${id}`)
      .then(resp => resp)
  },
};
