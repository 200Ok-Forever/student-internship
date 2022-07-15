import * as yup from "yup";

// const emailRule = yup
//   .string("Enter your email")
//   .email("Enter a valid email")
//   .required("Email is required");

// const passwordRule = yup
//   .string("Enter your password")
//   .min(6, "Password should be of minimum 6 characters length")
//   .required("Password is required");

// const confirmPasswordRule = yup
//   .string("Please confirm your password")
//   .min(6, "Password should be of minimum 6 characters length")
//   .required("Confirming password is required")
//   .oneOf([yup.ref("password")], "Passwords do not match");

// const emailValidationObject = { email: emailRule };

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
	university: yup
		.string("Please enter your university")
		.required("University is required"),
	degree: yup 
		.string("Please enter your degree")
		.required("Degree is required"),
};

// const resetPasswordValidationObject = {
//   password: passwordRule,
//   confirmPassword: confirmPasswordRule,
// };

export const studentSignupValidationSchema = yup.object(studentSignupValidationObject);
export const loginValidationSchema = yup.object(loginValidationObject);
// export const resetPasswordValidationSchema = yup.object(
//   resetPasswordValidationObject
// );
// export const emailValidationSchema = yup.object(emailValidationObject);
