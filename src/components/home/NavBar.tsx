"use client";

import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export enum NavBarKey {
  Home = "home",
  About = "about",
  Product = "product",
  News = "news",
  Contact = "contact",
}

const NavBarLabel = {
  [NavBarKey.Home]: "TRANG CHỦ",
  [NavBarKey.About]: "GIỚI THIỆU",
  [NavBarKey.Product]: "SẢN PHẨM",
  [NavBarKey.News]: "TIN TỨC",
  [NavBarKey.Contact]: "LIÊN HỆ",
} as Record<string, string>;

const NavBarLink = {
  [NavBarKey.Home]: "/",
  [NavBarKey.About]: "/about",
  [NavBarKey.Product]: "/product",
  [NavBarKey.News]: "/news",
  [NavBarKey.Contact]: "/contact",
} as Record<string, string>;

export default function NavBar() {
  const [value, setValue] = React.useState(0);

  return (
    <header className="navbar max-w-full h-20 flex justify-around items-center bg-white">
      <Image
        src="/logo.png"
        alt="logo"
        priority
        quality={100}
        width="220"
        height="0"
        sizes="100vw"
        className="object-cover"
      />
      <div className="flex gap-14 items-center font-extrabold text-xl">
        {Object.values(NavBarKey).map((item) => (
          <Link href={NavBarLink[item]} key={item} className="navbar-item">
            {NavBarLabel[item]}
          </Link>
        ))}
      </div>
      <TextField
        id="input-with-icon-textfield"
        placeholder="Tìm kiếm"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </header>
  );
}
