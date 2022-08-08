import { postAxios, deleteAxios, getAxios } from "./base";

export const LogoutAPI = async (token) => {
  try {
    const url = `/auth/logout`;
    const res = await deleteAxios(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err) {
    return err;
  }
};

export const StudentSignupAPI = async (data) => {
  const url = `/auth/signup/student`;
  try {
    const res = await postAxios(url, data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const CompanySignupAPI = async (data) => {
  const url = `/auth/signup/company`;
  try {
    const res = await postAxios(url, data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const sendResetEmailAPI = async (data) => {
  const url = `/auth/password_reset/send`;
  try {
    const res = await postAxios(url, data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const resetPasswordAPI = async (data) => {
  const url = `/auth/password_reset/reset`;
  try {
    const res = await postAxios(url, data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getShortUserInfo = async (uid) => {
  try {
    const url = `/auth/userInfoShort/${uid}`;
    const res = await getAxios(url, {});

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getLongUserInfo = async (uid) => {
  try {
    const url = `/auth/userInfoLong/${uid}`;
    const res = await getAxios(url, {});

    return res.data;
  } catch (err) {
    return err;
  }
};

export const editStudentProfileAPI = async (data, token) => {
  try {
    const url = `/auth/userInfoLong`;
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
    const url = `/auth/userInfoShort`;
    const res = await postAxios(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getSkils = async () => {
  try {
    const url = `/auth/skills`;
    const res = await getAxios(url);

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getIndustries = async () => {
  try {
    const url = `/auth/industries`;
    const res = await getAxios(url);

    return res.data;
  } catch (err) {
    return err;
  }
};
