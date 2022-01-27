import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { CourseClient } from "../../../interfaces";
import useInViewObserver from "../../hooks/useInView";
import { Card } from "../Project";
import { GlitchTitle } from "../Titles/GlitchTitle";

const Container = styled(motion.section)`
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
  const { ref, inView } = useInView();
  const animation = useInViewObserver(inView);

  console.log(course);

  return (
    <>
      {course.projects && course.projects.length > 0 ? (
        <Container ref={ref} animate={animation}>
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
