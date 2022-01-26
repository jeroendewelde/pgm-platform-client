import { motion, useAnimation } from "framer-motion";
import { darken } from "polished";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { FieldExperience } from "../../../interfaces";
import { H2 } from "../Titles/H2";

const Container = styled(motion.section)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.colors.red};
  border-bottom: 1px solid ${(props) => props.theme.colors.red};
  padding: 3rem 0.5rem;
  padding-right: 0.75rem;

  h2 {
    margin-right: 0.5rem;
    @media (min-width: ${(props) => props.theme.width.small}) {
      margin-right: 2rem;
    }
  }

  @media (min-width: ${(props) => props.theme.width.medium}) {
    flex-direction: column;
    align-items: flex-start;
    min-width: 40%;
    margin-left: 4rem;
    border: none;
    padding: 0;

    h2 {
      margin-right: 0rem;
    }
  }
  @media (min-width: ${(props) => props.theme.width.large}) {
    margin-left: 8rem;
  }

  ul {
    position: relative;
    margin-left: 1rem;

    @media (min-width: ${(props) => props.theme.width.medium}) {
      margin-top: 3rem;
      flex-direction: column;
      align-items: flex-start;
      min-width: 40%;
      margin-left: 2rem;
    }

    &::after {
      border-radius: ${(props) => props.theme.borderRadius.small};
      content: "";
      position: absolute;
      bottom: -1rem;
      top: -1rem;
      left: 0rem;
      width: 2px;
      background-color: ${(props) => props.theme.colors.purple};
      box-shadow: 0 0 10px ${(props) => props.theme.colors.purple},
        0 0 20px ${(props) => props.theme.colors.purple};
    }

    li {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 1rem;
      position: relative;
      margin-left: 1rem;

      @media (min-width: ${(props) => props.theme.width.medium}) {
        margin-bottom: 2rem;
      }

      .company {
        margin-left: 1rem;
        font-weight: bold;
        font-size: ${(props) => props.theme.fontSizes.normal};
        color: ${(props) => props.theme.colors.white};

        @media (min-width: ${(props) => props.theme.width.esmall}) {
          font-size: ${(props) => props.theme.fontSizes.medium};
        }
      }

      .function {
        font-family: ${(props) => props.theme.fontFamilies.secondary};
        font-size: ${(props) => props.theme.fontSizes.small};
        color: ${(props) => darken(0.3, props.theme.colors.white)};
        margin-left: 1rem;

        @media (min-width: ${(props) => props.theme.width.esmall}) {
          font-size: ${(props) => props.theme.fontSizes.normal};
        }

        &::before {
          content: "-";
          font-weight: ${(props) => props.theme.fontWeights.light};
          margin-right: 1rem;
        }
      }

      .bullet {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: ${(props) => props.theme.colors.bg_gradient_color_2};
        border: 2px solid ${(props) => props.theme.colors.turquoise};
        position: absolute;
        left: -1.4rem;
        z-index: 2;
        box-shadow: 0 0 10px ${(props) => props.theme.colors.turquoise},
          0 0 20px ${(props) => props.theme.colors.turquoise},
          inset 0 0 5px ${(props) => props.theme.colors.turquoise};
      }
    }
  }
`;

interface FieldExperienceProps {
  fieldExperiences?: FieldExperience[];
}

const FieldExperiences = ({ fieldExperiences }: FieldExperienceProps) => {
  const { ref, inView } = useInView();
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        x: 0,
        transition: {
          duration: 1,
          type: "spring",
          bounce: 0.3,
        },
      });
    }

    if (!inView) {
      animation.start({
        opacity: 0,
        x: 100,
        transition: {
          duration: 1,
          type: "spring",
          bounce: 0.3,
        },
      });
    }
  }, [animation, inView]);
  return (
    <Container ref={ref} animate={animation}>
      <H2>Field Experience</H2>
      <ul>
        {fieldExperiences?.map((fieldExperience: FieldExperience) => (
          <li key={fieldExperience.id}>
            <span className="bullet" />
            <span className="company">{fieldExperience.company}</span>
            <span className="function">{fieldExperience.function}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default FieldExperiences;
