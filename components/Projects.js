import React from "react";

export default function Projects(props) {
  return (
    <section className="">
      {/* Grid starts here */}
      <div className="">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-8 md:gap-16 py-8 pb-40">
          {props.projectMap.map((proj, idx) => (
            <ProjectCard
              title={proj.title}
              link={proj.link}
              imgUrl={proj.imgUrl}
              description={proj.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ProjectCard = ({ title, link, imgUrl, description }) => {
  return (
    <div>
      <div className="flex flex-col gap-4 px-8 items-center">
          <div className="w-full block text-2xl md:text-3xl lg:text-4xl text-center text-gray-700 dark:text-gray-300">
            {title}
          </div>
        <a href={link} className="w-full block shadow-xl md:shadow-2xl">
          <div className="relative overflow-hidden">
            <div className="object-cover">
              <img
                src={imgUrl}
                alt="portfolio"
                className="transform hover:scale-110 transition duration-2000 ease-out object-cover h-full w-full"
              />
            </div>
          </div>
        </a>
        <div className="w-full block text-sm md:text-lg font-serif font-light text-gray-700 dark:text-gray-300 pr-8">
          {description}
        </div>
      </div>
      <div className="h-4">

      </div>
    </div>
  );
};
