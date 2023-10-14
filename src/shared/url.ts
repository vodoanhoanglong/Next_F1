export const productLimit = 12;
export const relationProductLimit = 5;
export const blogLimit = 6;

export interface IPaginationProps {
  page: number;
}

export const enum SortOrder {
  Ascending = "asc",
  Descending = "desc",
}

export interface ISortingProps {
  sortBy: string;
  sortOrder: SortOrder;
}

export interface IProductFilterProps extends IPaginationProps, ISortingProps {
  search?: string;
  category?: string | string[];
}

export interface IProductDetailFilterProps extends IPaginationProps {
  productCode: string;
  categoryCode: string;
}

export interface INewsDetailFilterProps extends IPaginationProps {
  newsId: string;
}

export interface IPageDetailProps {
  slug: string;
}

export interface IPageProps {
  params: IPageDetailProps;
  searchParams: IProductFilterProps | IProductDetailFilterProps | INewsDetailFilterProps;
}

export enum SortingKey {
  SortBy = "sortBy",
  SortOrder = "sortOrder",
}

export const KeyCommonFilter = {
  Page: "page",
};

export const KeyProductFilter = {
  ...SortingKey,
  Page: "page",
  Search: "search",
  Category: "category",
};

export const KeyAdminLogin = {
  Code: "code",
};

export enum KeyProductSort {
  CreatedAt = "createdAt",
  Price = "price",
}

export enum LocalStorage {
  Token = "token",
  RefreshToken = "refresh_token",
}

export const AdminRoute = {
  Login: "/admin/login",
  Product: "/admin/product",
  Category: "/admin/category",
};

export const getSearchParams = (type: string) => {
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  return searchParams.get(type);
};

export const updateSearchParams = (type: string[], value: string[]) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");

  // Set the specified search parameter to the given value
  type.forEach((key, index) => {
    searchParams.set(key, value[index]);
  });

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};
