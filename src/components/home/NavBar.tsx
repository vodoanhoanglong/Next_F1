"use client";

import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NavBarKey, NavBarLabel, NavBarLink } from ".";

export default function NavBar() {
  const [value, setValue] = React.useState(0);

  return (
    <header className="navbar max-w-full h-20 flex justify-around items-center bg-white">
      <Link href={NavBarLink[NavBarKey.Home]}>
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
