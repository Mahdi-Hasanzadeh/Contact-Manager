import * as Yup from "yup";

export const contactValidation = Yup.object().shape({
  fullName: Yup.string()
    .required("FullName is required")
    .length(8, "at least 8 characters"),
  photo: Yup.string().url("url is not valid").required(""),
  telephone: Yup.number().required("Only number"),
  email: Yup.string().email("email is invalid").required(),
});
