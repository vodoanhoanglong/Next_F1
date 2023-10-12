"use client";

import { Avatar, Chip, Input, Select, SelectItem, SelectedItems, User } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { ICategoryData, IProductData } from "../..";
import { SortOrder, convertCurrencyToVND } from "../../../shared";
import { SearchIcon, TableAction, TableCommonHeader, TableCustom, TableSchemaParam } from "../table";
import getDataProductAction from "./action";

const ProductTableHeader: TableCommonHeader[] = [
  { label: "Tên - Mã sản phẩm", key: "name" },
  { label: "Giá", key: "price" },
  { label: "Danh mục", key: "category" },
  { label: "Thao tác", key: "actions" },
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
  actions: (param) => <TableAction />,
} as TableSchemaParam<IProductData>;

export default function AdminProduct() {
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [changeFilter, setChangeFilter] = React.useState(new Set([""]));
  const [submitFilter, setSubmitFilter] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState("");

  const [data, setData] = React.useState<{
    products: IProductData[];
    totalProduct: number;
    categories: ICategoryData[];
  }>({
    products: [],
    totalProduct: 0,
    categories: [],
  });

  useEffect(() => {
    setLoading(true);

    getDataProductAction({
      page,
      sortOrder: SortOrder.Descending,
      sortBy: "createdAt",
      category: submitFilter,
      search,
    }).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [page, submitFilter, search]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setChangeFilter(new Set(e.target.value.split(",")));

  let searchValue = "";

  return (
    <div className="admin__product">
      <div className="admin__product-filter">
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
                  startContent={<Image src={item.data?.icon as string} quality={75} width="18" height="0" alt="icon" />}
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
            base: ["w-[300px]"],
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
      <div className="admin__product-table">
        <TableCustom
          page={page}
          setPage={setPage}
          data={data.products}
          total={data.totalProduct}
          tableCustom={ProductTableCustom}
          headers={ProductTableHeader}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
