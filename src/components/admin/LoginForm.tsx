"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import Image from "next/image";
import React from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import submitAction from "./action";
import { FormValues, IFormKeys, SchemaLoginForm } from "./schema";

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = React.useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
    resolver: yupResolver(SchemaLoginForm) as Resolver<FormValues, any>,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const errorValidate = errors[IFormKeys.Email] || errors[IFormKeys.Password];
    if (errorValidate) {
      reset();
      setErrorMsg(errorValidate.message as string);
      return;
    }

    const result = await submitAction(data);

    if (!result.isSuccess) {
      reset();
      setErrorMsg(result.message);
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
        sx={{ marginTop: "100px" }}
      >
        <Alert severity="error" sx={{ width: "100%", textTransform: "uppercase", fontWeight: "700" }}>
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
      <input type="text" placeholder="Email của bạn" {...register(IFormKeys.Email)} />

      <label>Mật Khẩu</label>
      <input type="password" placeholder="Mật khẩu của bạn" {...register(IFormKeys.Password)} />

      <button>Đăng Nhập</button>
    </form>
  );
}
