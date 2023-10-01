"use client";
import { Pagination } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { Card, IProductData } from ".";
import { KeyProductFilter, getSearchParams, relationProductLimit, updateSearchParams } from "../../shared";

export default function RelationProduct({
  relationProducts,
  totalRelationProducts,
}: {
  relationProducts: IProductData[];
  totalRelationProducts: number;
}) {
  const [page, setPage] = React.useState(Number(getSearchParams(KeyProductFilter.Page)) || 1);

  const router = useRouter();

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(updateSearchParams([KeyProductFilter.Page], [String(value)]), { scroll: false });
  };

  const element = relationProducts.length ? (
    <div className="mb-10">
      <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {relationProducts.map((product) => (
          <Card card={product} key={product.id} />
        ))}
      </div>
      <div className="product__container-item__pagination">
        <Pagination
          count={Math.ceil(totalRelationProducts / relationProductLimit)}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </div>
  ) : (
    <h2>Không có sản phẩm nào liên quan</h2>
  );

  return element;
}
