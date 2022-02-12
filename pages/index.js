import ContainerBlock from "../components/ContainerBlock";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";

export default function Home({ repositories }) {
  return (
    <ContainerBlock
      title="Chris Bentzel"
      description="Chris Bentzel's home page."
    >
      <AboutMe />
    </ContainerBlock>
  );
}
