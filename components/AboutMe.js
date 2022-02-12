import React from "react";
import userData from "@constants/data";

export default function AboutMe() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="flex flex-row items-start overflow-hidden bg-[#F1F1F1] dark:bg-gray-900">
        {/* Text container */}
        <div className="w-1/2 mx-auto text-right lg:p-20">
          <p className="h-32">
          </p>
          <p className="font-sans text-xl">
            Hi - I'm Chris Bentzel!
          </p>
          <p className="h-16">
          </p>
          <p className="font-sans text-xl">
            I enjoy building great products, as well as the teams that build those products.
          </p>
          <p className="h-16">
          </p>
          <p className="font-sans text-xl">
            In my personal life, I spend time with my family, exercising outdoors, reading, and working on hobby projects.
          </p>
          <p className="h-16">
          </p>
          <p className="font-sans text-xl">
            I hope you experience something which makes you smile today.
          </p>
        </div>
        {/* Image container */}
        <div className="lg:block relative w-1/2 -mr-40 mt-20">
          <div className="w-3/4 ">
            <img src={userData.avatarUrl} alt="avatar" className=" shadow" />
            <div className="flex flex-row justify-between mt-4">
              <div className="flex flex-row space-x-4">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
