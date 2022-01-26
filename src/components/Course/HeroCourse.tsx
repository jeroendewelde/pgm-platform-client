import Image from "next/image";
import React from "react";
import styled from "styled-components";

import test from "../../assets/test/test.jpg";

import { CourseClient } from "../../../interfaces";
import Tag from "./Tag";
import { CourseTitle } from "../Titles/CourseTitle";
import CTALink from "./CTALink";
import { motion } from "framer-motion";

const Container = styled.section`
  .flex-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1rem;

    justify-content: space-between;
    flex-wrap: wrap;
  }

  .flex {
    display: flex;
    flex-direction: column;

    @media (min-width: ${(props) => props.theme.width.medium}) {
      flex-direction: row;
    }

    .image-container {
      position: relative;
      border-radius: ${(props) => props.theme.borderRadius.small};
      overflow: hidden;
      width: 100%;
      height: 17rem;
      margin-bottom: 1rem;

      @media (min-width: ${(props) => props.theme.width.esmall}) {
        margin-bottom: 2rem;
        height: 20rem;
      }

      @media (min-width: ${(props) => props.theme.width.small}) {
        height: 25rem;
      }

      @media (min-width: ${(props) => props.theme.width.medium}) {
        min-width: 25rem;
        max-width: 35rem;
        height: 25rem;
        margin-bottom: 0;
        margin-right: 2rem;
      }
      @media (min-width: ${(props) => props.theme.width.large}) {
        min-width: 30rem;
        height: 25rem;
        margin-right: 6rem;
      }
    }

    .description {
      max-width: 50rem;
    }
  }
`;

interface HeroCourseProps {
  course: CourseClient;
}

const HeroCourse = ({ course }: HeroCourseProps) => {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{
          delay: 0.1,
          duration: 0.65,
        }}
      >
        <CourseTitle learningLine={course.learningLine.color}>
          {course.name}
        </CourseTitle>
      </motion.div>
      <motion.div
        className="flex-title"
        initial={{ opacity: 0, y: 10, zIndex: -1 }}
        animate={{ opacity: 1, y: 0, zIndex: 1 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{
          delay: 0.7,
          duration: 0.45,
        }}
      >
        <CTALink href="/vakken">Ga terug naar vakken</CTALink>
        {course.tags && course.tags.length > 0 && (
          <div className="tags">
            {course.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </motion.div>
      <div className="flex">
        <motion.div
          className="image-container"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{
            delay: 0.5,
            duration: 0.65,
          }}
        >
          <Image src={test} objectFit="cover" layout="fill" />
        </motion.div>
        <motion.div
          className="description"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{
            delay: 0.5,
            duration: 0.65,
          }}
        >
          <p>{course.description}</p>
        </motion.div>
      </div>
    </Container>
  );
};

export default HeroCourse;
