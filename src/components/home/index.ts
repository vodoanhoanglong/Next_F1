import Footer from "./Footer";
import Introduction from "./Introduction";
import NavBar from "./NavBar";
import Partner from "./Partner";
import Slider from "./Slider";

export enum IMasterDataType {
  Slider = "slider",
  Partner = "partner",
  Introduction = "introduction",
}

export interface IMasterData {
  id: string;
  data: string;
  type: IMasterDataType;
}

export interface IIntroduction {
  imageLeft: string;
  imageRight: string;
  content: string;
  description: string;
}

export enum NavBarKey {
  Home = "home",
  About = "about",
  Product = "product",
  News = "news",
  Contact = "contact",
  ProductDetail = "product_detail",
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
  [NavBarKey.News]: "/news",
  [NavBarKey.Contact]: "/contact",
} as Record<string, string>;

export { Footer, Introduction, NavBar, Partner, Slider };
