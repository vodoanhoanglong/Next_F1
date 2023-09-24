import Image from "next/image";
import { AvatarImage } from ".";

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
}

export const FORMAT_HOUR_MINUTE = "HH:mm";
export const FORMAT_DATE_REVERSE = "DD/MM/YYYY";
export const TimezoneVN = "Asia/Ho_Chi_Minh";

import moment from "moment-timezone";

export default function Blog({ blog }: { blog: IBlogData }) {
  return (
    <div className="blog">
      <Image
        src={blog.banner}
        // src="https://images.unsplash.com/photo-1621075160523-b936ad96132a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="blog"
        priority
        quality={100}
        width="0"
        height="0"
        sizes="100vw"
        className="blog__image"
      />
      <div className="blog__container">
        <h2 className="blog__container-title">{blog.title}</h2>
        <p className="blog__container-description">{blog.description}</p>
        <hr />
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
    </div>
  );
}
