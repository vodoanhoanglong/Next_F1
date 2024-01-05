"use client";

import HomeIcon from "@mui/icons-material/Home";
import { Link, Pagination } from "@mui/material";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import {
  Breadcrumb,
  Card,
  CategoryBanner,
  ICategoryData,
  IProductProps,
  NavBarKey,
  NavBarLink,
} from "../../components";
import { KeyProductFilter, getSearchParams, productLimit, updateSearchParams } from "../../shared";

export default function Product({ products, categories, totalProduct }: IProductProps) {
  // const sortPrefix = "Sắp xếp theo:";
  const router = useRouter();

  const [page, setPage] = React.useState(Number(getSearchParams(KeyProductFilter.Page)) || 1);
  const [categorySelect, setCategorySelect] = React.useState(getSearchParams(KeyProductFilter.Category) as string);

  React.useEffect(() => {
    const category = getSearchParams(KeyProductFilter.Category);
    if (!category) {
      return;
    }

    setCategorySelect(category as string);
  }, []);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(updateSearchParams([KeyProductFilter.Page], [String(value)]), { scroll: false });
  };

  const handleSelectionChange = (e: Selection) => {
    const data = Object.entries(e)[0][1];
    setCategorySelect(data);
    router.push(updateSearchParams([KeyProductFilter.Category], [data]), { scroll: false });
  };

  const categoryObj = categories.reduce(
    (acc, curr) => {
      acc[curr.code] = curr;
      return acc;
    },
    {} as Record<string, ICategoryData>,
  );

  const breadcrumbs = [
    <Link key={1} color="inherit" href={NavBarLink[NavBarKey.Home]} className="breadcrumb__item">
      <HomeIcon sx={{ mr: 0.5 }} fontSize="large" />
    </Link>,
    <Link key={2} underline="none" color="inherit" href={NavBarLink[NavBarKey.Product]} className="breadcrumb__item">
      Sản phẩm
    </Link>,
    <Dropdown key={3}>
      <DropdownTrigger>
        <div className="breadcrumb__item flex items-center gap-1">
          {categoryObj[categorySelect] ? (
            <div className="text-bold text-medium p-3 flex items-center gap-1">
              <Image src={categoryObj[categorySelect].icon} quality={100} width="18" height="0" alt="icon" />
              {categoryObj[categorySelect].name}
            </div>
          ) : (
            <p>Tất cả</p>
          )}
          <RiArrowDownSFill />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={categorySelect}
        onSelectionChange={handleSelectionChange}
      >
        {[
          {
            code: "",
            name: "Tất cả",
          } as ICategoryData,
          ...categories,
        ].map((category) => (
          <DropdownItem key={category.code}>{category.name}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>,
  ];

  return (
    <div className="product">
      <CategoryBanner category={categoryObj[categorySelect]} />
      <Breadcrumb breadcrumbs={breadcrumbs} style={{ marginTop: "50px" }} />
      <div className="product__container">
        <div className="product__container-item">
          {products.length ? (
            <div className="product__container-item__list mt-10 mb-10 grid grid-cols-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10">
              {products.map((product) => (
                <Card card={product} key={product.id} />
              ))}
            </div>
          ) : (
            <h1 className="flex justify-center mt-[200px]">Không Tìm Thấy Sản Phẩm</h1>
          )}
          {products.length ? (
            <div className="product__container-item__pagination pagination">
              <Pagination count={Math.ceil(totalProduct / productLimit)} page={page} onChange={handleChangePage} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
