import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import client from "../../../apollo-client";
import {
  GET_ALL_COURSES,
  GET_COURSESBY_LEARNINGLINE_ID,
} from "../../../graphql/courses";
import { GET_ALL_LEARNING_LINES } from "../../../graphql/learningLines";
import { Course, LearningLine } from "../../../interfaces";
import { Card } from "../../components/Course";
import Filter from "../../components/Course/Filter";
import { GlitchTitle } from "../../components/Titles/GlitchTitle";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.8,
    },
  },
};

const FilterContainer = styled(motion.div)`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    flex-direction: row;
  }

  .text {
    font-weight: ${(props) => props.theme.fontWeights.bold};
    font-size: ${(props) => props.theme.fontSizes.small};
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colors.purple};

    @media (min-width: ${(props) => props.theme.width.medium}) {
      margin-right: 2rem;
      font-size: ${(props) => props.theme.fontSizes.normal};
    }
  }
`;

const CoursesContainer = styled.div`
  margin-top: 2rem;
  position: relative;

  .bg {
    position: absolute;
    top: 40%;
    left: 40%;
    transform: translate(-50%, -50%);
    border-radius: ${(props) => props.theme.borderRadius.large};

    border: 1px solid ${(props) => props.theme.colors.purple};

    z-index: -1;
    width: 80%;
    height: 80%;
    /* background: -webkit-linear-gradient(
      -70deg,
      ${(props) => props.theme.colors.purple} 20%,
      ${(props) => props.theme.colors.turquoise} 100%
    ); */
    background-size: 300% 300%;
    background-image: linear-gradient(
      -45deg,
      ${(props) => props.theme.colors.turquoise} 0%,
      ${(props) => props.theme.colors.blue} 25%,
      ${(props) => props.theme.colors.purple} 51%,
      ${(props) => props.theme.colors.pink} 100%
    );

    filter: blur(150px);
    opacity: 0.5;

    /* @media (min-width: ${(props) => props.theme.width.esmall}) {
      filter: blur(90px);
      height: 80%;
    }
    @media (min-width: ${(props) => props.theme.width.medium}) {
      filter: blur(90px);
    } */

    animation: background-lava 10s infinite ease;

    @keyframes background-lava {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  }

  .courses-list {
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
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <GlitchTitle>{selected || "Alle"}</GlitchTitle>
      <FilterContainer
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        exit={{ opacity: 0, x: -100 }}
      >
        <span className="text">Filteren op </span>
        <Filter learningLines={learningLines} onChange={handleLeerlijnChange} />
      </FilterContainer>
      <CoursesContainer>
        <span className="bg"></span>

        <motion.ul variants={stagger} className="courses-list">
          {!selected &&
            courses.map((course) => (
              <Card
                id={course.id}
                key={course.id}
                learningLine={course.learningLine.color}
                title={course.name}
                tags={course.tags}
              />
            ))}
        </motion.ul>

        {selected && (
          <motion.ul variants={stagger} className="courses-list">
            {coursesByLearningLineId.map((course: Course) => (
              <Card
                id={course.id}
                key={course.id}
                learningLine={course.learningLine.color}
                title={course.name}
                tags={course.tags}
              />
            ))}
          </motion.ul>
        )}
      </CoursesContainer>
    </motion.div>
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
