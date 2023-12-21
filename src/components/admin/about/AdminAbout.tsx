"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, ModalBody, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import { GrClose } from "react-icons/gr";

import { ToastContainer, toast } from "react-toastify";
import {
  About,
  IAboutFormKeys,
  IIntroduction,
  IMasterData,
  ISchemaSubmitAboutForm,
  IconStyle,
  ModalCustom,
  SchemaOptionalAboutForm,
  SchemaSubmitAboutForm,
} from "../..";
import { AuthContext } from "../../../contexts";
import { EditorFormat, EditorModule, LocalStorage, ReactQuillDynamic, throwSafeError } from "../../../shared";
import { getDataAboutAction, updateAboutAction } from "./action";

const InputCommonStyle = {
  label: "text-black/50 dark:text-white/90",
  input: [
    "bg-transparent",
    "text-black/90 dark:text-white/90",
    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
  ],
  innerWrapper: "bg-transparent",
  inputWrapper: [
    "h-[48px]",
    "bg-default-200/50",
    "dark:bg-default/60",
    "backdrop-blur-xl",
    "backdrop-saturate-200",
    "hover:bg-default-200/70",
    "dark:hover:bg-default/70",
    "group-data-[focused=true]:bg-default-200/50",
    "dark:group-data-[focused=true]:bg-default/60",
    "!cursor-text",
  ],
};

const IconDefault = "/upload.png";

