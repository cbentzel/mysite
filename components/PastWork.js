import React from "react";

export default function PastWork({ work, projects }) {
  return (
    <article className="tufte-article">
      <h1 className="title">Work</h1>

      <h2>Roles</h2>
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
    <div className="work-entry">
      <figure className="marginfigure work-entry-figure">
        <img src={entry.imgUrl} alt={entry.title} />
      </figure>
      <div className="work-entry-content">
        <h3>
          <a href={entry.link} target="_blank" rel="noreferrer">
            {entry.title}
          </a>
        </h3>
        <p>{entry.description}</p>
      </div>
    </div>
    {!last && <hr />}
  </div>
);
