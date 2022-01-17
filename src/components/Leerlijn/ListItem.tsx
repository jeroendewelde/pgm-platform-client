import React from "react";
import styled from "styled-components";
import Image from "next/image";

import { CourseTitle } from "../Titles/CourseTitle";
import { Button } from "../Button";

import test from "../../assets/test/test.jpg";

const CourseListItem = styled.div`
  width: 100%;
  margin-top: -1rem;
  margin-bottom: 3rem;
  transition: ${(props) => props.theme.transition.normal};

  @media (min-width: ${(props) => props.theme.width.esmall}) {
    margin-left: 1rem;
    padding-right: 1rem;
  }

  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin-left: 4rem;
    padding-right: 4rem;
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
  border-radius: ${(props) => props.theme.borderRadius.normal};

  @media (min-width: ${(props) => props.theme.width.small}) {
    height: 20rem;
    min-width: 20rem;
    margin-right: 2.5rem;
  }
  @media (min-width: ${(props) => props.theme.width.large}) {
    height: 30rem;
    min-width: 30rem;
    margin-right: 3.5rem;
  }
`;

const Description = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${(props) => props.theme.width.small}) {
    margin-top: 2rem;
    height: 20rem;
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

  ul {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    li {
      margin-right: 1rem;
      padding: 0.3rem 0.5rem;
      font-family: ${(props) => props.theme.fontFamilies.secondary};
      font-size: ${(props) => props.theme.fontSizes.small};
      color: ${(props) => props.theme.colors.white};
      border: 1px solid ${(props) => props.theme.colors.white};
      border-radius: ${(props) => props.theme.borderRadius.small};
    }
  }
`;

const ListItem = () => {
  return (
    <CourseListItem>
      <div className="bullet">
        <span></span>
      </div>

      <CourseTitle learningLine="orange">Webdesign</CourseTitle>
      <FlexContainer>
        <ImageContainer>
          <Image src={test} layout="fill" objectFit="cover" />
        </ImageContainer>
        <Description>
          <ul>
            <li>
              <span>Linux</span>
            </li>
            <li>
              <span>Linux</span>
            </li>
            <li>
              <span>Linux</span>
            </li>
          </ul>
          <p>
            In this course you’ll learn to… Placeat earum quia tenetur nisi
            dolorem. Occaecati quae dolore asperiores et voluptatem magni ut.
            Quis deserunt molestiae libero. Enim repellat veritatis nostrum
            veritatis eos. Consequatur quibusdam maiores voluptas qui debitis
            corporis enim. In this course you’ll learn to… Placeat earum quia
            tenetur nisi dolorem. Occaecati quae dolore asperiores et voluptatem
            magni ut. Quis deserunt molestiae libero. Enim repellat veritatis
            nostrum veritatis eos. Consequatur quibusdam maiores voluptas qui
            debitis corporis enim.
          </p>

          <Button>Meer over Webdesign</Button>
        </Description>
      </FlexContainer>
    </CourseListItem>
  );
};

export default ListItem;
