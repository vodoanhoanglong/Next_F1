"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import React from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import submitAction from "./action";
import { FormValues, IFormKeys, SchemaContactForm } from "./schema";

export default function ContactForm() {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(SchemaContactForm) as Resolver<FormValues, any>,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await submitAction(data);

    setOpen(true);
    reset();
  };

  return (
    <form className="contact__form" onSubmit={handleSubmit(onSubmit)}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={(e) => setOpen(false)}
        sx={{ marginTop: "100px" }}
      >
        <Alert severity="success" sx={{ width: "100%", textTransform: "uppercase", fontWeight: "700" }}>
          Cảm ơn bạn đã liên hệ với chúng tôi !!!
        </Alert>
      </Snackbar>
      <h3>
        {errors[IFormKeys.FullName] ? (
          <span className="error">{errors[IFormKeys.FullName].message}</span>
        ) : (
          "Họ và tên *"
        )}
      </h3>
      <input className="contact__form-fullName" type="text" placeholder="Tien Hung" {...register(IFormKeys.FullName)} />
      <div className="contact__form-divide">
        <div>
          <h3>
            {errors[IFormKeys.Email] ? <span className="error">{errors[IFormKeys.Email].message}</span> : "Email *"}
          </h3>
          <input
            className="contact__form-email"
            type="email"
            placeholder="example@gmail.com"
            {...register(IFormKeys.Email)}
          />
        </div>

        <div>
          <h3>
            {errors[IFormKeys.PhoneNumber] ? (
              <span className="error">{errors[IFormKeys.PhoneNumber].message}</span>
            ) : (
              "Số điện thoại *"
            )}
          </h3>
          <input
            className="contact__form-phone"
            type="text"
            placeholder="0932509283"
            {...register(IFormKeys.PhoneNumber)}
          />
        </div>
      </div>
      <div className="contact__form-msg">
        <h3>
          {errors[IFormKeys.Message] ? (
            <span className="error">{errors[IFormKeys.Message].message}</span>
          ) : (
            "Thông điệp của bạn cho chúng tôi *"
          )}
        </h3>
        <textarea rows={4} cols={50} placeholder="Chúng tôi có thể giúp gì cho bạn" {...register(IFormKeys.Message)} />
      </div>
      <div className="mt-5 flex justify-center">
        <button>Gửi đi</button>
      </div>
    </form>
  );
}
