import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm, FieldErrors, Controller } from "react-hook-form";
import { resetPasswordFormSchema } from "../models/ResetPasswordSchema";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { ResetPassword as ResetPasswordInterface } from "../interfaces/ResetPassword";

interface ResetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  handlePasswordReset: (data: ResetPasswordInterface) => Promise<void>;
  resetPasswordEmail: string;
  resetPasswordSuccess: string | null;
  resetPasswordError: string | null;
  setresetPasswordEmail: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

const ResetPassword: FC<ResetPasswordProps> = (props) => {
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [errorMessage, setErrorMessge] = useState<null | string>(null);
  const [position, setPosition] = useState("center");
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState<ResetPasswordInterface>();

  const dialogFuncMap: dialogFuncMapTypes = {
    displayResponsive: setDisplayResponsive,
  };

  interface dialogFuncMapTypes {
    [key: string]: Dispatch<SetStateAction<boolean>>;
  }

  const onClick = (name: string, position = "") => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name: string) => {
    dialogFuncMap[`${name}`](false);
  };

  const {
    handlePasswordReset,
    resetPasswordEmail,
    resetPasswordSuccess,
    resetPasswordError,
    setresetPasswordEmail,
  } = props;

  const defaultValues = {
    email: "",
  };

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(resetPasswordFormSchema),
  });

  const onSubmit = async (data: ResetPasswordInterface) => {
    if (formData?.email.length) {
      return;
    }
    try {
      await handlePasswordReset(data);
    } catch (error: any) {
      setErrorMessge(error);
      const errorCode = error.code;
      setErrorMessge(errorCode);
    }
  };

  const getFormErrorMessage = (name: FieldErrors<{}>) => {
    if (name === "email") {
      return <small className="p-error">{errors?.email?.message}</small>;
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
      <h2 className="text-2xl font-semibold mb-2 text-primary">
        Reset Password
      </h2>
      <p className="mb-4 text-indigo-800"></p>
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
              <h5>Password Link Sent!</h5>
              <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                Password reset link sent...
                <b>Password reset link sent to {formData?.email}</b>...
              </p>
            </div>
          </Dialog>
          <div className="flex justify-content-center">
            <div className="card">
              {errorMessage && (
                <p className="text-red-500 text-center">{errorMessage}</p>
              )}
              <h5 className="text-center">
                Forgot your password? dratz...Enter your email down below and I
                will hit you with a link to reset your password...
              </h5>
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required.",
                      }}
                      render={({ field, fieldState }) => (
                        <InputText
                          disabled={props.isLoading}
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          autoFocus
                          // {...register("description")}
                        />
                      )}
                    />
                    <label
                      htmlFor={"email"}
                      className={classNames({
                        "p-error": !!errors.email,
                      })}
                    >
                      Email*
                    </label>
                  </span>
                  {getFormErrorMessage("email")}
                </div>
                <Button
                  disabled={props.isLoading}
                  type="submit"
                  label={props.isLoading ? "" : "Submit"}
                  className="mt-2 text-primary"
                >
                  {props.isLoading && (
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

export default ResetPassword;