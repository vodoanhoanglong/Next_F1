export const productLimit = 12;
export const relationProductLimit = 5;

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
  category?: string;
}

export interface IProductDetailFilterProps extends IPaginationProps {
  productCode: string;
  categoryCode: string;
}

export interface IPageDetailProps {
  slug: string;
}

export interface IPageProps {
  params: IPageDetailProps;
  searchParams: IProductFilterProps | IProductDetailFilterProps;
}

export enum SortingKey {
  SortBy = "sortBy",
  SortOrder = "sortOrder",
}

export const KeyProductFilter = {
  ...SortingKey,
  Page: "page",
  Search: "search",
  Category: "category",
};

export enum KeyProductSort {
  CreatedAt = "createdAt",
  Price = "price",
}

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
