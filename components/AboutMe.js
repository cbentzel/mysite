import React from "react";
import userData from "@constants/data";

export default function AboutMe() {
  return (
    <article className="tufte-article">
      <h1 className="title">{userData.name}</h1>
      <p className="subtitle">
        Engineering leader, builder, part-time roboticist and game developer.
      </p>

      <figure className="marginfigure">
        <img src={userData.avatarUrl} alt="avatar" />
      </figure>

      <p>Hi &mdash; I&apos;m Chris Bentzel!</p>
      <p>
        I enjoy building great products, as well as building the teams that
        build those products. You can read more in the{" "}
        <a href="/work">Professional Work</a> section.
      </p>
      <p>
        In my personal life, I spend time with my family, exercise outdoors,
        read, and work on hobby projects.
      </p>
    </article>
  );
}
