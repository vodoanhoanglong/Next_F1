"use client";
import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
import { AvatarImage } from ".";
import { IMasterData, NavBarKey, NavBarLink } from "..";
import { FORMAT_DATE_REVERSE, FORMAT_HOUR_MINUTE, TimezoneVN } from "../../shared";

export interface SystemUser {
  fullName: string;
  phoneNumber: string;
  avatar: string;
}

export interface IBlogData {
  id: string;
  title: string;
  description: string;
  content: string;
  banner: string;
  createdAt: Date;
  creator: SystemUser;
  type: IMasterData;
}

export default function Blog({ blog }: { blog: IBlogData }) {
  return (
    <Link className="blog" href={`${NavBarLink[NavBarKey.NewsDetail]}?page=1&newsId=${blog.id}`}>
      <div className="pt-[12px] pl-[12px] pr-[12px]">
        <Image
          src={blog.banner}
          alt="blog"
          priority
          quality={100}
          width="0"
          height="0"
          sizes="100vw"
          className="blog__image"
        />
      </div>
      <div className="blog__container">
        <div className="blog__container-tag">
          <h3>{blog.type.data}</h3>
        </div>
        <h2 className="blog__container-title">{blog.title}</h2>
        <p className="blog__container-description">{blog.description}</p>
        <div className="blog__container-creator">
          <AvatarImage avatar={blog.creator.avatar} fullName={blog.creator.fullName} />
          <div className="blog__container-creator__info">
            <p className="font-semibold">{blog.creator.fullName}</p>
            <p className="font-normal">
              {`${moment(blog.createdAt).tz(TimezoneVN).format(`${FORMAT_HOUR_MINUTE}, ${FORMAT_DATE_REVERSE}`)}`}
            </p>
          </div>
          <button type="button" className="blog__container-creator_arrow">
            »
          </button>
        </div>
      </div>
    </Link>
  );
}
