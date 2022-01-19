import React, { useEffect, useState } from "react";
import styled from "styled-components";
import client from "../../../apollo-client";
import {
  GET_ALL_COURSES,
  GET_COURSESBY_LEARNINGLINE_ID,
} from "../../../graphql/courses";
import { GET_ALL_LEARNING_LINES } from "../../../graphql/learningLines";
import {
  Course,
  CourseByLearningLineId,
  LearningLine,
} from "../../../interfaces";
import { Card } from "../../components/Course";
import { GlitchTitle } from "../../components/Titles/GlitchTitle";
import { Filter } from "../../components/Vakken";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .text {
    font-weight: ${(props) => props.theme.fontWeights.bold};
    font-size: ${(props) => props.theme.fontSizes.small};
    margin-right: 1rem;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colors.purple};
  }
`;

const CoursesContainer = styled.div`
  margin-top: 5rem;
  position: relative;

  /* .bg {
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
  } */

  ul {
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

interface CoursesPageProps {
  courses: Course[];
  learningLines: LearningLine[];
}

const CoursesPage = ({ courses, learningLines }: CoursesPageProps) => {
  const [selected, setSelected] = useState("");
  const [coursesByLearningLineId, setCoursesByLearningLineId] = useState([]);

  const handleLeerlijnChange = (value: string) => {
    setSelected(value);
  };

  const getCoursesByLearningLineId = async () => {
    let learningLineId;
    switch (selected) {
      case "Alle":
        learningLineId = 0;
        break;
      case "Business & Communication":
        learningLineId = 1;
        break;
      case "Applied Information Technology":
        learningLineId = 2;
        break;
      case "Creative Design & Development":
        learningLineId = 3;
        break;
      case "Computer Programming":
        learningLineId = 4;
        break;
      case "Workplace Learning":
        learningLineId = 5;
        break;
    }

    if (learningLineId === 0) {
      const { data, error } = await client.query({
        query: GET_ALL_COURSES,
      });
      if (error) {
        console.log(error);
      }
      setCoursesByLearningLineId(data.courses);
    } else {
      const { data, error } = await client.query({
        query: GET_COURSESBY_LEARNINGLINE_ID,
        variables: {
          learningLineId: learningLineId,
        },
      });

      if (error) {
        console.log(error);
      }
      setCoursesByLearningLineId(data.coursesByLearningLineId);
    }
  };

  useEffect(() => {
    if (!selected) return;
    getCoursesByLearningLineId();
  }, [selected]);

  return (
    <>
      <FilterContainer>
        <span className="text">Filteren op </span>
        <Filter learningLines={learningLines} onChange={handleLeerlijnChange} />
      </FilterContainer>
      <CoursesContainer>
        <span className="bg"></span>
        <GlitchTitle>{selected || "Alle"}</GlitchTitle>

        <ul>
          {!selected &&
            courses.map((course) => (
              <Card
                key={course.id}
                learningLine={course.learningLine.color}
                title={course.name}
                tags={course.tags}
              />
            ))}
        </ul>

        {selected && (
          <ul>
            {coursesByLearningLineId.map((course: Course) => (
              <Card
                key={course.id}
                learningLine={course.learningLine.color}
                title={course.name}
                tags={course.tags}
              />
            ))}
          </ul>
        )}
      </CoursesContainer>
    </>
  );
};

export default CoursesPage;

export async function getStaticProps() {
  const queryMultiple = async () => {
    const query_Courses = await client.query({
      query: GET_ALL_COURSES,
    });

    const query_LearningLines = await client.query({
      query: GET_ALL_LEARNING_LINES,
    });

    return [query_Courses, query_LearningLines];
  };

  const [query_Courses, query_LearningLines] = await queryMultiple();
  const { data, error, loading } = query_Courses;
  const {
    data: data_LearningLines,
    error: error_LearningLines,
    loading: loading_LearningLines,
  } = query_LearningLines;

  return {
    props: {
      courses: data.courses,
      learningLines: data_LearningLines.learningLines,
    },
  };
}
