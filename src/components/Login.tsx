import { Dispatch, SetStateAction, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
import { LoginForm, loginFormSchema } from "../models/LoginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useAppDispatch } from "../hooks/storeHook";
import { login, openRegister } from "../features/auth/authSlice";
import { ResetPassword as ResetPasswordInterface } from "../interfaces/ResetPassword";
import ResetPassword from "./ResetPassword";

const Login = () => {
  const [resetPassword, setResetPassword] = useState(false);
  const [resetPasswordEmail, setresetPasswordEmail] = useState("");
  const [resetPasswordSuccess, setresetPasswordSuccess] = useState<
    string | null
  >(null);
  const [resetPasswordError, setresetPasswordError] = useState<string | null>(
    null
  );
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [errorMessage, setErrorMessge] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const handlePasswordReset = async (data: ResetPasswordInterface) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, data.email);
      setresetPasswordSuccess(
        "Password reset email sent. Please check your inbox."
      );
      setIsLoading(false);
      onHide("displayResponsive");
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessge(error);
      const errorCode = error.code;
      setErrorMessge(errorCode);
    }
  };

  const onHide = async (name: string) => {
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name: string) => {
    return (
      <div>
        <Button
          disabled={isLoading}
          label={isLoading ? "" : "Cancel"}
          icon={isLoading ? "pi pi-spin pi-spinner" : "pi pi-times"}
          onClick={() => onHide(name)}
          className="p-button-text"
        />
      </div>
    );
  };

  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  const dispatch = useAppDispatch();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setErrorMessge(null);
    setIsLoading(true);
    const { email, password } = data;
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user && user.email) {
        // will set this up later
        // setFormData(data);
        // setShowMessage(true);
        reset();
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user.photoURL || null,
          })
        );
      }
    } catch (error: any) {
      setIsLoading(false);
      const errorCode = error.code;
      setErrorMessge(errorCode);
    }
    setIsLoading(false);
  };

  const getFormErrorMessage = (name: string) => {
    if (name === "email") {
      return <small className="p-error">{errors?.email?.message}</small>;
    }
    if (name === "password") {
      return <small className="p-error">{errors?.password?.message}</small>;
    }

    // return (
    //   errors[name] && <small className="p-error">{errors[name].message}</small>
    // );
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
        Login to access todos
      </h2>
      <p className="mb-4 text-indigo-800">
        <span> or </span>
        <button type="button" onClick={() => dispatch(openRegister())}>
          create new one...
        </button>
      </p>
      <Card>
        <div className="form-demo mb-6">
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
              <h5>Registration Successful!</h5>
              <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                Your account is registered under the email{" "}
                <b>{formData?.email}</b> ; it'll be valid next 30 days without
                activation. Please check <b>{formData?.email}</b> for activation
                instructions.
              </p>
            </div>
          </Dialog>
          <div className="flex justify-content-center">
            <div className="card">
              {errorMessage && (
                <p className="text-red-500 text-center">{errorMessage}</p>
              )}
              <h5 className="text-center">Login</h5>
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required.",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message:
                            "Invalid email address. E.g. example@email.com",
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          // {...register("email")}
                        />
                      )}
                    />
                    <label
                      htmlFor="email"
                      className={classNames({ "p-error": !!errors.email })}
                    >
                      Email*
                    </label>
                  </span>
                  {getFormErrorMessage("email")}
                </div>
                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="password"
                      control={control}
                      rules={{ required: "Password is required." }}
                      render={({ field, fieldState }) => (
                        <Password
                          id={field.name}
                          {...field}
                          toggleMask
                          feedback={false}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor="password"
                      className={classNames({ "p-error": errors.password })}
                    >
                      Password*
                    </label>
                  </span>
                  {getFormErrorMessage("password")}
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
        <div className="dialog-demo">
          <div className="card">
            <Button
              label="Reset Password"
              icon="pi pi-plus-circle"
              onClick={() => onClick("displayResponsive")}
            />
            <Dialog
              showHeader={isLoading ? false : true}
              header="Reset Password"
              className={
                isLoading
                  ? "w-full sm:w-[75vh] pt-10 text-primary-bg"
                  : "w-full sm:w-[75vh]"
              }
              visible={displayResponsive}
              onHide={() => onHide("displayResponsive")}
              footer={renderFooter("displayResponsive")}
            >
              <ResetPassword
                isLoading={isLoading}
                resetPasswordSuccess={resetPasswordSuccess}
                resetPasswordError={resetPasswordError}
                resetPasswordEmail={resetPasswordEmail}
                setresetPasswordEmail={setresetPasswordEmail}
                handlePasswordReset={handlePasswordReset}
                isOpen={resetPassword}
                onClose={() => setResetPassword(false)}
              />
            </Dialog>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;