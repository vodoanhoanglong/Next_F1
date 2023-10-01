"use client";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Image from "next/image";
import Link from "next/link";
import { FooterKey, NavBarLabel, NavBarLink } from ".";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Image
          src="/logo.png"
          alt="logo"
          priority
          quality={100}
          width="300"
          height="0"
          sizes="100vw"
          className="object-cover"
        />
        <div className="footer__container-info">
          <ul>
            <li>
              <Link
                href={"#"}
                onClick={(e) => {
                  window.location = "tel:+84932765080" as unknown as Location;
                  e.preventDefault();
                }}
              >
                (+84) 932 765 080
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                onClick={(e) => {
                  window.location = "mailto:long.vo.tech@gmail.com" as unknown as Location;
                  e.preventDefault();
                }}
              >
                long.vo.tech@gmail.com
              </Link>
            </li>
            <li>
              <p>183 Nguyen Van Tang Street, Long Thanh My Ward, District 9, Thu Duc City, Vietnam</p>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            {Object.values(FooterKey).map((item) => (
              <li key={item} className="footer__container-link">
                <Link href={NavBarLink[item]}>{NavBarLabel[item]}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-5"></div>
      <div className="footer__copyright">
        <hr className="footer__copyright-divide" />
        <div className="mt-5 flex justify-between">
          <p>2023 © Tien Hung Chemicals</p>
          <div className="flex justify-around gap-3 items-center">
            <FacebookIcon />
            <TwitterIcon />
            <LinkedInIcon />
          </div>
        </div>
      </div>
    </footer>
  );
}
