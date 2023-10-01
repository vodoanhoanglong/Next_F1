import Breadcrumb from "./Breadcrumb";
import Card from "./Card";
import CategoryBanner from "./CategoryBanner";
import DynamicContent from "./DynamicContent";
import Product from "./Product";
import ProductDetail from "./ProductDetail";
import RelationProduct from "./RelationProduct";

export interface IProductData {
  id: string;
  code: string;
  name: string;
  htmlContent: string;
  description: string;
  images: string[];
  price: number;
  category: ICategoryData;
}

export interface ICategoryData {
  id: string;
  name: string;
  code: string;
  description: string;
  image: string;
  icon: string;
}

export * from "./Product";

export { Breadcrumb, Card, CategoryBanner, DynamicContent, Product, ProductDetail, RelationProduct };
