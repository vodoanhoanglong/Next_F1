"use client";

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
  User,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { VscAdd } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { DynamicContent, ICategoryData, IMasterData, IProductData, ModalCustom } from "../..";
import { AuthContext } from "../../../contexts";
import { LocalStorage, SortOrder, StatusCode, convertCurrencyToVND, throwSafeError } from "../../../shared";
import { SearchIcon, TableAction, TableCommonHeader, TableCustom, TableSchemaParam } from "../table";
import ProductAction from "./ProductAction";
import { deleteProductAction, getDataProductAction } from "./action";

const ProductTableHeader: TableCommonHeader<IProductData>[] = [
  { label: "Tên - Mã sản phẩm", key: "name", align: "start" },
  { label: "Giá", key: "price", align: "start" },
  { label: "Danh mục", key: "category", align: "start" },
  { label: "Thương hiệu", key: "brand", align: "start" },
  { label: "Thao tác", key: "actions", align: "center" },
];

export const ProductTableCustom = {
  name: (param) => (
    <User
      avatarProps={{ size: "lg", radius: "md", src: param.data.images[0] }}
      description={param.data.code}
      name={param.data.name}
      classNames={{
        name: ["text-bold text-medium"],
        description: ["text-bold text-sm"],
      }}
    >
      {param.data.code}
    </User>
  ),
  price: (param) => <p className="text-bold text-medium">{convertCurrencyToVND(param.data.price)}</p>,
  category: (param) => (
    <Chip
      className="text-bold text-medium"
      startContent={<Image src={param.data.category.icon} quality={75} width="18" height="0" alt="icon" />}
      color={"secondary"}
      size="md"
      variant="flat"
    >
      {param.data.category.name}
    </Chip>
  ),
  brand: (param) => <p className="text-bold text-medium">{param.data.brand.data}</p>,
  actions: (param) => <TableAction {...param} />,
} as TableSchemaParam<IProductData>;

interface IData {
  products: IProductData[];
  totalProduct: number;
  categories: ICategoryData[];
  brand: IMasterData[];
}

export const initialValue = {
  id: "",
  name: "",
  code: "",
  price: 0,
  brandId: "",
  categoryId: "",
  description: "",
  htmlContent: "",
  images: [],
  category: {},
  brand: {},
} as unknown as IProductData;

