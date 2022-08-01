import axios from "axios";
import { getAxios, postAxios } from "./base";

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
