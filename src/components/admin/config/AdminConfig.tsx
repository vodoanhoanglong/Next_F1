"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import { IconStyle } from "../..";
import { AuthContext } from "../../../contexts";
import { LocalStorage, throwSafeError } from "../../../shared";
import { getDataConfigAction, updateConfigAction } from "./action";
import { IConfigFormKeys, ISchemaSubmitConfigForm, SchemaOptionalConfigForm, SchemaSubmitConfigForm } from "./schema";

const IconDefault = "/upload.png";
const IconDefaultObject = {
  [IconDefault]: true,
} as Record<string, boolean>;

export default function AdminConfig() {
  const { localStorageValue } = React.useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ISchemaSubmitConfigForm>({
    mode: "onSubmit",
    resolver: zodResolver(SchemaOptionalConfigForm),
  });

  const [slider, setSlider] = React.useState<string[]>([]);
  const [partner, setPartner] = React.useState<string[]>([]);

  React.useEffect(() => {
    getDataConfigAction().then((res) => {
      setSlider([...res.banner, IconDefault]);
      setPartner([...res.partner, IconDefault]);
    });
  }, []);

  const onSubmit: SubmitHandler<ISchemaSubmitConfigForm> = async (data) => {
    try {
      data[IConfigFormKeys.Banner] = slider.slice(0, slider.length - 1);
      data[IConfigFormKeys.Partner] = partner.slice(0, partner.length - 1);

      const validated = SchemaSubmitConfigForm.safeParse(data);

      if (!validated.success) {
        const errors = Object.values(validated.error.flatten().fieldErrors);
        if (errors.length) return toast.error(errors[0][0]);
      }

      await updateConfigAction(data, localStorageValue[LocalStorage.Token]);
      toast.success("Cập nhật cấu hình thành công");
    } catch (error) {
      toast.error(throwSafeError(error).message);
    }
  };

  return (
    <>
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
      <form className="admin__config" id="submit-config-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="admin__config-view">
          <div className="admin__config-view__action">
            <Button color="secondary" form="submit-config-form" type="submit" disabled={isSubmitting}>
              Lưu
            </Button>
          </div>
          <h1>Cuộn hình ảnh</h1>
          <br />
          <div className="admin__config-view__slider">
            <div className="admin__config-view__slider-list">
              {slider.map((item, index) =>
                IconDefaultObject[item] ? (
                  <label key={index} htmlFor={`file_${index}`} className="admin__config-view__slider-list__add-upload">
                    <Image
                      alt="config_image"
                      src={item}
                      width={70}
                      height={0}
                      priority
                      quality={100}
                      objectFit="cover"
                    />
                    <Input
                      className="invisible h-0 w-0"
                      id={`file_${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (FileReader && e.target.files?.length) {
                          const fr = new FileReader();
                          fr.onload = () =>
                            setSlider((oldImages) => [
                              ...oldImages.slice(0, oldImages.length - 1),
                              fr.result as string,
                              oldImages[oldImages.length - 1],
                            ]);
                          fr.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                ) : (
                  <label key={index} className="admin__config-view__slider-list__add-uploaded">
                    <Image alt="config_image" src={item} width={0} height={0} sizes="100vw" priority quality={100} />
                    <button
                      className="admin__config-view__slider-list__add-uploaded__close"
                      onClick={(e) =>
                        setSlider((oldImages) => {
                          e.preventDefault();
                          oldImages.splice(index, 1);
                          return [...oldImages];
                        })
                      }
                    >
                      <IconStyle
                        style={{
                          style: {
                            fontWeight: "bolder",
                            fontSize: "12px",
                          },
                        }}
                      >
                        <GrClose />
                      </IconStyle>
                    </button>
                    <input type="text" value={item} {...register(IConfigFormKeys.Banner)} className="invisible" />
                  </label>
                ),
              )}
            </div>
          </div>
          <br />
          <h1>Logo đối tác</h1>
          <br />
          <div className="admin__config-view__partner">
            <div className="admin__config-view__partner-list">
              {partner.map((item, index) =>
                IconDefaultObject[item] ? (
                  <label key={index} htmlFor={`file_${index}`} className="admin__config-view__partner-list__add-upload">
                    <Image
                      alt="config_image"
                      src={item}
                      width={70}
                      height={0}
                      priority
                      quality={100}
                      objectFit="cover"
                    />
                    <Input
                      className="invisible h-0 w-0"
                      id={`file_${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (FileReader && e.target.files?.length) {
                          const fr = new FileReader();
                          fr.onload = () =>
                            setPartner((oldImages) => [
                              ...oldImages.slice(0, oldImages.length - 1),
                              fr.result as string,
                              oldImages[oldImages.length - 1],
                            ]);
                          fr.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                ) : (
                  <label key={index} className="admin__config-view__partner-list__add-uploaded">
                    <Image alt="config_image" src={item} width={0} height={0} sizes="100vw" priority quality={100} />
                    <button
                      className="admin__config-view__partner-list__add-uploaded__close"
                      onClick={(e) =>
                        setPartner((oldImages) => {
                          e.preventDefault();
                          oldImages.splice(index, 1);
                          return [...oldImages];
                        })
                      }
                    >
                      <IconStyle
                        style={{
                          style: {
                            fontWeight: "bolder",
                            fontSize: "12px",
                          },
                        }}
                      >
                        <GrClose />
                      </IconStyle>
                    </button>
                    <input type="text" value={item} {...register(IConfigFormKeys.Partner)} className="invisible" />
                  </label>
                ),
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
