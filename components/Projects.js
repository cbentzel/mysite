import React from "react";

export default function Projects(props) {
  return (
    <section className="bg-white dark:bg-gray-800">
      {/* Grid starts here */}
      <div className="bg-[#F1F1F1] dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-8 py-20 pb-40">
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
      <div className="flex gap-16">
        <a href={link} className="w-2/5 block md:shadow-2xl">
          <div className="relative overflow-hidden">
            <div className="object-contain">
              <img
                src={imgUrl}
                alt="portfolio"
                className="transform hover:scale-110 transition duration-2000 ease-out object-cover h-full w-full"
              />
            </div>
          </div>
        </a>
        <div className="w-3/5 block text-sm md:text-lg font-serif font-light text-gray-700 dark:text-gray-300">
          {description}
        </div>
      </div>
      <div className="h-4">

      </div>
      <div className="flex gap-16">
        <div className="w-2/5 block text-sm md:text-xl h-16 text-center text-gray-700 dark:text-gray-300">
          {title}
        </div>
        <div className="w-3/5"></div>
      </div>
    </div>
  );
};
