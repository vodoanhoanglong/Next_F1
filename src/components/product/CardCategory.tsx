"use client";

import Image from "next/image";
import Link from "next/link";
import { ICategoryData } from ".";
import { NavBarKey, NavBarLink } from "..";

export default function CardCategory({ category }: { category: ICategoryData }) {
  return (
    <Link className="card" href={`${NavBarLink[NavBarKey.Product]}&category=${category.code}`}>
      <Image
        src={category.image}
        alt="category_image"
        priority
        quality={100}
        width="0"
        height="0"
        sizes="100vw"
        className="card__image"
      />
      <div className="card__footer h-[230px]">
        <div className="flex justify-start gap-3 items-center">
          <Image src={category.icon} alt="category_icon" priority quality={100} width="36" height="36" sizes="100vw" />
          <h2 className="font-extrabold">
            <p>{category.name}</p>
          </h2>
        </div>

        <p className="card__footer-des">{category.description}</p>
      </div>
    </Link>
  );
}
