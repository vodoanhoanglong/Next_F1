"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IProductData } from ".";
import { NavBarKey, NavBarLink } from "..";
import { KeyProductFilter, getSearchParams, updateSearchParams } from "../../shared";

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
      <div className="relation__product">
        {relationProducts.map((product) => (
          <Link
            key={product.id}
            className="relation__product-item"
            href={`${NavBarLink[NavBarKey.ProductDetail]}&productCode=${product.code}&categoryCode=${
              product.category.code
            }`}
          >
            <Image src={product.images[0]} quality={100} width="60" height="0" alt="image" />
            <div>
              <p>
                {product.name} - {product.brand.data}
              </p>
              <button type="button" className="relation__product-item__arrow">
                »
              </button>
            </div>
          </Link>
        ))}
      </div>
      {/* <div className="product__container-item__pagination pagination">
        <Pagination
          count={Math.ceil(totalRelationProducts / relationProductLimit)}
          page={page}
          onChange={handleChangePage}
        />
      </div> */}
    </div>
  ) : (
    <h2>Không có sản phẩm nào liên quan</h2>
  );

  return element;
}
