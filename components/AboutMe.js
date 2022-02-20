import React from "react";
import userData from "@constants/data";
import Image from "next/image";

export default function AboutMe() {
  return (
    <section className="grid justify-items-center py-8">
      <div className="max-w-2xl overflow-hidden gap-8">
        {/* Text container */}
        <div className="mx-auto justify-evenly text-left pt-4 px-8 text-sm md:text-lg lg:text-xl space-y-4 font-light">
          <div className="">
            Hi - I'm Chris Bentzel! But you likely already know that if you are visiting this site.
          </div>
          <div className="">
            I enjoy building great products, as well as building the teams that build those products. You can read more in the "Work" section. 
          </div>
          <div className="">
            In my personal life, I spend time with my family, exercise outdoors, read, and work on hobby projects.
          </div>
          <div className="">
            I hope you experience something which makes you smile today.
          </div>
        </div>
        {/* Image container */}
        <div className="lg:block relative mt-6">
            <Image src={userData.avatarUrl} alt="avatar" width="1944" height="1726" className="shadow" />
        </div>
      </div>
    </section>
  );
}
