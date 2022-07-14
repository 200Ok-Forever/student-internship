import * as yup from "yup";

const emailRule = yup
  .string("Enter your email")
  .email("Enter a valid email")
  .required("Email is required");

const passwordRule = yup
  .string("Enter your password")
  .min(6, "Password should be of minimum 6 characters length")
  .required("Password is required");

const confirmPasswordRule = yup
  .string("Please confirm your password")
  .min(6, "Password should be of minimum 6 characters length")
  .required("Confirming password is required")
  .oneOf([yup.ref("password")], "Passwords do not match");

const emailValidationObject = { email: emailRule };

const loginValidationObject = {
  email: emailRule,
  password: passwordRule,
};

const resetPasswordValidationObject = {
	password: passwordRule,
	confirmPassword: confirmPasswordRule,
}

const signupValidationObject = {
  ...emailValidationObject,
  ...resetPasswordValidationObject,
};


export const signupValidationSchema = yup.object(signupValidationObject);
export const loginValidationSchema = yup.object(loginValidationObject);
export const resetPasswordValidationSchema = yup.object(resetPasswordValidationObject);
export const emailValidationSchema = yup.object(emailValidationObject);
