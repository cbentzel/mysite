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
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ProjectCard = ({ title, link, imgUrl}) => {
  return (
    <div>
      <div className="w-2/5 block text-4xl h-12 text-center text-gray-700 dark:text-gray-300">
        {title}
      </div>
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
          </div>
        </a>
        <div className="w-3/5 block">
          fadfsafdsa
        </div>
      </div>
      <div className="w-2/5 block text-6xl h-20 text-center text-gray-700 dark:text-gray-300">
      </div>
    </div>
  );
};
