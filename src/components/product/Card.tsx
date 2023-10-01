import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { IProductData } from ".";
import { NavBarKey, NavBarLink } from "..";
import { convertCurrencyToVND } from "../../shared";

export default function Card({ card }: { card: IProductData }) {
  return (
    <Link
      className="card"
      href={`${NavBarLink[NavBarKey.ProductDetail]}&productCode=${card.code}&categoryCode=${card.category.code}`}
    >
      <Image
        src={card.images[0]}
        alt="NFT"
        priority
        quality={100}
        width="0"
        height="0"
        sizes="100vw"
        className="card__image"
      />
      <div className="card__container">
        <h2 className="font-extrabold">{card.name}</h2>
        <h4 className="font-bold">
          {card.code} - {convertCurrencyToVND(card.price)}
        </h4>
        <p className="card__container--description">{card.description}</p>
        <Divider />
        <div className="card__container--creator">
          <p className="font-semibold">{card.category.name}</p>
        </div>
      </div>
    </Link>
  );
}
