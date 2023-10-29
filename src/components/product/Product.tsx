"use client";

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
  // const sortPrefix = "Sắp xếp theo:";
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

  const handleSelectionChange = (e: Selection) => {
    const data = Object.entries(e)[0][1];
    setCategorySelect(data);
    router.push(updateSearchParams([KeyProductFilter.Category], [data]), { scroll: false });
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
          <div className="product__container-item__filter">
            <Paper
              component="form"
              sx={{
                boxShadow: "none",
              }}
              className="product__container-item__filter-search"
            >
              <InputBase
                id="searchProduct"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tìm kiếm sản phẩm"
                onChange={handleSearchChange}
                defaultValue={search}
                className="product__container-item__filter-search__label"
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <button className="product__container-item__filter-search__btn" onClick={handleSearchClick}>
                <SearchIcon />
              </button>
            </Paper>
            <FormControl>
              <Select
                className="product__container-item__filter-sort"
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
              >
                <MenuItem value="createdAt">
                  <span className="product__container-item__filter-sort__label">
                    <b> Ngày tạo</b>
                  </span>
                </MenuItem>
                <MenuItem value="price">
                  <span>
                    <b> Giá</b>
                  </span>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
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
