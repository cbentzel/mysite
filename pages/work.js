import userData from "@constants/data";
import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import Projects from "../components/Projects";

export default function projects() {
  return (
    <ContainerBlock title="Work">
      <Projects sectionName="Work" projectMap={userData.work}/>
    </ContainerBlock>
  );
}
