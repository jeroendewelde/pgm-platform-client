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
        </ul>
      </Container>

      <div className="titles">
        <GlitchTitle>Tweede jaar</GlitchTitle>
        <h2>Semester 1</h2>
      </div>
      <Container>
        <ul className="courseList last">
          <ListItem />
          <ListItem />
          <ListItem />
        </ul>
        <div className="last-bullet">
          <span></span>
        </div>
      </Container>
    </SuperContainer>
  );
};

export default LeerlijnPage;
