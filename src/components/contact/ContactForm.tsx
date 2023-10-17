"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import submitAction from "./action";
import { IFormKeys, ISchemaContactForm, SchemaContactForm } from "./schema";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISchemaContactForm>({
    mode: "onChange",
    resolver: zodResolver(SchemaContactForm),
  });

  const onSubmit: SubmitHandler<ISchemaContactForm> = async (data) => {
    const validated = SchemaContactForm.safeParse(data);

    if (!validated.success) {
      const errors = Object.values(validated.error.flatten().fieldErrors);
      if (errors.length) return toast.error(errors[0][0]);
    }

    await submitAction(data);
    toast.success("Cảm ơn bạn đã liên hệ, chúng tôi sẽ sớm liên lạc với bạn");
    reset();
  };

  return (
    <form className="contact__form" onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer
        position="top-right"
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
