"use client";

import { Button, ModalBody, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import { IMasterData, ModalCustom, Slider } from "../..";
import { AuthContext } from "../../../contexts";
import { getDataConfigAction } from "./action";

export default function AdminConfig() {
  const { localStorageValue } = React.useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [slider, setSlider] = React.useState<IMasterData[]>([]);

  const closeAction = () => {
    if (slider.length) setSlider([]);

    return onClose();
  };

  React.useEffect(() => {
    getDataConfigAction().then((res) => {
      setSlider(res.slider);
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
            <Button
              color="secondary"
              endContent={
                <div className="font-extrabold text-large">
                  <FiEdit2 />
                </div>
              }
              onPress={(e) => {
                return onOpen();
              }}
            >
              Chỉnh sửa
            </Button>
          </div>
          <div className="admin__config-view__slider-list">{slider.length ? <Slider images={slider} /> : null}</div>
        </div>
      </div>

      <ModalCustom isOpen={isOpen} onClose={closeAction}>
        <ModalHeader className="flex flex-col gap-1 relative">
          <h1>Chỉnh sửa hình ảnh</h1>
        </ModalHeader>
        <ModalBody
          style={{
            paddingRight: 0,
          }}
        ></ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={closeAction}>
            Huỷ
          </Button>
          <Button
            // disabled={isSubmitting}
            color="primary"
            type="submit"
            form="submit-category-form"
            className="admin__category-action__button"
          >
            Lưu
          </Button>
        </ModalFooter>
      </ModalCustom>
    </div>
  );
}
