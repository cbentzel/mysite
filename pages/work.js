import userData from "@constants/data";
import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import PastWork from "../components/PastWork";

export default function work() {
  return (
    <ContainerBlock title="Work">
      <PastWork work={userData.work} projects={userData.projects} />
    </ContainerBlock>
  );
}
