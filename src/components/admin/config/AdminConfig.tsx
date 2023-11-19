"use client";

import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { GrClose } from "react-icons/gr";
import { ToastContainer } from "react-toastify";
import { IconStyle } from "../..";
import { AuthContext } from "../../../contexts";
import { getDataConfigAction } from "./action";

const IconDefault = "/upload.png";
const IconDefaultObject = {
  [IconDefault]: true,
} as Record<string, boolean>;

export default function AdminConfig() {
  const { localStorageValue } = React.useContext(AuthContext);

  const [slider, setSlider] = React.useState<string[]>([]);

  React.useEffect(() => {
    getDataConfigAction().then((res) => {
      setSlider([...JSON.parse(res.slider[0].data), IconDefault]);
    });
  }, []);

  return (
    <div className="admin__config">
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
      <div className="admin__config-view">
        <h1>Cuộn hình ảnh</h1>
        <div className="admin__config-view__slider">
          <div className="admin__config-view__slider-action">
            <Button color="secondary">Lưu</Button>
          </div>
          <div className="admin__config-view__slider-list">
            {slider.map((item, index) =>
              IconDefaultObject[item] ? (
                <label key={index} htmlFor={`file_${index}`} className="admin__config-view__slider-list__add-upload">
                  <Image alt="config_image" src={item} width={70} height={0} priority quality={100} objectFit="cover" />
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
                  <Image alt="product_image" src={item} width={0} height={0} sizes="100vw" priority quality={100} />
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
                  {/* <input type="text" value={item} {...register(IProductFormKeys.Images)} className="invisible" /> */}
                </label>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
