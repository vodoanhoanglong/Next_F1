"use client";
import { Pagination } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { Blog, IBlogData } from ".";
import { KeyCommonFilter, blogLimit, getSearchParams, updateSearchParams } from "../../shared";

interface INewsProps {
  blogs: IBlogData[];
  totalBlog: number;
  title?: string;
}

export default function News({ blogs, totalBlog, title }: INewsProps) {
  const [page, setPage] = React.useState(Number(getSearchParams(KeyCommonFilter.Page)) || 1);

  const router = useRouter();

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(updateSearchParams([KeyCommonFilter.Page], [String(value)]), { scroll: false });
  };

  return (
    <div className="news__container">
      <h1 className="text-center">{title || "Bài viết mới"}</h1>
      <div className="news__container-list grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {blogs.map((blog) => (
          <Blog blog={blog} key={blog.id} />
        ))}
      </div>
      <div className="pagination">
        <Pagination count={Math.ceil(totalBlog / blogLimit)} page={page} onChange={handleChangePage} />
      </div>
    </div>
  );
}
