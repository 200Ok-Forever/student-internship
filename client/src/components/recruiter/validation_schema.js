import * as yup from "yup";

export const postInternshipValidationSchema = yup.object().shape({
  title: yup.string().required("Tttle is required"),
  city: yup.string().required("City is required"),
  description: yup.string().required("Description is required"),
  steps: yup.array().of(yup.string().required("Steps cannot be empty")),
  questions: yup.array().of(yup.string().required("Questions cannot be empty"))
});