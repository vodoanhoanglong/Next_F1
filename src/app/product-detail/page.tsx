import HomeIcon from "@mui/icons-material/Home";
import { Link } from "@mui/material";
import { getDataProductDetailPage } from "../../apis/product/product-detail";
import {
  Breadcrumb,
  DynamicContent,
  Footer,
  NavBar,
  NavBarKey,
  NavBarLink,
  ProductDetail,
  RelationProduct,
} from "../../components";
import { IPageProps, IProductDetailFilterProps } from "../../shared";

export default async function ProductDetailPage({ searchParams }: IPageProps) {
  const { product, relationProducts, totalRelationProducts } = await getDataProductDetailPage(
    searchParams as IProductDetailFilterProps,
  );

  const breadcrumbs = [
    <Link key={1} color="inherit" href={NavBarLink[NavBarKey.Home]} className="breadcrumb__item">
      <HomeIcon sx={{ mr: 0.5 }} fontSize="large" />
    </Link>,
    <Link key={2} underline="none" color="inherit" href={NavBarLink[NavBarKey.Product]} className="breadcrumb__item">
      Sản phẩm
    </Link>,
    <Link
      key={3}
      underline="none"
      color="inherit"
      href={`${NavBarLink[NavBarKey.Product]}&category=${product.category.code}`}
      className="breadcrumb__item"
    >
      {product.category.name}
    </Link>,
    <p key={4} className="breadcrumb__item">
      {product.name}
    </p>,
  ];

  return (
    <section>
      <NavBar />
      <main className="overflow-hidden common-background">
        <div className="product__detail-page">
          <Breadcrumb breadcrumbs={breadcrumbs} style={{ marginLeft: "10px", marginTop: "50px" }} />
          <ProductDetail
            product={product}
            relationProducts={relationProducts}
            totalRelationProduct={totalRelationProducts}
          />
        </div>
        <div className="product__detail-description">
          <div className="product__detail-description__layout">
            {product.htmlContent && (
              <div className="product__detail-description__layout-content">
                <div className="flex justify-center m-[20px]">
                  <h1>Mô tả sản phẩm</h1>
                </div>
                <DynamicContent content={product.htmlContent} />
              </div>
            )}
            <div className="product__detail-description__layout-relation">
              <div className="flex justify-center m-[20px]">
                <h1>Sản phẩm liên quan</h1>
              </div>
              <RelationProduct relationProducts={relationProducts} totalRelationProducts={totalRelationProducts} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
}
