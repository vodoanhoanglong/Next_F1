"use client";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import {
  Divider,
  FormControl,
  IconButton,
  InputBase,
  Link,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  Card,
  CategoryBanner,
  ICategoryData,
  IProductProps,
  NavBarKey,
  NavBarLink,
} from "../../components";
import {
  KeyProductFilter,
  KeyProductSort,
  SortOrder,
  deleteSearchParams,
  getSearchParams,
  productLimit,
  updateSearchParams,
} from "../../shared";

export default function Product({ products, categories, totalProduct }: IProductProps) {
  const sortPrefix = "Sắp xếp theo:";
  const getSortBy = getSearchParams(KeyProductFilter.SortBy) || KeyProductSort.CreatedAt;
  const getSortOrder = getSearchParams(KeyProductFilter.SortOrder);

  const [sortBy, setSortBy] = React.useState(getSortBy);
  const [sort, setSort] = React.useState(getSortOrder === null || getSortOrder === SortOrder.Descending);
  const [page, setPage] = React.useState(Number(getSearchParams(KeyProductFilter.Page)) || 1);
  const [categorySelect, setCategorySelect] = React.useState(getSearchParams(KeyProductFilter.Category) as string);
  const [search, setSearch] = React.useState(getSearchParams(KeyProductFilter.Search));

  const router = useRouter();

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(updateSearchParams([KeyProductFilter.Page], [String(value)]), { scroll: false });
  };

  const handleSearchChange = (event: any) => setSearch(event.target.value);

  const handleSorting = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
    router.push(
      updateSearchParams(
        [KeyProductFilter.SortBy, KeyProductFilter.SortOrder],
        [String(event.target.value), sort === true ? SortOrder.Descending : SortOrder.Ascending],
      ),
      { scroll: false },
    );
  };

  const handleSortOrder = () => {
    let tempSort = !sort;
    setSort(tempSort);
    router.push(
      updateSearchParams(
        [KeyProductFilter.SortBy, KeyProductFilter.SortOrder],
        [sortBy, tempSort === true ? SortOrder.Descending : SortOrder.Ascending],
      ),
      { scroll: false },
    );
  };

  const handleCategoryClick = (code: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCategorySelect(code);
    router.push(updateSearchParams([KeyProductFilter.Category], [code]), { scroll: false });
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    router.push(
      search ? updateSearchParams([KeyProductFilter.Search], [search]) : deleteSearchParams(KeyProductFilter.Search),
      { scroll: false },
    );
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
    <p key={3} className="breadcrumb__item">
      {categoryObj[categorySelect] ? categoryObj[categorySelect].name : "Danh Mục"}
    </p>,
  ];

  return (
    <div className="product">
      <CategoryBanner category={categoryObj[categorySelect]} />
      <Breadcrumb breadcrumbs={breadcrumbs} style={{ marginTop: "50px" }} />
      <div className="product__container">
        <div className="product__container-category">
          <h1 className="product__container-category__title">Danh Mục</h1>
          <Divider sx={{ margin: "0 20px" }} />
          <div className="product__container-category__container">
            {categories.map((category) => (
              <button
                onClick={handleCategoryClick(category.code)}
                key={category.id}
                className={`product__container-category__container-section ${
                  category.code === categorySelect ? "selected" : ""
                }`}
              >
                <div>{category.name}</div>
                <ArrowForwardIosIcon fontSize="small" />
              </button>
            ))}
          </div>
        </div>
        <div className="product__container-item">
          <div className="flex justify-between items-center">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                height: 50,
                borderRadius: 1,
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <InputBase
                id="searchProduct"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tìm kiếm sản phẩm"
                onChange={handleSearchChange}
                defaultValue={search}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <button className="product__container-item__search" onClick={handleSearchClick}>
                <SearchIcon />
              </button>
            </Paper>
            <FormControl
              sx={{
                m: 1,
                width: 300,
                height: 50,
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                border: "none",
                borderRadius: 1,
                backgroundColor: "#FFFFFF",
              }}
            >
              <Select
                value={sortBy}
                onChange={handleSorting}
                startAdornment={
                  <IconButton
                    sx={{
                      marginRight: "5px",
                    }}
                    onClick={handleSortOrder}
                  >
                    <SortIcon
                      sx={{
                        transition: "all 0.3s",
                        transform: sort ? "" : "scaleY(-1)",
                      }}
                    />
                  </IconButton>
                }
                IconComponent={KeyboardArrowDownIcon}
                className="product__container-item__sort"
              >
                <MenuItem value="createdAt">
                  <span>
                    {sortPrefix}
                    <b> Ngày tạo</b>
                  </span>
                </MenuItem>
                <MenuItem value="price">
                  <span>
                    {sortPrefix}
                    <b> Giá</b>
                  </span>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          {products.length ? (
            <div className="mt-10 mb-10 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
