import Breadcrumb from "./Breadcrumb";
import Card from "./Card";
import CardCategory from "./CardCategory";
import CategoryBanner from "./CategoryBanner";
import DynamicContent from "./DynamicContent";
import Product from "./Product";
import ProductDetail from "./ProductDetail";
import RelationProduct from "./RelationProduct";

interface ProductMetadata {
  icon: string;
}

export interface IProductData {
  id: string;
  code: string;
  name: string;
  htmlContent: string;
  description: string;
  images: string[];
  price: number;
  category: ICategoryData;
  categoryId: string;
  brandId: string;
  metadata: ProductMetadata;
  brand: ImageData;
}

export interface ICategoryData {
  id: string;
  name: string;
  code: string;
  description: string;
  image: string;
  icon: string;
}

export interface IProductProps {
  totalProduct: number;
  products: IProductData[];
  categories: ICategoryData[];
}

export { Breadcrumb, Card, CardCategory, CategoryBanner, DynamicContent, Product, ProductDetail, RelationProduct };
