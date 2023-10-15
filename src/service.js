'use strict';
const axios = require('axios');
// eslint-disable-next-line no-unused-vars
const pathPost = 'https://jsonplaceholder.typicode.com/posts/{post_id}';

const Service = {
  buildAxios: (path, data) => {
    axios({
      method: 'get',
      url: path,
      data: data,
    }).then((res) => {

    }).catch((error) => {

    });
  },
  checkIsAdult: (age) => {
    return new Promise((resolve, reject) => {
      if (age >= 18) resolve('Da tren 18');
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Chua an duoc');
    });
  },
  list: async (postId) => {
    try {
      const path = pathPost.replace('{post_id', postId);
      const response = await axios.get(path);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  update: async (postId, data) => {
    try {
      const path = pathPost.replace('{post_id}', postId);
      const res = await axios.put(path, data);
      return !!(res);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  delete: async (postId) => {
    try {
      const path = pathPost.replace('{post_id}', postId);
      const res = await axios.delete(path);
      return !!(res);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

module.exports = Service;
