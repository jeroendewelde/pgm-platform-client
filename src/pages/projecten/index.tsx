import { motion } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{
          delay: 0.3,
          duration: 0.65,
        }}
      >
        <GlitchTitle>Projecten</GlitchTitle>
      </motion.div>
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
