"use client";

import { ICategoryData } from "..";

export default function CategoryBanner({ category }: { category: ICategoryData }) {
  return (
    <div className="category__banner">
      {category ? (
        <section
          className="category__banner-image"
          style={{
            backgroundImage: `url(${category.image})`,
          }}
        >
          <div className="category__banner-image__content">
            <h1>{category.name}</h1>
            <p>{category.description}</p>
          </div>
        </section>
      ) : (
        <section
          className="category__banner-image"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1620908198770-b46654453cf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80")`,
          }}
        >
          <div className="category__banner-image__content">
            <h1>Title</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam maiores odio blanditiis molestias quos vero,
              officia quidem. Quasi aut explicabo soluta et odit quisquam, ipsum dolorem blanditiis provident libero
              id?officia quidem. Quasi aut explicabo soluta et odit quisquam, ipsum dolorem blanditiis provident libero
              id?
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
