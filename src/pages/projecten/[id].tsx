import { GetStaticPaths } from "next";
import React from "react";
import client from "../../../apollo-client";
import { GET_ALL_PROJECTS, GET_PROJECT_BY_ID } from "../../../graphql/projects";
import { Project } from "../../../interfaces";
import { HeroDetail, ProjectContent } from "../../components/Project";

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  console.log(project);

  return (
    <div>
      <HeroDetail project={project} />
      <ProjectContent project={project} />
    </div>
  );
};

export default ProjectDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  //   const { data, error } = await client.query({
  //     query: GET_ALL_PROJECTS,
  //   });

  //   if (error) {
  //     console.log(error);
  //   }

  //   return {
  //     paths: data.projects.map((project: { id: any }) => ({
  //       params: {
  //         id: project.id.toString(),
  //       },
  //     })),
  //     fallback: false,
  //     // fallback: "blocking",
  //   };
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps = async (context: { params: { id: any } }) => {
  let id = context.params.id;
  typeof id === "string" ? (id = parseInt(id)) : id;

  const { data, error } = await client.query({
    query: GET_PROJECT_BY_ID,
    variables: { id: id },
  });

  console.log(data);

  if (error) {
    console.log(error);
  }

  return {
    props: {
      project: data.project,
    },
  };
};
