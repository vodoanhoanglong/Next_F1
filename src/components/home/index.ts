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
  image: string;
  content: string;
  description: string;
}

export * from "./NavBar";
export * from "./Slider";
export { Introduction, NavBar, Partner, Slider };
