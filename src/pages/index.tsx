import styled from "styled-components";

import client from "../../apollo-client";
import { Button } from "../components/Button";
import { GlitchTitle } from "../components/Titles/GlitchTitle";
import { CourseTitle } from "../components/Titles/CourseTitle";
import { Card, CourseList } from "../components/Course";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Quote } from "../components/Quote";
import { TeacherImage } from "../components/Teacher";
import { Navigation } from "../components/layout/Navigation";

import { GET_ALL_COURSES } from "../../graphql/courses";
import { Course } from "../../interfaces";
import { Hero } from "../components/Home";

const Text = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
`;

interface HomeProps {
  courses: Course[];
}

const tags = ["react", "javascript", "typescript"];

export default function Home({ courses }: HomeProps) {
  return (
    <>
      <Hero />
      {/* 
        <GlitchTitle>Haalloo</GlitchTitle>
        <TeacherImage />
        <CourseTitle learningLine={"green"}>Computer Systems</CourseTitle>
        <Text>
          <Card tags={tags} title="computer systems" learningLine="red" />
          <Card tags={tags} title="computer systems" learningLine="green" />
          <Card tags={tags} title="computer systems" learningLine="blue" />
          <Card title="computer systems" learningLine="pink" />
        </Text>
        <CourseList />

        <Button variant="primary"> Hello </Button>

        <Quote
          source={"Phillipe De Pauw"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          }
        /> */}
      {/* <CourseList courses={courses} /> */}
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
