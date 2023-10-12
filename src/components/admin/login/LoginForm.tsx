"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AdminRoute, LocalStorage } from "../../../shared";
import submitAction from "./action";
import { IFormKeys, ISchemaLoginForm, SchemaLoginForm } from "./schema";

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = React.useState("");
  const router = useRouter();

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
      if (window) {
        localStorage.setItem(LocalStorage.Token, result.token);
        localStorage.setItem(LocalStorage.RefreshToken, result.refreshToken);
        router.push(AdminRoute.Product);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <input type="email" required placeholder="Email của bạn" {...register(IFormKeys.Email)} />
      <label>Mật Khẩu</label>
      <input type="password" required placeholder="Mật khẩu của bạn" {...register(IFormKeys.Password)} />
      <button disabled={isSubmitting}>Đăng Nhập</button>
    </form>
  );
}
