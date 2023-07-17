import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
  email: yup.string().email("invalid!").required("required!"),
  password: yup
    .string()
    .min(8, "!invalid! too less characters")
    .max(12, "invalid! too many characters")
    .required("required!"),
});

export interface LoginForm {
  email: string;
  password: string;
}