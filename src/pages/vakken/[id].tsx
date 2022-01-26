import { motion } from "framer-motion";
import { GetStaticPaths } from "next";
import React from "react";
import styled from "styled-components";
import client from "../../../apollo-client";
import {
  GET_ALL_COURSES,
  GET_COURSE_BY_ID_client,
} from "../../../graphql/courses";
import { CourseClient } from "../../../interfaces";
import {
  CourseProjects,
  DocentenCourse,
  HeroCourse,
} from "../../components/Course";

const Container = styled(motion.div)`
  padding-bottom: 5rem;
`;

interface CoursesPageProps {
  course: CourseClient;
}

const CourseDetail = ({ course }: CoursesPageProps) => {
  console.log(course);
  return (
    <Container>
      <HeroCourse course={course} />
      <DocentenCourse course={course} />
      <CourseProjects course={course} />
    </Container>
  );
};

export default CourseDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error } = await client.query({
    query: GET_ALL_COURSES,
  });

  if (error) {
    console.log(error);
  }

  return {
    paths: data.courses.map((course: { id: any }) => ({
      params: {
        id: course.id.toString(),
      },
    })),
    fallback: false,
    // fallback: "blocking",
  };
};

export const getStaticProps = async (context: { params: { id: any } }) => {
  let id = context.params.id;
  typeof id === "string" ? (id = parseInt(id)) : id;

  const { data, error } = await client.query({
    query: GET_COURSE_BY_ID_client,
    variables: { id: id },
  });

  console.log(data);

  if (error) {
    console.log(error);
  }

  return {
    props: {
      course: data.course,
    },
  };
};
