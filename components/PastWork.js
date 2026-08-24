import React from "react";

export default function PastWork({ work, projects }) {
  return (
    <article className="tufte-article">
      <h1 className="title">Professional Work</h1>
      <p className="subtitle">Professional roles and personal projects.</p>

      <h2>Professional Roles</h2>
      {work.map((entry, idx) => (
        <WorkEntry key={entry.title} entry={entry} last={idx === work.length - 1} />
      ))}

      <h2>Personal Projects</h2>
      {projects.map((entry, idx) => (
        <WorkEntry
          key={entry.title}
          entry={entry}
          last={idx === projects.length - 1}
        />
      ))}
    </article>
  );
}

const WorkEntry = ({ entry, last }) => (
  <div>
    <figure className="marginfigure">
      <img src={entry.imgUrl} alt={entry.title} />
    </figure>
    <h3>
      <a href={entry.link} target="_blank" rel="noreferrer">
        {entry.title}
      </a>
    </h3>
    <p>{entry.description}</p>
    {!last && <hr />}
  </div>
);
