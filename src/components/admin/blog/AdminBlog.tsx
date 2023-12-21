"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { VscAdd } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import { IBlogFormKeys, ISchemaSubmitBlogForm, SchemaOptionalBlogForm, SchemaSubmitBlogForm } from ".";
import { IconStyle, ModalCustom } from "..";
import { Blog, IBlogData, IMasterData } from "../..";
import { AuthContext } from "../../../contexts";
import {
  EditorFormat,
  EditorModule,
  LocalStorage,
  ReactQuillDynamic,
  blogLimit,
  throwSafeError,
} from "../../../shared";
import { getDataBlogAction, submitBlogAction, updateBlogAction } from "./action";

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

const initialData = {
  data: [],
  totalData: 0,
  tags: [],
};

const initialActionData = {
  id: "",
  banner: "",
  description: "",
  title: "",
  type: "",
  content: "",
  length: 0,
};

export default function AdminBlog() {
  const { localStorageValue } = React.useContext(AuthContext);
  const [listBlogs, setListBlogs] = React.useState<{
    data: IBlogData[];
    totalData: number;
    tags: IMasterData[];
  }>(initialData);
  const [actionData, setActionData] = React.useState(initialActionData);
  const [page, setPage] = React.useState(1);

  const [reFetch, setRefetch] = React.useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<ISchemaSubmitBlogForm>({
    mode: "onSubmit",
    resolver: zodResolver(SchemaOptionalBlogForm),
  });

  const closeAction = () => {
    if (actionData.id) setActionData(initialActionData);
    reset();
    setValue(IBlogFormKeys.Title, "");
    setValue(IBlogFormKeys.Description, "");

    return onClose();
  };

  React.useEffect(() => {
    getDataBlogAction(page).then((res) =>
      setListBlogs({
        data: res.blogs,
        totalData: res.totalBlog,
        tags: res.tags,
      }),
    );
  }, [page, reFetch]);

  const onSubmit: SubmitHandler<ISchemaSubmitBlogForm> = async (data) => {
    try {
      data[IBlogFormKeys.Content] = actionData.length ? actionData.content : "";
      data[IBlogFormKeys.Banner] = actionData.banner;

      const validated = SchemaSubmitBlogForm.safeParse(data);

      if (!validated.success) {
        const errors = Object.values(validated.error.flatten().fieldErrors);
        if (errors.length) return toast.error(errors[0][0]);
      }

      if (actionData.id) {
        const res = await updateBlogAction(data, actionData.id, localStorageValue[LocalStorage.Token]);
        if (!res) throw new Error("Đã có lỗi xảy ra");
        else toast.success("Cập nhật tin tức thành công");
      } else {
        const res = await submitBlogAction(data, localStorageValue[LocalStorage.Token]);

        if (!res) throw new Error("Đã có lỗi xảy ra");
        else toast.success("Thêm tin tức thành công");
      }

      closeAction();
      return setRefetch((oldValue) => ++oldValue);
    } catch (error) {
      toast.error(throwSafeError(error).message);
    }
  };

  return (
    <div className="admin__blog">
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
      <div className="admin__blog-action">
        <Button
          color="secondary"
          endContent={
            <div className="font-extrabold text-large">
              <VscAdd />
            </div>
          }
          onPress={(e) => {
            return onOpen();
          }}
        >
          Thêm mới
        </Button>
      </div>

      <div className="admin__blog-view">
        {listBlogs.data.length ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {listBlogs.data.map((blog) => (
              <div
                key={blog.id}
                onClick={(e) => {
                  e.preventDefault();
                  setActionData({
                    id: blog.id,
                    banner: blog.banner,
                    content: blog.content,
                    title: blog.title,
                    length: blog.content.length,
                    description: blog.description,
                    type: blog.typeId,
                  });

                  // Only 2 fields not bind data
                  setValue(IBlogFormKeys.Title, blog.title);
                  setValue(IBlogFormKeys.Description, blog.description);
                  return onOpen();
                }}
              >
                <Blog blog={blog} />
              </div>
            ))}
          </div>
        ) : null}
        {listBlogs.totalData ? (
          <div className="mt-10 flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={Math.ceil(listBlogs.totalData / blogLimit)}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null}
      </div>

      <ModalCustom isOpen={isOpen} onClose={closeAction}>
        {actionData.id ? (
          <>
            <ModalHeader className="flex flex-col gap-1 relative">
              <h1>Cập nhật tin tức</h1>
            </ModalHeader>
            <ModalBody
              style={{
                paddingRight: 0,
              }}
            >
              <form
                id="submit-blog-form"
                className="grid grid-cols-4 gap-10 overflow-y-scroll pr-5"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Select
                  className="col-span-2"
                  defaultSelectedKeys={[actionData.type]}
                  {...register(IBlogFormKeys.Type)}
                  label={`Thể loại`}
                  placeholder="Chọn thể loại"
                >
                  {listBlogs.tags.map((item) => (
                    <SelectItem key={item.id} value={item.id} textValue={item.data}>
                      <p className="text-medium">{item.data}</p>
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  className="col-span-2"
                  isClearable
                  radius="md"
                  classNames={InputCommonStyle}
                  defaultValue={getValues()[IBlogFormKeys.Title]}
                  {...register(IBlogFormKeys.Title)}
                  label="Tiêu đề"
                />
                <Textarea
                  labelPlacement="outside"
                  placeholder="Mô tả ngắn"
                  className="col-span-full"
                  defaultValue={getValues()[IBlogFormKeys.Description]}
                  {...register(IBlogFormKeys.Description)}
                  classNames={InputCommonStyle}
                />

                <h2 className="col-span-full">Hình ảnh</h2>

                {actionData.banner ? (
                  <label className="admin__blog-uploaded col-span-1">
                    <Image
                      alt="about_image"
                      src={actionData.banner}
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
                        setActionData((oldData) => ({
                          ...oldData,
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
                    <input
                      type="text"
                      value={actionData.banner}
                      {...register(IBlogFormKeys.Banner)}
                      className="invisible"
                    />
                  </label>
                ) : (
                  <label htmlFor={`banner`} className="admin__blog-upload col-span-1">
                    <Image
                      alt="banner"
                      src={IconDefault}
                      width={70}
                      height={0}
                      priority
                      quality={100}
                      objectFit="cover"
                    />
                    <Input
                      className="invisible h-0 w-0"
                      id={`banner`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (FileReader && e.target.files?.length) {
                          const fr = new FileReader();
                          fr.onload = () =>
                            setActionData((oldData) => ({
                              ...oldData,
                              banner: fr.result as string,
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
                  value={actionData.content}
                  onChange={(_v, _d, _s, editor) =>
                    setActionData((oldData) => ({
                      ...oldData,
                      content: editor.getHTML(),
                      length: editor.getText().trim().length,
                    }))
                  }
                  modules={EditorModule}
                  formats={EditorFormat}
                  theme="snow"
                  placeholder="Viết gì đó..."
                />
              </form>
            </ModalBody>
          </>
        ) : (
          <>
            <ModalHeader className="flex flex-col gap-1 relative">
              <h1>Thêm mới tin tức</h1>
            </ModalHeader>
            <ModalBody
              style={{
                paddingRight: 0,
              }}
            >
              <form
                id="submit-blog-form"
                className="grid grid-cols-4 gap-10 overflow-y-scroll pr-5"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Select
                  className="col-span-2"
                  {...register(IBlogFormKeys.Type)}
                  label={`Thể loại`}
                  placeholder="Chọn thể loại"
                >
                  {listBlogs.tags.map((item) => (
                    <SelectItem key={item.id} value={item.id} textValue={item.data}>
                      <p className="text-medium">{item.data}</p>
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  className="col-span-2"
                  {...register(IBlogFormKeys.Title)}
                  isClearable
                  radius="md"
                  classNames={InputCommonStyle}
                  label="Tiêu đề"
                />
                <Textarea
                  {...register(IBlogFormKeys.Description)}
                  labelPlacement="outside"
                  placeholder="Mô tả ngắn"
                  className="col-span-full"
                  classNames={InputCommonStyle}
                />

                <h2 className="col-span-full">Hình ảnh</h2>

                {actionData.banner ? (
                  <label className="admin__blog-uploaded col-span-1">
                    <Image
                      alt="about_image"
                      src={actionData.banner}
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
                        setActionData((oldData) => ({
                          ...oldData,
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
                    <input
                      type="text"
                      value={actionData.banner}
                      {...register(IBlogFormKeys.Banner)}
                      className="invisible"
                    />
                  </label>
                ) : (
                  <label htmlFor={`banner`} className="admin__blog-upload col-span-1">
                    <Image
                      alt="banner"
                      src={IconDefault}
                      width={70}
                      height={0}
                      priority
                      quality={100}
                      objectFit="cover"
                    />
                    <Input
                      className="invisible h-0 w-0"
                      id={`banner`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (FileReader && e.target.files?.length) {
                          const fr = new FileReader();
                          fr.onload = () =>
                            setActionData((oldData) => ({
                              ...oldData,
                              banner: fr.result as string,
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
                  value={actionData.content}
                  onChange={(_v, _d, _s, editor) =>
                    setActionData((oldData) => ({
                      ...oldData,
                      content: editor.getHTML(),
                      length: editor.getText().trim().length,
                    }))
                  }
                  modules={EditorModule}
                  formats={EditorFormat}
                  theme="snow"
                  placeholder="Viết gì đó..."
                />
              </form>
            </ModalBody>
          </>
        )}

        <ModalFooter>
          <Button color="danger" variant="light" onPress={closeAction}>
            Huỷ
          </Button>
          <Button
            disabled={isSubmitting}
            color="primary"
            type="submit"
            form="submit-blog-form"
            className="admin__blog-button"
          >
            Lưu
          </Button>
        </ModalFooter>
      </ModalCustom>
    </div>
  );
}
