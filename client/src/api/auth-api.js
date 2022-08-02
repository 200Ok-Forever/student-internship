import { postAxios } from "./base";

const baseURL = "http://localhost:5004";

export const LoginAPI = async (data) => {
  try {
    const url = `${baseURL}/auth/login`;
    const res = await postAxios(url, data);

    return res.data;
  } catch (err) {
    return err;
  }
};

export const LogoutAPI = async (data) => {
  try {
    const url = `${baseURL}/auth/logout`;
    const res = await postAxios(url, data);

    return res.data;
  } catch (err) {
    return err;
  }
};

export const StudentSignupAPI = async (data) => {
  const url = `${baseURL}/auth/signup/student`;
  try {
    const res = await postAxios(url, data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const CompanySignupAPI = async (data) => {
  const url = `${baseURL}/auth/signup/company`;
  try {
    const res = await postAxios(url, data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const sendResetEmailAPI = async (data) => {
  const url = `${baseURL}/auth/password_reset/send`;
  try {
    const res = await postAxios(url, data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const resetPasswordAPI = async (data) => {
  const url = `${baseURL}/auth/password_reset/reset`;
  try {
    const res = await postAxios(url, data);
    return res.data;
  } catch (err) {
    return err;
  }
};
