import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAppDispatch } from "../hooks/storeHook";
import { auth, db } from "../config/firebase";
import { login, openLogin } from "../features/auth/authSlice";
import { AuthForm, registerFormSchema } from "../models/RegisterForm";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState<AuthForm>();
  const [errorMessage, setErrorMessge] = useState<null | string>(null);
  const defaultValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    control,
    // register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(registerFormSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: AuthForm) => {
    setErrorMessge(null);
    setLoading(true);
    const { email, password } = data;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", user.uid), { email });
      setLoading(false);
      setFormData(data);
      setShowMessage(true);
      if (user && user.email) {
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
      setLoading(false);
      const errorCode = error.code;
      setErrorMessge(errorCode);
      console.log(error);
    }
  };

  const getFormErrorMessage = (name: string) => {
    if (name === "email") {
      return <small className="p-error">{errors?.email?.message}</small>;
    }
    if (name === "password") {
      return <small className="p-error">{errors?.password?.message}</small>;
    }
    if (name === "confirmPassword") {
      return (
        <small className="p-error">{errors?.confirmPassword?.message}</small>
      );
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
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="sm:w-fit mx-auto">
      <h2 className="text-2xl font-semibold mb-2 text-primary">
        Register to create todos
      </h2>
      <p className="mb-4 text-indigo-800">
        <span> or </span>
        <button type="button" onClick={() => dispatch(openLogin())}>
          login to existing one...
        </button>
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
              <h5 className="text-center">Register</h5>
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
                      // {...register("password")}
                      render={({ field, fieldState }) => (
                        <Password
                          id={field.name}
                          {...field}
                          toggleMask
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          header={passwordHeader}
                          footer={passwordFooter}
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
                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{ required: "Password is required." }}
                      // {...register("confirmPassword")}
                      render={({ field, fieldState }) => (
                        <Password
                          id={field.name}
                          {...field}
                          toggleMask
                          placeholder="Password Again"
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor="passwordConfirm"
                      className={classNames({
                        "p-error": errors.confirmPassword,
                      })}
                    >
                      Password*
                    </label>
                  </span>
                  {getFormErrorMessage("confirmPassword")}
                </div>
                <Button
                  disabled={loading}
                  type="submit"
                  label={loading ? "" : "Submit"}
                  className="mt-2 text-primary"
                >
                  {loading && (
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

export default Register;