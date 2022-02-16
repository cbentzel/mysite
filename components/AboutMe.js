import React from "react";
import userData from "@constants/data";
import Image from "next/image";

export default function AboutMe() {
  return (
    <section className="">
      <div className="flex flex-col self-stretch items-center overflow-hidden gap-8">
        {/* Text container */}
        <div className="w-full flex flex-col mx-auto justify-evenly text-center pt-4 px-4 text-xs sm:text-sm space-y-4 md:text-lg lg:text-xl">
          <div className="">
            Hi - I'm Chris Bentzel!
          </div>
          <div className="">
            I enjoy building great products, as well as the teams that build those products.
          </div>
          <div className="">
            In my personal life, I spend time with my family, exercise outdoors, read, and work on hobby projects.
          </div>
          <div className="">
            I hope you experience something which makes you smile today.
          </div>
        </div>
        {/* Image container */}
        <div className="lg:block relative w-3/4 lg:w-1/2">
            <Image src={userData.avatarUrl} alt="avatar" width="1944" height="1726" placeholder="blur" className="shadow" />
        </div>
      </div>
    </section>
  );
}
