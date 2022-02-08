import React from "react";
import userData from "@constants/data";

export default function Hero() {
  return (
    <div className="flex flex-row justify-center items-start overflow-hidden">
      {/* Text container */}
      <img src={userData.homeUrl}/>
    </div>
  );
}
