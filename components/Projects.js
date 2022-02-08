import React from "react";

export default function Projects(props) {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
        <h1 className=" text-5xl md:text-9xl font-bold py-20 text-center md:text-left">
          {props.sectionName}
        </h1>
      </div>
      {/* Grid starts here */}
      <div className="bg-[#F1F1F1] dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-8 py-20 pb-40">
          {props.projectMap.map((proj, idx) => (
            <ProjectCard
              title={proj.title}
              link={proj.link}
              imgUrl={proj.imgUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ProjectCard = ({ title, link, imgUrl}) => {
  return (
    <div className="flex gap-8">
      <a href={link} className="w-2/5 block shadow-2xl">
        <div className="relative overflow-hidden">
          <div className="h-72 object-cover">
            <img
              src={imgUrl}
              alt="portfolio"
              className="transform hover:scale-110 transition duration-2000 ease-out object-cover h-full w-full"
            />
          </div>
          <h1 className="absolute top-10 left-10 text-gray-50 font-bold text-xl bg-red-500 rounded-md px-2">
            {title}
          </h1>
        </div>
      </a>
      <div className="w-3/5 block bg-white dark:bg-gray-800 shadow-2xl">
        fadfsafdsa
      </div>
    </div>
  );
};
