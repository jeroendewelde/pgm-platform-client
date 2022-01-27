import { motion } from "framer-motion";
import { lighten, transparentize } from "polished";
import React from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

import { CourseClient } from "../../../interfaces";
import useInViewObserver from "../../hooks/useInView";
import { Quote } from "../Quote";
import { SocialMediaListItem, TeacherImage } from "../Teacher";
import { GlitchTitle } from "../Titles/GlitchTitle";
import { H2 } from "../Titles/H2";
import CTALink from "./CTALink";
// import teacherFallback from "../../assets/fallback_images/fallback_teacher.png";
import teacherFallback from "../../assets/fallback_images/fallback_teacher.png";

const Container = styled(motion.section)`
  padding-top: 5rem;

  .mobile {
    margin-top: 3rem;

    @media (min-width: ${(props) => props.theme.width.small}) {
      display: none;
    }

    h2 {
      margin: 2rem 0;
    }

    .flex-end {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      transform: translateY(-2rem);
      z-index: 6;
      position: relative;
    }

    .mobileImage {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 1rem;
      padding-bottom: 2rem;

      background-color: ${(props) =>
        lighten(0.05, props.theme.colors.bg_gradient_color_1)};
      border-radius: ${(props) => props.theme.borderRadius.normal};

      div,
      svg {
        z-index: 5;
        width: 25rem;
        height: 25rem;
      }
    }
  }

  .desktop {
    display: none;
    @media (min-width: ${(props) => props.theme.width.small}) {
      margin-top: 2rem;
      display: block;
      padding-bottom: 2rem;
      border-bottom: 2px solid
        ${(props) => transparentize(0.5, props.theme.colors.purple)};
    }

    .flex-title {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      justify-content: space-between;

      h2 {
        margin-bottom: 0rem;

        @media (min-width: ${(props) => props.theme.width.small}) {
          text-align: left;
        }
      }
    }

    .desktopImage {
      display: none;
      div,
      svg {
        width: 20rem;
        height: 20rem;
        z-index: 6;
      }

      @media (min-width: ${(props) => props.theme.width.medium}) {
        div,
        svg {
          width: 25rem;
          height: 25rem;
        }
      }

      @media (min-width: ${(props) => props.theme.width.small}) {
        display: block;
        margin-left: -2.5rem;
        margin-top: 2.5rem;
      }
      @media (min-width: ${(props) => props.theme.width.medium}) {
        margin-left: -4rem;
      }
    }

    .flex {
      display: flex;
      align-items: flex-start;

      @media (min-width: ${(props) => props.theme.width.large}) {
        align-items: center;
      }

      .content {
        margin-top: 5rem;
        max-width: 50rem;
      }
    }
  }

  .socials {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 2rem;

    @media (min-width: ${(props) => props.theme.width.medium}) {
      margin-left: 2rem;
      margin-top: 2rem;
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

interface DocentenCourseProps {
  course: CourseClient;
}

const DocentenCourse = ({ course }: DocentenCourseProps) => {
  const Title = () => {
    if (course.teachers.length > 1) {
      return <GlitchTitle>Docenten</GlitchTitle>;
    } else if (course.teachers.length === 1) {
      return <GlitchTitle>Docent</GlitchTitle>;
    } else {
      return null;
    }
  };

  const { ref, inView } = useInView();
  const animation = useInViewObserver(inView);

  return (
    <>
      {course.teachers.length > 0 && (
        <Container
          ref={ref}
          animate={animation}
          initial="hidden"
          variants={Variants}
        >
          <Title />

          <ul>
            {course.teachers.map((teacher) => (
              <li key={teacher.id}>
                <div className="mobile">
                  <H2>{teacher.firstName + " " + teacher.lastName}</H2>
                  <div className="mobileImage">
                    <TeacherImage
                      image={
                        teacher.avatarUrl ? teacher.avatarUrl : teacherFallback
                      }
                    />
                  </div>
                  <div className="flex-end">
                    <CTALink href={`/pgm-team/${teacher.id}`}>
                      Ontdek meer over {teacher.firstName}
                    </CTALink>
                  </div>
                  <ul className="socials">
                    {teacher?.personInformation.socialMedias.map(
                      (socialMedia) => (
                        <SocialMediaListItem
                          key={teacher?.firstName + teacher?.lastName}
                          socialMedia={socialMedia}
                        />
                      )
                    )}
                  </ul>
                  <div className="quote">
                    <Quote content={teacher.personInformation.bio} />
                  </div>
                </div>

                <div className="desktop">
                  <div className="flex-title">
                    <H2>{teacher.firstName + " " + teacher.lastName}</H2>
                    <CTALink href={`/pgm-team/${teacher.id}`}>
                      Ontdek meer over {teacher.firstName}
                    </CTALink>
                  </div>

                  <div className="flex">
                    <div className="desktopImage">
                      <TeacherImage
                        image={
                          teacher.avatarUrl
                            ? teacher.avatarUrl
                            : teacherFallback
                        }
                      />
                    </div>

                    <div className="content">
                      <ul className="socials">
                        {teacher.personInformation.socialMedias.map(
                          (socialMedia) => (
                            <SocialMediaListItem
                              key={`${teacher?.firstName}-${socialMedia?.url}`}
                              socialMedia={socialMedia}
                            />
                          )
                        )}
                      </ul>
                      <div className="quote">
                        <Quote content={teacher.personInformation.bio} />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      )}
    </>
  );
};

export default DocentenCourse;
