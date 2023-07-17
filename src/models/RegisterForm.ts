import * as yup from "yup";

export const registerFormSchema = yup.object().shape({
  email: yup.string().email("invalid!").required("required!"),
  password: yup
    .string()
    .min(8, "!invalid! too less characters")
    .max(12, "invalid! too many characters")
    .required("required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match!")
    .required("required!"),
});

export interface AuthForm {
  email: string;
  password: string;
  confirmPassword: string;
}