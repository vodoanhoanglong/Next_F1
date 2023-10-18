"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import submitAction from "./action";
import { IContactFormKeys, ISchemaContactForm, SchemaContactForm } from "./schema";

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
        {errors[IContactFormKeys.FullName] ? (
          <span className="error">{errors[IContactFormKeys.FullName].message}</span>
        ) : (
          "Họ và tên *"
        )}
      </h3>
      <input
        className="contact__form-fullName"
        type="text"
        placeholder="Tien Hung"
        {...register(IContactFormKeys.FullName)}
      />
      <div className="contact__form-divide">
        <div>
          <h3>
            {errors[IContactFormKeys.Email] ? (
              <span className="error">{errors[IContactFormKeys.Email].message}</span>
            ) : (
              "Email *"
            )}
          </h3>
          <input
            className="contact__form-email"
            type="email"
            placeholder="example@gmail.com"
            {...register(IContactFormKeys.Email)}
          />
        </div>

        <div>
          <h3>
            {errors[IContactFormKeys.PhoneNumber] ? (
              <span className="error">{errors[IContactFormKeys.PhoneNumber].message}</span>
            ) : (
              "Số điện thoại *"
            )}
          </h3>
          <input
            className="contact__form-phone"
            type="text"
            placeholder="0932509283"
            {...register(IContactFormKeys.PhoneNumber)}
          />
        </div>
      </div>
      <div className="contact__form-msg">
        <h3>
          {errors[IContactFormKeys.Message] ? (
            <span className="error">{errors[IContactFormKeys.Message].message}</span>
          ) : (
            "Thông điệp của bạn cho chúng tôi *"
          )}
        </h3>
        <textarea
          rows={4}
          cols={50}
          placeholder="Chúng tôi có thể giúp gì cho bạn"
          {...register(IContactFormKeys.Message)}
        />
      </div>
      <div className="mt-5 flex justify-center">
        <button>Gửi đi</button>
      </div>
    </form>
  );
}
