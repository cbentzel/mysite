import React from "react";
import userData from "@constants/data";
import Image from "next/image";

export default function AboutMe() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="flex flex-row self-stretch items-center overflow-hidden bg-[#F1F1F1] dark:bg-gray-900 gap-8">
        {/* Text container */}
        <div className="w-1/2 flex flex-col mx-auto justify-evenly text-right text-lg">
          <div className="">
            <p>
              Hi - I'm Chris Bentzel!
            </p>
          </div>
          <div className="">
            <p>
              I enjoy building great products, as well as the teams that build those products.
            </p>
          </div>
          <div className="">
            <p>
              In my personal life, I spend time with my family, exercising outdoors, reading, and working on hobby projects.
            </p>
          </div>
          <div className="">
            <p>
              I hope you experience something which makes you smile today.
            </p>
          </div>
        </div>
        {/* Image container */}
        <div className="lg:block relative w-1/2">
            <Image src={userData.avatarUrl} alt="avatar" width="1944" height="1726" placeholder="blur" className="shadow" />
        </div>
      </div>
    </section>
  );
}
