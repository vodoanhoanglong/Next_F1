"use client";

import { NextUIProvider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AdminRoute } from "../../../shared";

export const MenuBarItem = [
  {
    label: "Sản phẩm",
    link: AdminRoute.Product,
  },
  {
    label: "Danh mục",
    link: AdminRoute.Category,
  },
  {
    label: "Giới thiệu",
    link: AdminRoute.About,
  },
  {
    label: "Tin tức",
    link: AdminRoute.Blog,
  },
  {
    label: "Liên hệ",
    link: AdminRoute.Contact,
  },
  {
    label: "Cấu hình",
    link: AdminRoute.Config,
  },
];
export default function MenuBar({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <NextUIProvider>
      <div className="menu__bar">
        <div className="menu__bar-container">
          <Image
            src="/logo.png"
            alt="logo"
            priority
            quality={100}
            width="400"
            height="0"
            sizes="100vw"
            className="object-cover"
          />
          <div className="menu__bar-container__link">
            {MenuBarItem.map((item, index) => (
              <Link key={index} href={item.link} className="flex justify-between">
                <div
                  className="menu__bar-container__link-button"
                  style={
                    path === item.link
                      ? {
                          background: "#ce9cf7",
                          color: "white",
                        }
                      : {}
                  }
                >
                  <h2>{item.label}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="menu__bar-content">{children}</div>
      </div>
    </NextUIProvider>
  );
}
