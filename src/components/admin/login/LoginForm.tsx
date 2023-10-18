"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../contexts";
import {
  AdminRoute,
  AuthorizationCode,
  AuthorizationMessage,
  KeyAdminLogin,
  LocalStorage,
  deleteSearchParams,
  getSearchParams,
} from "../../../shared";
import submitAction from "./action";
import { ILoginFormKeys, ISchemaLoginForm, SchemaLoginForm } from "./schema";

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = React.useState("");
  const router = useRouter();
  const { setLocalStorageValue } = React.useContext(AuthContext);

  useEffect(() => {
    const code = getSearchParams(KeyAdminLogin.Code);
    if (code) {
      toast.error(AuthorizationMessage[AuthorizationCode.AccessDenied]);
      localStorage.removeItem(LocalStorage.Token);
      localStorage.removeItem(LocalStorage.RefreshToken);
      deleteSearchParams(KeyAdminLogin.Code);
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ISchemaLoginForm>({
    mode: "onSubmit",
    resolver: zodResolver(SchemaLoginForm),
  });

  const onSubmit: SubmitHandler<ISchemaLoginForm> = async (data) => {
    const validated = SchemaLoginForm.safeParse(data);

    if (!validated.success) {
      const errors = Object.values(validated.error.flatten().fieldErrors);
      if (errors.length) return setErrorMsg(errors[0][0]);
    }

    const result = await submitAction(data);

    if (!result.isSuccess) {
      reset();
      setErrorMsg(result.message);
    } else {
      setLocalStorageValue({
        [LocalStorage.Token]: result.token,
        [LocalStorage.RefreshToken]: result.refreshToken,
      });
      router.push(AdminRoute.Product);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="login__form">
        <Snackbar
          open={!!errorMsg}
          autoHideDuration={5000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={(e) => setErrorMsg("")}
          style={{
            position: "absolute",
            top: "-15vh",
          }}
        >
          <Alert
            severity="error"
            style={{
              textTransform: "uppercase",
              fontWeight: "700",
              width: "300px",
              background: "red",
            }}
          >
            {errorMsg}
          </Alert>
        </Snackbar>
        <Image
          src="/logo.png"
          alt="logo"
          priority
          quality={100}
          width="400"
          height="0"
          sizes="100vw"
          className="object-cover"
        />
        <label>Email</label>
        <input type="email" required placeholder="Email của bạn" {...register(ILoginFormKeys.Email)} />
        <label>Mật Khẩu</label>
        <input type="password" required placeholder="Mật khẩu của bạn" {...register(ILoginFormKeys.Password)} />
        <button disabled={isSubmitting}>Đăng Nhập</button>
      </form>
    </>
  );
}
