"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { NavBarKey, NavBarLabel, NavBarLink } from ".";
import { ICategoryData } from "..";
import { SearchIcon } from "../admin/table";
import { getDataCategoryAction } from "./action";

export const ChevronDown = ({ fill, size, height, width, ...props }: any) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

const NavbarStyle = {
  base: "navbar",
  item: "navbar__item",
};

export default function NavBar({ isProduct = false }: { isProduct?: boolean }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [categoryData, setCategoryData] = React.useState<ICategoryData[]>([]);
  const [input, setInput] = React.useState("");

  React.useEffect(() => {
    getDataCategoryAction()
      .then((res) => setCategoryData(res))
      .catch((error) => Promise.reject(error));
  }, []);

  const menuItems = Object.values(NavBarKey).filter((item) => NavBarLabel[item]);

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} classNames={NavbarStyle} maxWidth="full">
      <NavbarContent className="navbar__toggle" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent justify="start" className="navbar__brand">
        <NavbarBrand>
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
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="navbar__link" justify="center">
        {menuItems.map((item) =>
          !isProduct && item === NavBarKey.Product ? (
            <Dropdown key={item}>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                    endContent={<ChevronDown fill="currentColor" size={16} />}
                    radius="sm"
                    variant="light"
                  >
                    {NavBarLabel[item]}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="ACME features"
                className="navbar__link-dropdown"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                {categoryData.map((item) => (
                  <DropdownItem
                    key={item.code}
                    onAction={(key) => router.replace(`${NavBarLink[NavBarKey.Product]}&category=${key}`)}
                    startContent={
                      <Image
                        src={item.icon}
                        alt="icon"
                        priority
                        quality={100}
                        width="28"
                        height="0"
                        sizes="100vw"
                        className="object-cover"
                      />
                    }
                  >
                    <b>{item.name}</b>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem key={item}>
              <Link color="foreground" href={NavBarLink[item]}>
                {NavBarLabel[item]}
              </Link>
            </NavbarItem>
          ),
        )}
      </NavbarContent>

      {!isProduct ? (
        <NavbarContent as="div" className="navbar__search" justify="end">
          <Input
            classNames={{
              base: "navbar__search-input",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" ? router.push(`${NavBarLink[NavBarKey.Product]}&search=${input}`) : null
            }
            placeholder="Tìm kiếm sản phẩm..."
            size="sm"
            startContent={<SearchIcon size={20} />}
            type="search"
          />
        </NavbarContent>
      ) : null}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href={NavBarLink[item]}>
              <b>{NavBarLabel[item]}</b>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