export default function AdminProduct() {
  const { localStorageValue } = React.useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [changeFilter, setChangeFilter] = React.useState(new Set([""]));
  const [submitFilter, setSubmitFilter] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState("");
  const [reFetch, setRefetch] = React.useState(0);
  const [actionData, setActionData] = React.useState<IProductData>(initialValue);

  const [data, setData] = React.useState<IData>({
    products: [],
    totalProduct: 0,
    categories: [],
    brand: [],
  });

  React.useEffect(() => {
    setLoading(true);

    getDataProductAction({
      page,
      sortOrder: SortOrder.Descending,
      sortBy: "updatedAt",
      category: submitFilter,
      search,
      ...localStorageValue,
    }).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [page, submitFilter, search, reFetch]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setChangeFilter(new Set(e.target.value.split(",")));

  const closeAction = () => {
    setActionData(initialValue);
    return setOpenDelete(false);
  };

  const submitDeleteProduct = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      e.preventDefault();
      const result = await deleteProductAction(
        { code: `DELETED_${new Date().getTime()}_${actionData.code}`, status: StatusCode.Deleted },
        actionData.id,
        localStorageValue[LocalStorage.Token],
      );
      if (!result) toast.error("Đã có lỗi xảy ra");
      else toast.success("Xoá sản phẩm thành công");
      closeAction();

      return setRefetch((oldValue) => ++oldValue);
    } catch (error) {
      toast.error(throwSafeError(error).message);

      return closeAction();
    }
  };

  let searchValue = "";

  return (
    <div className="admin__product">
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
      <div className="admin__product-action">
        <div className="admin__product-action__filter">
          <Select
            selectionMode="multiple"
            placeholder="Chọn danh mục"
            items={data.categories}
            isMultiline
            onChange={handleSelectionChange}
            onClose={() => setSubmitFilter([...changeFilter.keys()].filter((item) => item))}
            classNames={{
              base: "max-w-xs",
              trigger: "min-h-unit-12 py-2",
            }}
            renderValue={(items: SelectedItems<ICategoryData>) => (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip
                    key={item.key}
                    startContent={
                      <Image src={item.data?.icon as string} quality={75} width="18" height="0" alt="icon" />
                    }
                  >
                    {item.data?.name}
                  </Chip>
                ))}
              </div>
            )}
          >
            {(category) => (
              <SelectItem key={category.code} value={category.code} textValue={category.name}>
                <div className="flex gap-2 items-center">
                  <Avatar alt={category.icon} className="flex-shrink-0" size="sm" src={category.icon} />
                  <span className="text-medium">{category.name}</span>
                </div>
              </SelectItem>
            )}
          </Select>
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
        <div className="admin__product-action__add">
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
          <ProductAction
            actionData={actionData}
            setActionData={setActionData}
            setReFetch={setRefetch}
            isOpen={isOpen}
            onClose={onClose}
            categories={data.categories}
            brand={data.brand}
          />
        </div>
      </div>

      <div className="admin__product-table">
        <TableCustom
          setOpenView={setOpenView}
          setOpenDelete={setOpenDelete}
          onOpen={onOpen}
          page={page}
          setPage={setPage}
          setActionData={setActionData}
          data={data.products}
          total={data.totalProduct}
          tableCustom={ProductTableCustom}
          headers={ProductTableHeader}
          isLoading={loading}
        />
      </div>

      {/* Action view */}
      <ModalCustom
        isOpen={openView}
        onClose={() => {
          setThumbsSwiper(null);
          setActionData(initialValue);
          return setOpenView(false);
        }}
      >
        <ModalHeader>
          <h1>Chi tiết sản phẩm</h1>
        </ModalHeader>
        <ModalBody>
          <div className="admin__product-detail">
            <div
              className="admin__product-detail__slider"
              style={{
                height: actionData.images.length === 1 ? "400px" : "600px",
              }}
            >
              <Swiper
                style={{}}
                loop={true}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
                className={`admin__product-detail__slider-main ${
                  actionData.images.length === 1 ? "h-full" : "h-[75%]"
                }`}
              >
                {actionData.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image}
                      alt={`main_${index}`}
                      priority
                      quality={100}
                      width="0"
                      height="0"
                      sizes="100vw"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {actionData.images.length === 1 ? null : (
                <Swiper
                  onSwiper={setThumbsSwiper as any}
                  loop={true}
                  spaceBetween={10}
                  slidesPerView={actionData.images.length}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="admin__product-detail__slider-thump"
                >
                  {actionData.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={image}
                        alt={`thump_${index}`}
                        priority
                        quality={100}
                        width="0"
                        height="0"
                        sizes="100vw"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            <div className="admin__product-detail__content">
              <br />
              <h1>{actionData.name}</h1>
              <br />
              <div className="grid grid-cols-2">
                <div className="pr-3">
                  <div className="flex justify-between items-center">
                    <span>- Mã sản phẩm:</span>
                    <b>{actionData.code}</b>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>- Thương hiệu:</span>
                    <b>{actionData.brand.data}</b>
                  </div>
                </div>
                <div className="pl-3">
                  <div className="flex justify-between items-center">
                    <span>- Giá:</span>
                    <b>{convertCurrencyToVND(actionData.price)}</b>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>- Danh mục: </span>
                    <Chip
                      className="text-bold text-medium"
                      startContent={
                        <Image src={actionData.category.icon} quality={75} width="18" height="0" alt="icon" />
                      }
                      color={"secondary"}
                      size="md"
                      variant="flat"
                    >
                      {actionData.category.name}
                    </Chip>
                  </div>
                </div>
              </div>
              <p className="admin__product-detail__content-des">
                - Mô tả nhanh: <b>{actionData.description}</b>
              </p>
              <p>- Mô tả chi tiết:</p>
              <DynamicContent content={actionData.htmlContent} />
            </div>
          </div>
        </ModalBody>
      </ModalCustom>

      {/* Action confirm deleted */}
      <ModalCustom isOpen={openDelete} onClose={() => closeAction()}>
        <ModalHeader>
          <h1>Xoá sản phẩm</h1>
        </ModalHeader>
        <ModalBody>
          <h2 className="w-full text-center">
            <b>Bạn có chắc muốn xoá sản phẩm này?</b>
          </h2>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={(e) => closeAction()}>
            Huỷ
          </Button>
          <Button color="danger" onClick={submitDeleteProduct}>
            Xoá
          </Button>
        </ModalFooter>
      </ModalCustom>
    </div>
  );
}
