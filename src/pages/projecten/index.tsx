import React from "react";
import styled from "styled-components";
import client from "../../../apollo-client";

import { GET_ALL_PROJECTS_CLIENT } from "../../../graphql/projects";
import { Project } from "../../../interfaces";
import { Card } from "../../components/Project";
import { GlitchTitle } from "../../components/Titles/GlitchTitle";

const Container = styled.div`
  .flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    margin-top: 3rem;
  }
`;

interface Props {
  projects: Project[];
}

const ProjectsPage = ({ projects }: Props) => {
  return (
    <Container>
      <GlitchTitle>Projecten</GlitchTitle>
      <ul className="flex">
        {projects.map((project) => (
          <Card key={project.id} project={project} />
        ))}
      </ul>
    </Container>
  );
};

export default ProjectsPage;

export const getStaticProps = async () => {
  const { data, error, loading } = await client.query({
    query: GET_ALL_PROJECTS_CLIENT,
  });

  if (error) {
    console.log(error);
  }

  return {
    props: {
      projects: data.projects,
    },
  };
};
