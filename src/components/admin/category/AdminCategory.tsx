"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, ModalBody, ModalFooter, ModalHeader, Textarea, User, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { VscAdd } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import { ICategoryData, IconStyle, ModalCustom } from "../..";
import { AuthContext } from "../../../contexts";
import { LocalStorage, SortOrder, StatusCode, throwSafeError } from "../../../shared";
import { SearchIcon, TableAction, TableCommonHeader, TableCustom, TableSchemaParam } from "../table";
import { deleteCategoryAction, getDataCategoryAction, submitCategoryAction, updateCategoryAction } from "./action";
import { IFormKeys, ISchemaSubmitCategoryForm, SchemaOptionalCategoryForm, SchemaSubmitCategoryForm } from "./schema";

interface IData {
  categories: ICategoryData[];
  totalCategories: number;
}

const CategoryTableHeader: TableCommonHeader<ICategoryData>[] = [
  { label: "Tên danh mục", key: "name", align: "start" },
  { label: "Mã danh mục", key: "code", align: "start" },
  { label: "Logo danh mục", key: "icon", align: "center" },
  { label: "Thao tác", key: "actions", align: "center" },
];

const CategoryTableCustom = {
  name: (param) => (
    <User
      avatarProps={{ size: "lg", radius: "md", src: param.data.image }}
      name={param.data.name}
      classNames={{
        name: ["text-bold text-medium"],
        description: ["text-bold text-sm"],
      }}
    >
      {param.data.name}
    </User>
  ),
  code: (param) => <p className="text-bold text-medium">{param.data.code}</p>,
  icon: (param) => <Image src={param.data.icon} quality={100} width="32" height="0" alt="icon" />,
  actions: (param) => <TableAction {...param} />,
} as TableSchemaParam<ICategoryData>;

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

const initialValue = {
  code: "",
  name: "",
  description: "",
  image: "",
  icon: "",
} as ICategoryData;

