import axios from "axios";

export const getAxios = (url, data = {}) =>
  new Promise((resolve, reject) => {
    axios
      .get(url, { ...data })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const postAxios = (url, data = {}) =>
  new Promise((resolve, reject) => {
    axios
      .post(url, { ...data })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
