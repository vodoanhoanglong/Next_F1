"use client";

import { Input } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { NavBarKey, NavBarLabel, NavBarLink } from ".";
import { SearchIcon } from "../admin/table";

export default function NavBar() {
  return (
    <div className="navbar">
      <header className="main-header">
        <Link href={NavBarLink[NavBarKey.Home]} className="navbar__logo">
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
        </Link>
        <input type="checkbox" className="menu-btn" id="navbar-menu-btn" />

        <ul className="nav-links">
          {Object.values(NavBarKey)
            .filter((item) => NavBarLabel[item])
            .map((item, index) => (
              <li key={index}>
                <Link href={NavBarLink[item]}>{NavBarLabel[item]}</Link>
              </li>
            ))}
        </ul>
        <div className="navbar__search">
          <Input
            isClearable
            // onKeyDown={(e) => e.key === "Enter" && setSearch(searchValue)}
            // onChange={(e) => {
            //   searchValue = e.target.value;
            // }}
            radius="sm"
            className="navbar__search-input"
            placeholder="Tìm kiếm..."
            startContent={
              <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>

        <label htmlFor="navbar-menu-btn" className="menu-icon">
          <span className="menu-icon__line"></span>
        </label>
      </header>
    </div>
  );
}
