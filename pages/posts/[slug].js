import React from "react";
import ContainerBlock from "../../components/ContainerBlock";
import { getAllPostSlugs, getPostData } from "@lib/posts";

export default function Post({ post }) {
  return (
    <ContainerBlock title={post.title} description={post.excerpt}>
      <article className="tufte-article">
        <h1 className="title">{post.title}</h1>
        <p className="subtitle">{post.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </ContainerBlock>
  );
}

export async function getStaticPaths() {
  return {
    paths: getAllPostSlugs(),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostData(params.slug);
  return {
    props: { post },
  };
}
