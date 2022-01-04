import client from "../../apollo-client";

import CourseList from "../components/Course/CourseList";

import { GET_ALL_COURSES } from "../../graphql/courses";
import { Course } from "../../interfaces";

interface HomeProps {
  courses: Course[];
}

export default function Home({ courses }: HomeProps) {
  return (
    <>
      <CourseList courses={courses} />
    </>
  );
}

export async function getStaticProps() {
  const { data, error } = await client.query({
    query: GET_ALL_COURSES,
  });

  if (error) {
    console.log(error);
  }

  return {
    props: {
      courses: data.courses,
    },
  };
}
