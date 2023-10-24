"use client";

import { Chip, Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { BsTagsFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
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
        alt="product_image"
        priority
        quality={100}
        width="0"
        height="0"
        sizes="100vw"
        className="card__image"
      />
      <div className="card__footer">
        <div className="card__footer-title">
          <h2 className="font-extrabold">{card.name}</h2>
          <div className="card__footer-title__tag">
            <p>{card.code}</p>
          </div>
        </div>
        <div className="card__footer-body">
          <div className="card__footer-body__price">
            <div className="card__footer-body__price-icon">
              <BsTagsFill />
            </div>
            <p className="font-bold">{convertCurrencyToVND(card.price)}</p>
          </div>
          <div className="card__footer-body__brand">
            <div className="card__footer-body__brand-icon">
              <MdLocationPin />
            </div>
            <p>{card.brand.data}</p>
          </div>
        </div>
        <p className="card__footer-des">{card.description}</p>
        <Divider />
        <div className="card__footer-category">
          <Chip
            className="text-bold text-medium"
            startContent={<Image src={card.category.icon} quality={100} width="18" height="0" alt="icon" />}
            color={"secondary"}
            size="lg"
            variant="flat"
          >
            {card.category.name}
          </Chip>
        </div>
      </div>
    </Link>
  );
}
