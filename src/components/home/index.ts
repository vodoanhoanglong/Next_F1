import { IBlogData } from "..";
import Footer from "./Footer";
import Introduction from "./Introduction";
import NavBar from "./NavBar";
import Partner from "./Partner";
import Slider from "./Slider";

export enum IMasterDataType {
  Slider = "slider",
  Partner = "partner",
  Introduction = "introduction",
  Brand = "brand",
}

export interface IMasterData {
  id: string;
  data: string;
  type: IMasterDataType;
  additionalValue: string;
  blogs: IBlogData[];
}

export interface IIntroduction {
  imageLeft: string;
  imageCenter: string;
  imageRight: string;
  description: string;
  title: string;
}

export enum NavBarKey {
  Home = "home",
  Product = "product",
  About = "about",
  News = "news",
  Contact = "contact",
  ProductDetail = "product_detail",
  NewsDetail = "news_detail",
}

export enum FooterKey {
  About = "about",
  Product = "product",
  News = "news",
  Contact = "contact",
}

export const NavBarLabel = {
  [NavBarKey.About]: "GIỚI THIỆU",
  [NavBarKey.Product]: "SẢN PHẨM",
  [NavBarKey.News]: "TIN TỨC",
  [NavBarKey.Contact]: "LIÊN HỆ",
} as Record<string, string>;

export const NavBarLink = {
  [NavBarKey.Home]: "/",
  [NavBarKey.About]: "/about",
  [NavBarKey.Product]: "/product?page=1&sortBy=createdAt&sortOrder=desc",
  [NavBarKey.ProductDetail]: "/product-detail?page=1",
  [NavBarKey.News]: "/news?page=1",
  [NavBarKey.NewsDetail]: "/news-detail",
  [NavBarKey.Contact]: "/contact",
} as Record<string, string>;

export { Footer, Introduction, NavBar, Partner, Slider };
