import * as yup from "yup";

export const resetPasswordFormSchema = yup.object().shape({
  email: yup.string().email("invalid!").required("required!"),
});

export interface ResetPassword {
  email: string;
}