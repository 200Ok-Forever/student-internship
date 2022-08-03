import * as yup from "yup";

const sendResetEmailValidationObject = {
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
};


const loginValidationObject = {
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
};

const resetPasswordValidationObject = {
  ...loginValidationObject,
  confirmPassword: yup
    .string("Please confirm your password")
    .required("Confirming password is required")
    .min(6, "Password should be of minimum 6 characters length")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  resetCode: yup
  .string("Enter your reset code")
  .required("Reset code is required"),
}

const studentSignupValidationObject = {
  ...loginValidationObject,
  confirmPassword: yup
    .string("Please confirm your password")
    .required("Confirming password is required")
    .min(6, "Password should be of minimum 6 characters length")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  firstName: yup
    .string("Please enter your first name")
    .required("First name is required"),
  lastName: yup
    .string("Please enter your last name")
    .required("Last name is required"),
  username: yup
    .string("Please enter your last name")
    .required("Last name is required"),
  university: yup
    .string("Please enter your university")
    .required("University is required"),
  degree: yup.string("Please enter your degree").required("Degree is required"),
};

const companySignupValidationObject = {
  ...loginValidationObject,
  confirmPassword: yup
    .string("Please confirm your password")
    .required("Confirming password is required")
    .min(6, "Password should be of minimum 6 characters length")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  firstName: yup
    .string("Please enter your first name")
    .required("First name is required"),
  lastName: yup
    .string("Please enter your last name")
    .required("Last name is required"),
  username: yup
    .string("Please enter your last name")
    .required("Last name is required"),
  company_name: yup
    .string("Please enter your company name")
    .required("Company name is required"),
};

export const sendResetEmailValidationSchema = yup.object(
  sendResetEmailValidationObject
);
export const studentSignupValidationSchema = yup.object(
  studentSignupValidationObject
);
export const loginValidationSchema = yup.object(loginValidationObject);
export const companySignupValidationSchema = yup.object(
  companySignupValidationObject
);
export const resetPasswordValidationSchema = yup.object(
  resetPasswordValidationObject
);
// export const emailValidationSchema = yup.object(emailValidationObject);