export default function AdminAbout() {
  const { localStorageValue } = React.useContext(AuthContext);
  const [data, setData] = React.useState({
    introduction: {} as IMasterData,
    parseData: {} as IIntroduction,
  });
  const [images, setImages] = React.useState({
    left: "",
    center: "",
    right: "",
  });
  const [detailContent, setDetailContent] = React.useState<{ html: string; length: number }>({
    html: "",
    length: 0,
  });
  const [reFetch, setRefetch] = React.useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ISchemaSubmitAboutForm>({
    mode: "onSubmit",
    resolver: zodResolver(SchemaOptionalAboutForm),
  });

  const closeAction = () => {
    reset();
    setDetailContent({
      html: "",
      length: 0,
    });
    return onClose();
  };

  React.useEffect(() => {
    getDataAboutAction().then((res) => {
      const parseData = JSON.parse(res.introduction.data) as IIntroduction;

      setData({
        introduction: res.introduction,
        parseData,
      });
      setDetailContent({
        html: res.introduction.additionalValue,
        length: res.introduction.additionalValue.length,
      });
      setImages({
        center: parseData.imageCenter,
        left: parseData.imageLeft,
        right: parseData.imageRight,
      });
    });
  }, [reFetch]);

  const onSubmit: SubmitHandler<ISchemaSubmitAboutForm> = async (data) => {
    try {
      data[IAboutFormKeys.DescriptionDetail] = detailContent.length ? detailContent.html : "";
      data[IAboutFormKeys.ImageLeft] = images.left;
      data[IAboutFormKeys.ImageCenter] = images.center;
      data[IAboutFormKeys.ImageRight] = images.right;

      const validated = SchemaSubmitAboutForm.safeParse(data);

      if (!validated.success) {
        const errors = Object.values(validated.error.flatten().fieldErrors);
        if (errors.length) return toast.error(errors[0][0]);
      }

      const res = await updateAboutAction(data, localStorageValue[LocalStorage.Token]);
      if (!res) toast.error("Đã có lỗi xảy ra");
      else toast.success("Cập nhật sản phẩm thành công");

      closeAction();
      return setRefetch((oldValue) => ++oldValue);
    } catch (error) {
      toast.error(throwSafeError(error).message);
    }
  };

  return (
    <div className="admin__about">
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
      <div className="admin__about-action">
        <Button
          color="secondary"
          endContent={
            <div className="font-extrabold text-large">
              <FiEdit2 />
            </div>
          }
          onClick={(e) => {
            reset();
            setDetailContent({
              html: data.introduction.additionalValue,
              length: data.introduction.additionalValue.length,
            });
            setImages({
              center: data.parseData.imageCenter,
              left: data.parseData.imageLeft,
              right: data.parseData.imageRight,
            });
            return onOpen();
          }}
        >
          Chỉnh sửa
        </Button>
      </div>
      <ModalCustom isOpen={isOpen} onClose={closeAction}>
        <ModalHeader className="flex flex-col gap-1 relative">
          <h1>Chỉnh sửa thông tin</h1>
        </ModalHeader>
        <ModalBody
          style={{
            paddingRight: 0,
          }}
        >
          <form
            id="submit-about-form"
            className="grid grid-cols-4 gap-10 overflow-y-scroll pr-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Input
              className="col-span-full"
              {...register(IAboutFormKeys.Title)}
              isClearable
              radius="md"
              classNames={InputCommonStyle}
              defaultValue={data.parseData.title}
              label="Tiêu đề"
            />

            <Textarea
              {...register(IAboutFormKeys.Description)}
              labelPlacement="outside"
              placeholder="Mô tả ngắn"
              className="col-span-full"
              defaultValue={data.parseData.description}
              classNames={InputCommonStyle}
            />

            <h2 className="col-span-full">Hình ảnh</h2>

            {images.left ? (
              <label className="admin__about-uploaded col-span-1">
                <Image alt="about_image" src={images.left} width={0} height={0} sizes="100vw" priority quality={100} />
                <button
                  className="admin__about-uploaded__close"
                  onClick={(e) => {
                    e.preventDefault();
                    setImages((oldImage) => ({
                      center: oldImage.center,
                      right: oldImage.right,
                      left: "",
                    }));
                  }}
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
                <input type="text" value={images.left} {...register(IAboutFormKeys.ImageLeft)} className="invisible" />
              </label>
            ) : (
              <label htmlFor={`banner`} className="admin__about-upload col-span-1">
                <Image alt="banner" src={IconDefault} width={70} height={0} priority quality={100} objectFit="cover" />
                <Input
                  className="invisible h-0 w-0"
                  id={`banner`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (FileReader && e.target.files?.length) {
                      const fr = new FileReader();
                      fr.onload = () =>
                        setImages((oldImage) => ({
                          center: oldImage.center,
                          right: oldImage.right,
                          left: fr.result as string,
                        }));

                      fr.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </label>
            )}

            {images.center ? (
              <label className="admin__about-uploaded col-span-1">
                <Image
                  alt="about_image"
                  src={images.center}
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority
                  quality={100}
                />
                <button
                  className="admin__about-uploaded__close"
                  onClick={(e) => {
                    e.preventDefault();
                    setImages((oldImage) => ({
                      center: "",
                      right: oldImage.right,
                      left: oldImage.left,
                    }));
                  }}
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
                <input
                  type="text"
                  value={images.center}
                  {...register(IAboutFormKeys.ImageCenter)}
                  className="invisible"
                />
              </label>
            ) : (
              <label htmlFor={`banner`} className="admin__about-upload col-span-1">
                <Image alt="banner" src={IconDefault} width={70} height={0} priority quality={100} objectFit="cover" />
                <Input
                  className="invisible h-0 w-0"
                  id={`banner`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (FileReader && e.target.files?.length) {
                      const fr = new FileReader();
                      fr.onload = () =>
                        setImages((oldImage) => ({
                          center: fr.result as string,
                          right: oldImage.right,
                          left: oldImage.left,
                        }));

                      fr.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </label>
            )}

            {images.right ? (
              <label className="admin__about-uploaded col-span-1">
                <Image alt="about_image" src={images.right} width={0} height={0} sizes="100vw" priority quality={100} />
                <button
                  className="admin__about-uploaded__close"
                  onClick={(e) => {
                    e.preventDefault();
                    setImages((oldImage) => {
                      return {
                        center: oldImage.center,
                        right: "",
                        left: oldImage.left,
                      };
                    });
                  }}
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
                <input
                  type="text"
                  value={images.right}
                  {...register(IAboutFormKeys.ImageRight)}
                  className="invisible"
                />
              </label>
            ) : (
              <label htmlFor={`banner`} className="admin__about-upload col-span-1">
                <Image alt="banner" src={IconDefault} width={70} height={0} priority quality={100} objectFit="cover" />
                <Input
                  className="invisible h-0 w-0"
                  id={`banner`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (FileReader && e.target.files?.length) {
                      const fr = new FileReader();
                      fr.onload = () =>
                        setImages((oldImage) => ({
                          center: oldImage.center,
                          right: fr.result as string,
                          left: oldImage.left,
                        }));

                      fr.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </label>
            )}

            <h2 className="col-span-full">Mô tả chi tiết</h2>
            <ReactQuillDynamic
              className="col-span-full"
              value={detailContent.html}
              onChange={(_v, _d, _s, editor) =>
                setDetailContent({
                  html: editor.getHTML(),
                  length: editor.getText().trim().length,
                })
              }
              modules={EditorModule}
              formats={EditorFormat}
              theme="snow"
              placeholder="Viết gì đó..."
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={closeAction}>
            Huỷ
          </Button>
          <Button
            disabled={isSubmitting}
            color="primary"
            type="submit"
            form="submit-about-form"
            className="admin__about-button"
          >
            Lưu
          </Button>
        </ModalFooter>
      </ModalCustom>
      {data.parseData.title ? (
        <div className="admin__about-review">
          <About partner={[]} introduction={data.introduction} parseData={data.parseData} />
        </div>
      ) : null}
    </div>
  );
}
