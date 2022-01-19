import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

import test from "../../assets/test/test.jpg";

import { Course } from "../../../interfaces";
import { GlitchTitle } from "../Titles/GlitchTitle";
import Link from "next/link";
import Tag from "./Tag";
import { CourseTitle } from "../Titles/CourseTitle";

const Container = styled.section`
  .flex-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1rem;

    justify-content: space-between;
    flex-wrap: wrap;

    .breadcrum {
      margin-right: 1rem;
      margin-bottom: 1rem;

      @media (min-width: ${(props) => props.theme.width.medium}) {
        margin-bottom: 2rem;
      }
      a {
        display: flex;
        align-items: center;

        &:hover {
          .cta {
            color: ${(props) => props.theme.colors.turquoise};
          }

          .icon {
            transform: translateX(-0.5rem);
          }
        }

        .icon {
          transition: ${(props) => props.theme.transition.bounce};
          font-size: ${(props) => props.theme.fontSizes.medium};
          margin-right: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;

          @media (min-width: ${(props) => props.theme.width.esmall}) {
            font-size: ${(props) => props.theme.fontSizes.semimedium};
          }
        }

        .cta {
          transition: ${(props) => props.theme.transition.normal};
          font-size: ${(props) => props.theme.fontSizes.small};

          @media (min-width: ${(props) => props.theme.width.esmall}) {
            font-size: ${(props) => props.theme.fontSizes.normal};
          }
        }
      }
    }
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
  course: Course;
}

const HeroCourse = ({ course }: HeroCourseProps) => {
  return (
    <Container>
      <CourseTitle learningLine={course.learningLine.color}>
        {course.name}
      </CourseTitle>
      <div className="flex-title">
        <div className="breadcrum">
          <Link href="/vakken">
            <a>
              <span className="icon">
                <MdOutlineKeyboardBackspace />
              </span>
              <span className="cta">Ga terug naar vakken</span>
            </a>
          </Link>
        </div>
        <div className="tags">
          {course.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
      <div className="flex">
        <div className="image-container">
          <Image src={test} objectFit="cover" layout="fill" />
        </div>
        <div className="description">
          <p>{course.description}</p>
        </div>
      </div>
    </Container>
  );
};

export default HeroCourse;
