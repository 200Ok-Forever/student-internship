import axios from "axios";

export const API = axios.create({ baseURL: "http://localhost:5004" });

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 422) {
      window.localStorage.clear();
      window.location.href = "/login";
    }
    return error;
  }
);

export const getAxios = (path, configs) =>
  new Promise((resolve, reject) => {
    API.get(path, configs)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const postAxios = (path, data = {}, configs) =>
  new Promise((resolve, reject) => {
    API.post(path, { ...data }, configs)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const deleteAxios = (path, data = {}) =>
  new Promise((resolve, reject) => {
    API.delete(path, { ...data })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getRequest = async (path, config) => {
  try {
    const res = await API.get(path, config);
    console.log(res)
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const postRequest = async (path, data, config) => {
  try {
    const res = await API.post(path, data, config);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteRequest = async (path, config) => {
  try {
    const res = await API.delete(path, config);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const patchRequest = async (path, data, config) => {
  try {
    const res = await API.patch(path, data, config);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const putRequest = async (path, data, config) => {
  try {
    const res = await API.put(path, data, config);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
