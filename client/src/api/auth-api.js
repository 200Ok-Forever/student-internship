import { postAxios, deleteAxios, getAxios, getRequest } from "./base";

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

export const LogoutAPI = async (token) => {
  try {
    const url = `${baseURL}/auth/logout`;
    const res = await deleteAxios(
      url,
      {},
      { headers: { Authorization: token } }
    );

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

export const getShortUserInfo = async (uid) => {
  try {
    const url = `${baseURL}/auth/userInfoShort/${uid}`;
    const res = await getAxios(url, {});

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getLongUserInfo = async (uid) => {
  try {
    const url = `${baseURL}/auth/userInfoLong/${uid}`;
    const res = await getAxios(url, {});

    return res.data;
  } catch (err) {
    return err;
  }
};

export const editStudentProfileAPI = async (data, token) => {
  try {
    const url = `${baseURL}/auth/userInfoLong`;
    const res = await postAxios(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err) {
    return err;
  }
};

export const changeAvatarApi = async (data, token) => {
  try {
    const url = `${baseURL}/auth/userInfoShort`;
    const res = await postAxios(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getContinueSession = async (token) => (
  await getRequest(
    `/auth/continueSession`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
)
