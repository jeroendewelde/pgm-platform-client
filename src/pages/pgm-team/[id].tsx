import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { GetStaticPaths } from "next";
import React from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import client from "../../../apollo-client";
import {
  GET_ALL_TEACHERS_CLIENT,
  GET_TEACHER_BY_ID,
} from "../../../graphql/persons";
import { GetOneTeacherClient } from "../../../interfaces";
import { Card } from "../../components/Course";
import { HeroDetail } from "../../components/PGM-Team";
import { Bio, FieldExperiences } from "../../components/Teacher";
import { H2 } from "../../components/Titles/H2";
import useInViewObserver from "../../hooks/useInView";

const Container = styled.div`
  padding-bottom: 5rem;
`;

const FlexContainer = styled.div`
  @media (min-width: ${(props) => props.theme.width.medium}) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 5rem;
  }
`;

const CoursesContainer = styled(motion.div)`
  margin-top: 5rem;
  position: relative;

  .bg {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: ${(props) => props.theme.borderRadius.large};

    border: 1px solid ${(props) => props.theme.colors.purple};

    z-index: -1;
    width: 80%;
    height: 70%;
    background: -webkit-linear-gradient(
      -70deg,
      ${(props) => props.theme.colors.purple} 20%,
      ${(props) => props.theme.colors.turquoise} 100%
    );

    filter: blur(60px);
    opacity: 1;

    @media (min-width: ${(props) => props.theme.width.esmall}) {
      opacity: 0.8;
      filter: blur(90px);
      height: 80%;
    }
    @media (min-width: ${(props) => props.theme.width.medium}) {
      opacity: 0.7;
      filter: blur(90px);
    }
  }

  .course-card-list {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (min-width: ${(props) => props.theme.width.medium}) {
      margin-top: 3rem;
    }
  }
`;

interface DetailTeacherProps {
  teacher: GetOneTeacherClient;
}

const TeacherDetail = ({ teacher }: DetailTeacherProps) => {
  const { ref, inView } = useInView();
  const animation = useInViewObserver(inView);

  return (
    <Container>
      <HeroDetail teacher={teacher} />
      <FlexContainer>
        <Bio bio={teacher.personInformation.bio} />
        <FieldExperiences
          fieldExperiences={teacher.personInformation.fieldExperiences}
        />
      </FlexContainer>

      <CoursesContainer ref={ref} animate={animation}>
        <span className="bg"></span>
        <H2>Teaches following courses</H2>
        <ul className="course-card-list">
          {teacher.courses.map((course) => (
            <Card
              key={`${course.name}-${course.id}`}
              id={course.id}
              title={course.name}
              tags={course.tags}
              learningLine={course.learningLine.color}
            />
          ))}
        </ul>
      </CoursesContainer>
    </Container>
  );
};

export default TeacherDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  //   const { data, error } = await client.query({
  //     query: GET_ALL_TEACHERS_CLIENT,
  //   });

  //   if (error) {
  //     console.log(error);
  //   }

  //   return {
  //     paths: data.teachers.map((teacher: { id: any }) => ({
  //       params: {
  //         id: teacher.id.toString(),
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
    query: GET_TEACHER_BY_ID,
    variables: { id: id },
  });

  console.log(data);

  if (error) {
    console.log(error);
  }

  return {
    props: {
      teacher: data.person,
    },
    revalidate: 60,
  };
};
