import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { UpdateTodo as UpdateTodoInterface } from "../interfaces/Todo";
import { updateTodoFormSchema } from "../models/UpdateTodoForm";

interface WhoseTodoSelector {
  name: string;
  disabled?: boolean;
  selected?: boolean;
}

interface Props {
  todo: UpdateTodoInterface;
  handleUpdateTodo: Function;
  isLoading: boolean;
}

const whoseTodos: WhoseTodoSelector[] = [
  { name: "-", disabled: true, selected: true },
  { name: "his" },
  { name: "hers" },
];

export const UpdateTodoForm = ({
  todo,
  handleUpdateTodo,
  isLoading,
}: Props) => {
  const [formData, setFormData] = useState<UpdateTodoInterface>();
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessge] = useState<null | string>(null);

  // if I have problems with resolver check theselines
  const defaultValues = {
    description: todo.description,
    whoseTodo: { name: todo.whoseTodo.name },
    complete: todo.complete,
    id: todo.id,
  };

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(updateTodoFormSchema),
  });

  // dont forget to fix this
  const onSubmit = async (data: UpdateTodoInterface) => {
    try {
      await handleUpdateTodo(data);
    } catch (error: any) {
      setErrorMessge(error);
      const errorCode = error.code;
      setErrorMessge(errorCode);
    }
  };

  const getFormErrorMessage = (name: string) => {
    if (name === "description") {
      return <small className="p-error">{errors?.description?.message}</small>;
    }
    if (name === "whoseTodo") {
      return (
        <small className="p-error">{errors?.whoseTodo?.name?.message}</small>
      );
    }
    if (name === "complete") {
      return <small className="p-error">{errors?.complete?.message}</small>;
    }
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );

  return (
    <div className="sm:w-fit mx-auto">
      <h2 className="text-2xl font-semibold mb-2 text-primary">Edit Todo...</h2>
      <p className="mb-4 text-indigo-800">
        <span> or </span>
        {/* <button type="button" onClick={() => dispatch(openLogin())}>
        {todo ? "create a new one..." : ""}
        </button> */}
        <button type="button">create a new one...</button>
      </p>
      <Card>
        <div className="form-demo">
          <Dialog
            visible={showMessage}
            onHide={() => setShowMessage(false)}
            position="top"
            footer={dialogFooter}
            showHeader={false}
            breakpoints={{ "960px": "80vw" }}
            style={{ width: "30vw" }}
          >
            <div className="flex justify-content-center flex-column pt-6 px-3">
              <i
                className="pi pi-check-circle"
                style={{ fontSize: "5rem", color: "var(--green-500)" }}
              ></i>
              <h5>Todo Update Successful!</h5>
              <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                Your Todo was updated...
                <b>{formData?.description}</b> By...
                <b>{formData?.whoseTodo.name}</b>
              </p>
            </div>
          </Dialog>
          <div className="flex justify-content-center">
            <div className="card">
              {errorMessage && (
                <p className="text-red-500 text-center">{errorMessage}</p>
              )}
              <h5 className="text-center">Edit Todo...</h5>
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <Controller
                      name="description"
                      control={control}
                      rules={{
                        required: "Description is required.",
                      }}
                      render={({ field, fieldState }) => (
                        <InputText
                          disabled={isLoading}
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          // {...register("description")}
                        />
                      )}
                    />
                    <label
                      htmlFor={"description"}
                      className={classNames({
                        "p-error": !!errors.description,
                      })}
                    >
                      Description*
                    </label>
                  </span>
                  {getFormErrorMessage("description")}
                </div>
                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <Controller
                      name="whoseTodo"
                      control={control}
                      rules={{
                        required: "WhoseTodo is required.",
                        // pattern: {
                        //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        //   message:
                        //     "Invalid email address. E.g. example@email.com",
                        // },
                      }}
                      render={({ field, fieldState }) => (
                        <Dropdown
                          disabled={isLoading}
                          id={field.name}
                          value={field.value}
                          optionLabel="name"
                          options={whoseTodos}
                          focusInputRef={field.ref}
                          onChange={(e) => field.onChange(e.value)}
                          className={classNames({
                            "p-invalid": fieldState.error,
                          })}
                        />
                      )}
                    />
                    <label
                      hidden
                      htmlFor="whoseTodo"
                      className={classNames({
                        "p-error": !!errors.whoseTodo,
                      })}
                    >
                      Whose Todo?*
                    </label>
                  </span>
                  {getFormErrorMessage("whoseTodo")}
                </div>
                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-bookmark-fill" />
                    <Controller
                      name="complete"
                      control={control}
                      // rules={
                      //   {
                      //     required: "Email is required.",
                      //     pattern: {
                      //       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      //       message:
                      //         "Invalid email address. E.g. example@email.com",
                      //     },
                      //   }
                      // }
                      render={({ field, fieldState }) => (
                        <>
                          <Checkbox
                            disabled={isLoading}
                            inputId={field.name}
                            checked={field.value || false}
                            inputRef={field.ref}
                            className={classNames({
                              "p-invalid mr-1": fieldState.error,
                            })}
                            onChange={(e) => field.onChange(e.checked)}
                          />
                          {getFormErrorMessage(field.name)}
                          <label
                            htmlFor="complete"
                            className={classNames({
                              "ml-5": true,
                              "p-error": errors.complete,
                            })}
                          >
                            Completed
                          </label>
                        </>
                      )}
                    />
                  </span>
                  {getFormErrorMessage("complete")}
                </div>
                <Button
                  disabled={isLoading}
                  type="submit"
                  label={isLoading ? "" : "Submit"}
                  className="mt-2 text-primary"
                >
                  {isLoading && (
                    <span className="p-input-icon-right p-input-icon-left text-primary">
                      please wait...
                      <i className="pi pi-spin pi-spinner" />
                      <span className="p-input-icon-right p-input-icon-left">
                        <i className="pi pi-spin pi-spinner">Please wait...</i>
                      </span>
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default UpdateTodoForm;