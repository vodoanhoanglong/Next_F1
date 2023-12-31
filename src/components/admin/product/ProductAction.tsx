"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Button,
  Chip,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  SelectedItems,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";
import { IconStyle, ModalCustom } from "..";
import { ICategoryData, IMasterData, IProductData } from "../..";
import { AuthContext } from "../../../contexts";
import {
  EditorFormat,
  EditorModule,
  LocalStorage,
  ReactQuillDynamic,
  numberWithCharacter,
  throwSafeError,
} from "../../../shared";
import { initialValue } from "./AdminProduct";
import { submitProductAction, updateProductAction } from "./action";
import {
  IProductFormKeys,
  ISchemaSubmitProductForm,
  SchemaOptionalProductForm,
  SchemaSubmitProductForm,
} from "./schema";

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

const IconDefaultObject = {
  [IconDefault]: true,
} as Record<string, boolean>;

export default function ProductAction({
  isOpen,
  categories,
  brand,
  actionData,
  onClose,
  setReFetch,
  setActionData,
}: {
  isOpen: boolean;
  categories: ICategoryData[];
  brand: IMasterData[];
  actionData: IProductData;
  onClose: () => void;
  setReFetch: React.Dispatch<React.SetStateAction<number>>;
  setActionData: React.Dispatch<React.SetStateAction<IProductData>>;
}) {
  const initialImages = [...actionData.images, IconDefault];
  const initialDetailContent = {
    html: actionData.htmlContent,
    length: actionData.htmlContent.length,
  };
  const initialPrice = actionData.price;

  const [images, setImages] = React.useState<string[]>([IconDefault]);
  const [detailContent, setDetailContent] = React.useState<{ html: string; length: number }>({
    html: "",
    length: 0,
  });
  const [price, setPrice] = React.useState(0);

  const { localStorageValue } = useContext(AuthContext);

  React.useEffect(() => {
    if (actionData.id) {
      setPrice(initialPrice);
      setImages(initialImages);
      setDetailContent(initialDetailContent);
    } else closeAction();
  }, [actionData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ISchemaSubmitProductForm>({
    mode: "onSubmit",
    resolver: zodResolver(SchemaOptionalProductForm),
  });

  const closeAction = () => {
    if (actionData.id) setActionData(initialValue);
    setPrice(0);
    setDetailContent({
      html: "",
      length: 0,
    });
    reset();
    setImages([IconDefault]);
    return onClose();
  };

  const onSubmit: SubmitHandler<ISchemaSubmitProductForm> = async (data) => {
    try {
      data[IProductFormKeys.HtmlContent] = detailContent.length ? detailContent.html : "";
      data[IProductFormKeys.Price] = price;
      data[IProductFormKeys.Images] = images.slice(0, images.length - 1);

      const validated = SchemaSubmitProductForm.safeParse(data);

      if (!validated.success) {
        const errors = Object.values(validated.error.flatten().fieldErrors);
        if (errors.length) return toast.error(errors[0][0]);
      }

      if (actionData.id) {
        const res = await updateProductAction(data, actionData.id, localStorageValue[LocalStorage.Token]);
        if (!res) toast.error("Đã có lỗi xảy ra");
        else toast.success("Cập nhật sản phẩm thành công");
      } else {
        const res = await submitProductAction(data, localStorageValue[LocalStorage.Token]);
        if (!res) toast.error("Đã có lỗi xảy ra");
        else toast.success("Tạo sản phẩm thành công");
      }

      closeAction();
      return setReFetch((oldValue) => ++oldValue);
    } catch (error) {
      toast.error(throwSafeError(error).message);
    }
  };

  return (
    <ModalCustom isOpen={isOpen} onClose={() => closeAction()}>
      <ModalHeader className="flex flex-col gap-1 relative">
        <h1>{actionData.id ? "Cập nhật sản phẩm" : "Tạo mới sản phẩm"}</h1>
      </ModalHeader>
      <ModalBody
        style={{
          paddingRight: 0,
        }}
      >
        <form
          id="submit-product-form"
          className="grid grid-cols-4 gap-10 overflow-y-scroll pr-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Select
            className="col-span-2"
            label={`Danh Mục`}
            placeholder="Chọn danh mục"
            defaultSelectedKeys={[actionData.categoryId]}
            items={categories}
            renderValue={(items: SelectedItems<ICategoryData>) => (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip
                    key={item.key}
                    startContent={
                      <Image src={item.data?.icon as string} quality={100} width="18" height="0" alt="icon" />
                    }
                  >
                    {item.data?.name}
                  </Chip>
                ))}
              </div>
            )}
            {...register(IProductFormKeys.CategoryId)}
          >
            {(category) => (
              <SelectItem key={category.id} value={category.id} textValue={category.name}>
                <div className="flex gap-2 items-center">
                  <Avatar alt={category.icon} className="flex-shrink-0" size="sm" src={category.icon} />
                  <span className="text-medium">{category.name}</span>
                </div>
              </SelectItem>
            )}
          </Select>

          <Select
            className="col-span-2"
            defaultSelectedKeys={[actionData.brandId]}
            {...register(IProductFormKeys.BrandId)}
            label={`Thương hiệu`}
            placeholder="Chọn thương hiệu"
          >
            {brand.map((item) => (
              <SelectItem key={item.id} value={item.id} textValue={item.data}>
                <p className="text-medium">{item.data}</p>
              </SelectItem>
            ))}
          </Select>

          <Input
            className="col-span-2"
            {...register(IProductFormKeys.Name)}
            isClearable
            radius="md"
            classNames={InputCommonStyle}
            defaultValue={actionData.name}
            label="Tên sản phẩm"
          />

          <Input
            className="col-span-2"
            {...register(IProductFormKeys.Code)}
            isClearable
            radius="md"
            classNames={InputCommonStyle}
            defaultValue={actionData.code}
            label="Mã CAS"
          />

          <Input
            className="col-span-1"
            {...register(IProductFormKeys.Price)}
            isClearable
            radius="md"
            value={price ? numberWithCharacter(price) : ""}
            onChange={(e) => setPrice(Number(e.target.value.split(".").join("")))}
            classNames={InputCommonStyle}
            label="Giá sản phẩm"
            onClear={() => setPrice(0)}
          />

          <Input
            className="col-span-3"
            {...register(IProductFormKeys.Description)}
            isClearable
            radius="md"
            classNames={InputCommonStyle}
            defaultValue={actionData.description}
            label="Mô tả sản phẩm"
          />

          <h2 className="col-span-full">Hình ảnh sản phẩm</h2>

          {images.map((item, index) =>
            IconDefaultObject[item] ? (
              <label key={index} htmlFor={`file_${index}`} className="admin__product-action__add-upload">
                <Image alt="product_image" src={item} width={70} height={0} priority quality={100} objectFit="cover" />
                <Input
                  className="invisible h-0 w-0"
                  id={`file_${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (FileReader && e.target.files?.length) {
                      const fr = new FileReader();
                      fr.onload = () =>
                        setImages((oldImages) => [
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
              <label key={index} className="admin__product-action__add-uploaded">
                <Image alt="product_image" src={item} width={0} height={0} sizes="100vw" priority quality={100} />
                <button
                  className="admin__product-action__add-uploaded__close"
                  onClick={(e) =>
                    setImages((oldImages) => {
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
                <input type="text" value={item} {...register(IProductFormKeys.Images)} className="invisible" />
              </label>
            ),
          )}

          <h2 className="col-span-full">Mô tả chi tiết sản phẩm</h2>

          {/* NOTE: After clear all content value still contain sometime html tags */}
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
        <Button color="danger" variant="light" onPress={() => closeAction()}>
          Huỷ
        </Button>
        <Button
          disabled={isSubmitting}
          color="primary"
          type="submit"
          form="submit-product-form"
          className="admin__product-action__button"
        >
          Lưu
        </Button>
      </ModalFooter>
    </ModalCustom>
  );
}
