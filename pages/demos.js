import React from "react";
import ContainerBlock from "../components/ContainerBlock";

export default function demos() {
  return (
    <ContainerBlock title="Demos">
      <article className="tufte-article">
        <h1 className="title">Demos</h1>
        <p className="subtitle">Interactive bits and pieces.</p>
        <p>
          Nothing to play with yet &mdash; this section is reserved for small
          interactive demos and prototypes. Check back soon.
        </p>
      </article>
    </ContainerBlock>
  );
}
