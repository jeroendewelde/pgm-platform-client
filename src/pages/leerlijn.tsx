import Image from "next/image";
import React from "react";
import styled from "styled-components";

import { GlitchTitle } from "../components/Titles/GlitchTitle";
import { H2 } from "../components/Titles/H2";

import { ListItem } from "../components/Leerlijn";
import { transparentize } from "polished";

const SuperContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;

  .ll-title-m {
  }

  .ll-title-p {
    padding-bottom: 1rem;
  }

  .titles {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    border-bottom: 2px solid ${(props) => props.theme.colors.purple};
    border-top: 2px solid ${(props) => props.theme.colors.purple};
    background-color: ${(props) =>
      transparentize(0.9, props.theme.colors.purple)};
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);

    h2 {
      margin: 0;
      font-weight: ${(props) => props.theme.fontWeights.bold};
      color: ${(props) => props.theme.colors.pink};
    }
  }
`;

const Container = styled.div`
  margin-top: 2rem;
  margin-left: 8.333333%;
  position: relative;

  .beginLine {
    position: absolute;

    svg {
      left: -45px;
      top: 5rem;
      width: 1.9rem;
      position: relative;
      height: 10rem;
      margin-left: 1rem;

      @media (min-width: ${(props) => props.theme.width.small}) {
        width: 3.1rem;
      }

      @media (min-width: ${(props) => props.theme.width.medium}) {
        width: 4.5rem;
        top: 4rem;
      }

      path {
        fill: none;
        stroke: ${(props) => props.theme.colors.turquoise};
        stroke-width: 2px;
        /* vector-effect: non-scaling-stroke; */
      }
    }
  }

  .endline {
    transform: scale(1, -1);

    svg {
      top: 4.2rem;

      @media (min-width: ${(props) => props.theme.width.small}) {
        top: 3.4rem;
      }

      @media (min-width: ${(props) => props.theme.width.medium}) {
        top: 2.5rem;
      }
    }
  }

  .courseList,
  .last {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 5rem;

    /* &::before {
      z-index: -1;
      position: absolute;
      top: -30rem;
      bottom: 0;
      left: -29px;
      display: block;
      width: 2px;
      content: "";
      background-color: ${(props) => props.theme.colors.turquoise};
      box-shadow: 0 0 10px ${(props) => props.theme.colors.turquoise},
        0 0 20px ${(props) => props.theme.colors.turquoise};
    } */

    &::after {
      z-index: -1;
      position: absolute;
      top: 0;
      bottom: -15.5rem;
      left: -29px;
      display: block;
      width: 2px;
      content: "";
      background-color: ${(props) => props.theme.colors.turquoise};
      box-shadow: 0 0 10px ${(props) => props.theme.colors.turquoise},
        0 0 20px ${(props) => props.theme.colors.turquoise};
    }
  }

  .elective-course {
    padding-left: 1rem;
    padding-top: 6.5rem;

    .bullet {
      left: 1.8rem;
      border: none;

      @media (min-width: ${(props) => props.theme.width.small}) {
        left: 3.1rem;
      }
      @media (min-width: ${(props) => props.theme.width.medium}) {
        left: 4.4rem;
      }
    }

    @media (min-width: ${(props) => props.theme.width.small}) {
      padding-left: 3rem;
    }

    &::before {
      z-index: -1;
      position: absolute;
      top: 8rem;
      bottom: 0;
      left: 0px;
      display: block;
      width: 2px;
      content: "";
      background-color: ${(props) => props.theme.colors.turquoise};
      box-shadow: 0 0 10px ${(props) => props.theme.colors.turquoise},
        0 0 20px ${(props) => props.theme.colors.turquoise};
      @media (min-width: ${(props) => props.theme.width.small}) {
        left: 20px;
      }
      @media (min-width: ${(props) => props.theme.width.medium}) {
        left: 40px;
      }
    }
  }

  .last {
    &::after {
      @media (min-width: ${(props) => props.theme.width.medium}) {
        bottom: -33.7rem;
      }
    }
  }

  .last-bullet {
    bottom: -15.5rem;
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

    @media (min-width: ${(props) => props.theme.width.medium}) {
      display: none;
    }

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
`;

const LeerlijnPage = () => {
  return (
    <SuperContainer>
      <div className="titles">
        <GlitchTitle>Eerst jaar</GlitchTitle>
        <h2>Semester 1</h2>
      </div>
      <Container>
        <ul className="courseList">
          <ListItem />
          <ListItem />
          <ListItem />
        </ul>
      </Container>
      <div className="titles">
        <h2>Semester 2</h2>
      </div>
      <Container>
        <ul className="courseList">
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </ul>
        <span className="beginLine">
          <svg viewBox="0 0 113 142">
            <path
              d="m1-8c0 75 108 75 108 150"
              stroke-width="2"
              vectorEffect="none-scaling-stroke"
            ></path>
          </svg>
        </span>
        <ul className="courseList elective-course">
          <ListItem />
          <ListItem />
        </ul>
        <span className="beginLine endline">
          <svg viewBox="0 0 113 142">
            <path
              d="m1-8c0 75 108 75 108 150"
              stroke-width="2"
              vectorEffect="none-scaling-stroke"
            ></path>
          </svg>
        </span>
      </Container>

      <div className="titles">
        <GlitchTitle>Tweede jaar</GlitchTitle>
        <h2>Semester 1</h2>
      </div>
      <Container>
        <ul className="courseList ">
          <ListItem />
          <ListItem />
          <ListItem />
        </ul>
        <div className="titles">
          <h2>Semester 2</h2>
        </div>
        <span className="beginLine">
          <svg viewBox="0 0 113 142">
            <path
              d="m1-8c0 75 108 75 108 150"
              stroke-width="2"
              vectorEffect="none-scaling-stroke"
            ></path>
          </svg>
        </span>
        <ul className="courseList elective-course last">
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </ul>
        <span className="beginLine endline">
          <svg viewBox="0 0 113 142">
            <path
              d="m1-8c0 75 108 75 108 150"
              stroke-width="2"
              vectorEffect="none-scaling-stroke"
            ></path>
          </svg>
        </span>
        <div className="last-bullet">
          <span></span>
        </div>
      </Container>
    </SuperContainer>
  );
};

export default LeerlijnPage;
