import React, { useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

import { CourseTitle } from "../Titles/CourseTitle";

import test from "../../assets/test/test.jpg";
import { Course } from "../../../interfaces";
import Tag from "../Course/Tag";
import CTALink from "../Course/CTALink";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CourseListItem = styled.div`
  width: 100%;
  margin-top: -1rem;
  margin-bottom: 3rem;
  transition: ${(props) => props.theme.transition.normal};

  @media (min-width: ${(props) => props.theme.width.esmall}) {
    margin-left: 1rem;
    padding-right: 1rem;
    margin-bottom: 5rem;
  }

  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin-left: 4rem;
    padding-right: 4rem;
    margin-bottom: 8rem;
  }

  .bullet {
    border-radius: 50%;
    margin-top: 5px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    margin-left: -45px;
    width: 2rem;
    height: 2rem;
    border: 1px dashed ${(props) => props.theme.colors.yellow};
    background-color: ${(props) => props.theme.colors.bg_gradient_color_1};

    span {
      display: block;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      border: 3px solid ${(props) => props.theme.colors.yellow};
      background-color: ${(props) => props.theme.colors.bg_gradient_color_1};
      box-shadow: 0 0 10px ${(props) => props.theme.colors.yellow},
        0 0 20px ${(props) => props.theme.colors.yellow},
        0 0 5px inset ${(props) => props.theme.colors.yellow};
    }
  }

  h3 {
    margin: 0;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${(props) => props.theme.width.small}) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 15rem;
  width: 100%;

  margin-top: 2rem;

  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadius.small};

  @media (min-width: ${(props) => props.theme.width.small}) {
    height: 20rem;
    min-width: 20rem;
    width: 20rem;
    margin-right: 2.5rem;
  }
  @media (min-width: ${(props) => props.theme.width.large}) {
    height: 30rem;
    min-width: 30rem;
    width: 30rem;
    margin-right: 3.5rem;
  }
`;

const Description = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  @media (min-width: ${(props) => props.theme.width.small}) {
    margin-top: 2rem;
    min-height: 20rem;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6; /* number of lines to show */
    -webkit-box-orient: vertical;

    /* @media (min-width: ${(props) => props.theme.width.small}) {
      -webkit-line-clamp: 8;
    } */
  }

  .cta-container {
    margin-top: 2rem;
  }

  ul {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    li {
      span {
        font-family: ${(props) => props.theme.fontFamilies.secondary};
        font-size: ${(props) => props.theme.fontSizes.small};
      }
    }
  }
`;

const Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, type: "spring", bounce: 0.3 },
  },
  hidden: { opacity: 0, y: 100, type: "spring", bounce: 0.3 },
};

interface Props {
  course: Course;
}
const ListItem = ({ course }: Props) => {
  const animation = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      animation.start("visible");
    }

    if (!inView) {
      animation.start("hidden");
    }
  }, [animation, inView]);

  return (
    <CourseListItem>
      <div className="bullet">
        <span></span>
      </div>

      <motion.div
        ref={ref}
        animate={animation}
        initial="hidden"
        variants={Variants}
      >
        <CourseTitle learningLine={course.learningLine.color}>
          {course.name}
        </CourseTitle>
        <FlexContainer>
          <ImageContainer>
            <Image src={test} layout="fill" objectFit="cover" />
          </ImageContainer>
          <Description>
            <ul>
              {course.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </ul>

            <p>{course.description}</p>

            <div className="cta-container">
              <CTALink href={`/vakken/${course.id}`}>
                Meer over {course.name}
              </CTALink>
            </div>
          </Description>
        </FlexContainer>
      </motion.div>
    </CourseListItem>
  );
};

export default ListItem;
