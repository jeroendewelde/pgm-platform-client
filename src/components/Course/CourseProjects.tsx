import React from "react";
import styled from "styled-components";
import { CourseClient } from "../../../interfaces";
import { Card } from "../Project";
import { GlitchTitle } from "../Titles/GlitchTitle";

const Container = styled.section`
  padding-top: 5rem;
`;

const ProjectsList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  margin-top: 3rem;
`;

interface CourseProjectsProps {
  course: CourseClient;
}

const CourseProjects = ({ course }: CourseProjectsProps) => {
  console.log(course.projects);

  return (
    <>
      {course.projects && course.projects.length > 0 ? (
        <Container>
          <>
            <GlitchTitle>Projecten</GlitchTitle>
            <ProjectsList>
              {course.projects.map((project) => (
                <Card key={project.id} project={project} />
              ))}
            </ProjectsList>
          </>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default CourseProjects;
