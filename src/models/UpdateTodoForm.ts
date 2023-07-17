import * as yup from "yup";

export const updateTodoFormSchema = yup.object().shape({
  description: yup
    .string()
    .min(5, "!invalid! too less characters")
    .max(255, "invalid!")
    .required("required!"),

  whoseTodo: yup.object().shape({
    name: yup.string().required("required!"),
    // name: yup.string().min(3, "Sorry! this todo can not be assigned to anyone").max(4, "Sorry! this todo can not be assigned to anyone").required('required!'),
  }),
  complete: yup.bool(),
  id: yup.string().required(),
  // isPublic: yup.bool(),
  // userId: yup.string().required(),
});