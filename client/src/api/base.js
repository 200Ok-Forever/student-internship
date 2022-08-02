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

const API = axios.create({ baseURL: "http://localhost:5004" });

export const getRequest = async (path, config) => {
  try {
    const res = await API.get(path, config);
    return res.data;
  } catch (err) {
    console.log(err)
    return err;
  };
}

export const postRequest = async (path, data, config) => {
  try {
    const res = await API.post(path, data, config);
    return res.data
  } catch (err) {
    console.log(err)
    return err;
  }
}

export const deleteRequest = async (path, config) => {
  try {
    const res = await API.delete(path, config);
    return res.data
  } catch (err) {
    console.log(err)
    return err;
  }
}

export const patchRequest = async (path, data, config) => {
  try {
    const res = await API.patch(path, data, config);
    return res.data
  } catch (err) {
    console.log(err)
    return err;
  }
}

export const putRequest = async (path, data, config) => {
  try {
    const res = await API.put(path, data, config);
    return res.data
  } catch (err) {
    console.log(err)
    return err;
  }
}