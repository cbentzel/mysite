import React from "react";
import Link from "next/link";
import ContainerBlock from "../../components/ContainerBlock";
import { getSortedPostsData } from "@lib/posts";

export default function Posts({ posts }) {
  return (
    <ContainerBlock title="Posts">
      <article className="tufte-article">
        <h1 className="title">Posts</h1>
        {posts.length === 0 && <p>Nothing here yet &mdash; check back soon.</p>}
        {posts.map((post) => (
          <div key={post.slug}>
            <h2>
              <Link href={`/posts/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </h2>
            <p className="subtitle" style={{ margin: "-0.5rem 0 0.5rem" }}>
              {post.date}
            </p>
            <p>{post.excerpt}</p>
          </div>
        ))}
      </article>
    </ContainerBlock>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts: getSortedPostsData(),
    },
  };
}