export default function AdminCategory() {
  const { localStorageValue } = React.useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);

  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [reFetch, setRefetch] = React.useState(0);
  const [actionData, setActionData] = React.useState<ICategoryData>(initialValue);
  const [image, setImage] = React.useState({
    banner: actionData.image,
    logo: actionData.icon,
  });

  const [data, setData] = React.useState<IData>({
    categories: [],
    totalCategories: 0,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ISchemaSubmitCategoryForm>({
    mode: "onSubmit",
    resolver: zodResolver(SchemaOptionalCategoryForm),
  });

  React.useEffect(() => {
    setLoading(true);

    getDataCategoryAction({
      page,
      sortOrder: SortOrder.Descending,
      sortBy: "updatedAt",
      search,
      ...localStorageValue,
    }).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [page, search, reFetch]);

  React.useEffect(() => {
    if (actionData.id)
      setImage({
        banner: actionData.image,
        logo: actionData.icon,
      });
    else closeAction();
  }, [actionData]);

  const closeAction = () => {
    if (actionData.id) setActionData(initialValue);
    if (openDelete) setOpenDelete(false);

    setImage({
      logo: "",
      banner: "",
    });

    reset();
    return onClose();
  };

  const onSubmit: SubmitHandler<ISchemaSubmitCategoryForm> = async (data) => {
    try {
      data[IFormKeys.Icon] = image.logo;
      data[IFormKeys.Image] = image.banner;

      const validated = SchemaSubmitCategoryForm.safeParse(data);

      if (!validated.success) {
        const errors = Object.values(validated.error.flatten().fieldErrors);
        if (errors.length) return toast.error(errors[0][0]);
      }

      if (actionData.id) {
        const res = await updateCategoryAction(data, actionData.id, localStorageValue[LocalStorage.Token]);
        if (!res) toast.error("Đã có lỗi xảy ra");
        else toast.success("Cập nhật danh mục thành công");
      } else {
        const res = await submitCategoryAction(data, localStorageValue[LocalStorage.Token]);
        if (!res) toast.error("Đã có lỗi xảy ra");
        else toast.success("Tạo danh mục thành công");
      }

      closeAction();
      return setRefetch((oldValue) => ++oldValue);
    } catch (error) {
      toast.error(throwSafeError(error).message);
    }
  };

  const submitDeleteCategory = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      e.preventDefault();
      const result = await deleteCategoryAction(
        { code: `DELETED_${new Date().getTime()}_${actionData.code}`, status: StatusCode.Deleted },
        actionData.id,
        localStorageValue[LocalStorage.Token],
      );

      if (!result) toast.error("Đã có lỗi xảy ra");
      else {
        closeAction();

        // Set sate inside set state to prevent duplicate re-render
        return setRefetch((oldValue) => {
          setOpenDelete(false);
          toast.success("Xoá danh mục thành công");
          return ++oldValue;
        });
      }
    } catch (error) {
      return toast.error(throwSafeError(error).message);
    }
  };

  let searchValue = "";

  return (
    <div className="admin__category">
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
      <div className="admin__category-action">
        <div className="admin__category-action__filter">
          <Input
            isClearable
            onKeyDown={(e) => e.key === "Enter" && setSearch(searchValue)}
            onChange={(e) => {
              searchValue = e.target.value;
            }}
            radius="md"
            classNames={{
              base: ["w-[600px]"],
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
            }}
            placeholder="Tìm kiếm..."
            startContent={
              <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        <div className="admin__category-action__add">
          <Button
            color="secondary"
            endContent={
              <div className="font-extrabold text-large">
                <VscAdd />
              </div>
            }
            onPress={(e) => {
              setActionData(initialValue);
              return onOpen();
            }}
          >
            Thêm mới
          </Button>
        </div>
      </div>
      <div className="admin__category-table">
        <TableCustom
          setOpenView={setOpenView}
          setOpenDelete={setOpenDelete}
          onOpen={onOpen}
          page={page}
          setPage={setPage}
          setActionData={setActionData}
          data={data.categories}
          total={data.totalCategories}
          tableCustom={CategoryTableCustom}
          headers={CategoryTableHeader}
          isLoading={loading}
        />
      </div>

      {/* Action Create + Update */}
      <ModalCustom isOpen={isOpen} onClose={() => closeAction()}>
        <ModalHeader className="flex flex-col gap-1 relative">
          <h1>{actionData.id ? "Cập nhật danh mục" : "Tạo mới danh mục"}</h1>
        </ModalHeader>
        <ModalBody
          style={{
            paddingRight: 0,
          }}
        >
          <form
            id="submit-category-form"
            className="grid grid-cols-4 gap-10 overflow-y-scroll pr-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Input
              className="col-span-2"
              {...register(IFormKeys.Name)}
              isClearable
              radius="md"
              classNames={InputCommonStyle}
              defaultValue={actionData.name}
              label="Tên danh mục"
            />

            <Input
              className="col-span-2"
              {...register(IFormKeys.Code)}
              isClearable
              radius="md"
              classNames={InputCommonStyle}
              defaultValue={actionData.code}
              label="Mã danh mục"
            />

            <h2 className="col-span-2">Hình ảnh danh mục</h2>
            <h2 className="col-span-2">Logo danh mục</h2>

            {image.banner ? (
              <label className="admin__category-action__add-uploaded col-span-1">
                <Image
                  alt="category_image"
                  src={image.banner}
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority
                  quality={100}
                />
                <button
                  className="admin__category-action__add-uploaded__close"
                  onClick={(e) => {
                    e.preventDefault();
                    return setImage((oldImage) => ({
                      logo: oldImage.logo,
                      banner: "",
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
                <input type="text" value={image.banner} {...register(IFormKeys.Image)} className="invisible" />
              </label>
            ) : (
              <label htmlFor={`banner`} className="admin__category-action__add-upload col-span-1">
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
                        setImage((oldImage) => ({
                          logo: oldImage.logo,
                          banner: fr.result as string,
                        }));

                      fr.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </label>
            )}

            {image.logo ? (
              <label className="admin__category-action__add-uploaded col-span-1 col-start-3">
                <Image
                  alt="category_image"
                  src={image.logo}
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority
                  quality={100}
                />
                <button
                  className="admin__category-action__add-uploaded__close"
                  onClick={(e) => {
                    e.preventDefault();
                    return setImage((oldImage) => ({
                      logo: "",
                      banner: oldImage.banner,
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
                <input type="text" value={image.logo} {...register(IFormKeys.Icon)} className="invisible" />
              </label>
            ) : (
              <label htmlFor={`logo`} className="admin__category-action__add-upload col-span-1 col-start-3">
                <Image alt="logo" src={IconDefault} width={70} height={0} priority quality={100} objectFit="cover" />
                <Input
                  className="invisible h-0 w-0"
                  id={`logo`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (FileReader && e.target.files?.length) {
                      const fr = new FileReader();
                      fr.onload = () =>
                        setImage((oldImage) => ({
                          logo: fr.result as string,
                          banner: oldImage.banner,
                        }));

                      fr.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </label>
            )}

            <Textarea
              labelPlacement="outside"
              placeholder="Mô tả danh mục"
              className="col-span-full"
              defaultValue={actionData.description}
              classNames={InputCommonStyle}
              {...register(IFormKeys.Description)}
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
            form="submit-category-form"
            className="admin__category-action__button"
          >
            Lưu
          </Button>
        </ModalFooter>
      </ModalCustom>

      {/* Action confirm deleted */}
      <ModalCustom isOpen={openDelete} onClose={() => closeAction()}>
        <ModalHeader>
          <h1>Xoá danh mục</h1>
        </ModalHeader>
        <ModalBody>
          <h2 className="w-full text-center">
            <b>Bạn có chắc muốn xoá danh mục này?</b>
          </h2>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={(e) => closeAction()}>
            Huỷ
          </Button>
          <Button color="danger" onClick={submitDeleteCategory}>
            Xoá
          </Button>
        </ModalFooter>
      </ModalCustom>

      {/* Action view */}
      <ModalCustom
        isOpen={openView}
        onClose={() => {
          setActionData(initialValue);
          return setOpenView(false);
        }}
      >
        <ModalHeader>
          <h1>Chi tiết danh mục</h1>
        </ModalHeader>
        <ModalBody>
          <div className="admin__category-detail">
            <div className="admin__category-detail__banner">
              <Image src={actionData.image} alt={`banner`} priority quality={100} height="0" width="0" sizes="100vw" />
            </div>
            <div className="admin__category-detail__content">
              <div className="flex items-center gap-3 mt-5 mb-5">
                <Image src={actionData.icon} alt="icon" priority quality={100} width="32" height="0" />
                <h1>{actionData.name}</h1>
              </div>
              <p>
                - Mã danh mục: <b>{actionData.code}</b>
              </p>
              <p>
                - Mô tả nhanh: <b>{actionData.description}</b>
              </p>
            </div>
          </div>
        </ModalBody>
      </ModalCustom>
    </div>
  );
}
