import { GetStaticPaths } from "next";
import React from "react";
import client from "../../../apollo-client";
import { GET_ALL_COURSES, GET_COURSE_BY_ID } from "../../../graphql/courses";
import { Course } from "../../../interfaces";

interface CoursesPageProps {
  course: Course;
}

const CourseDetail = ({ course }: CoursesPageProps) => {
  console.log(course);
  return <div></div>;
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
  };
};

export const getStaticProps = async (context: { params: { id: any } }) => {
  let id = context.params.id;
  typeof id === "string" ? (id = parseInt(id)) : id;

  const { data, error } = await client.query({
    query: GET_COURSE_BY_ID,
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
