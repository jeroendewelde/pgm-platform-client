import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

import Tag from "./Tag";

import greenIcon from "../../assets/learning-line/green.svg";
import blueIcon from "../../assets/learning-line/blue.svg";
import orangeIcon from "../../assets/learning-line/orange.svg";
import redIcon from "../../assets/learning-line/red.svg";
import pinkIcon from "../../assets/learning-line/pink.svg";

const Container = styled.div<CardProps>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.279);
  -webkit-backdrop-filter: blur(2em);
  backdrop-filter: blur(2em);
  width: 100%;
  height: 12rem;
  margin-bottom: 1rem;

  border-bottom: ${({ learningLine }) => {
    if (learningLine === "blue") {
      return (props) => `3px solid ${props.theme.colors.blue}`;
    } else if (learningLine === "green") {
      return (props) => `3px solid ${props.theme.colors.green}`;
    } else if (learningLine === "orange") {
      return (props) => `3px solid ${props.theme.colors.orange}`;
    } else if (learningLine === "pink") {
      return (props) => `3px solid ${props.theme.colors.pink}`;
    } else if (learningLine === "red") {
      return (props) => `3px solid ${props.theme.colors.red}`;
    }
  }};

  @media (min-width: ${(props) => props.theme.width.small}) {
    width: calc(50% - 1rem);
    height: 200px;
  }

  @media (min-width: ${(props) => props.theme.width.large}) {
    width: calc(33% - 1rem);
    height: 200px;
  }

  .Dot {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    width: 1rem;
    height: 1rem;
    border-radius: ${(props) => props.theme.borderRadius.circle};
    transition: ${(props) => props.theme.transition.normal};
    background-color: ${({ learningLine }) => {
      if (learningLine === "blue") {
        return (props) => props.theme.colors.blue;
      } else if (learningLine === "green") {
        return (props) => props.theme.colors.green;
      } else if (learningLine === "orange") {
        return (props) => props.theme.colors.orange;
      } else if (learningLine === "pink") {
        return (props) => props.theme.colors.pink;
      } else if (learningLine === "red") {
        return (props) => props.theme.colors.red;
      }
    }};
  }

  &:hover .Dot {
    transform: scale(26.5);
  }

  &:hover .CTA_text {
    color: ${(props) => props.theme.colors.white};
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  h3 {
    margin-left: 0.5rem;
    font-size: ${(props) => props.theme.fontSizes.normal};
    font-family: ${(props) => props.theme.fontFamilies.secondary};
    font-weight: ${(props) => props.theme.fontWeights.light};
    position: relative;
    z-index: 99;
    margin-right: 22%;

    @media (min-width: ${(props) => props.theme.width.esmall}) {
      font-size: ${(props) => props.theme.fontSizes.medium};
    }
  }
`;

const CTA = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 20%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;

  .CTA_text {
    font-family: ${(props) => props.theme.fontFamilies.secondary};
    writing-mode: vertical-lr;
    color: ${(props) => props.theme.colors.black};
    position: relative;
    z-index: 99;
  }
`;

const FlexContainer = styled.div`
  width: 100%;
  padding-right: 18%;
  display: flex;
  flex-wrap: wrap;
`;

export interface CardProps {
  tags?: string[];
  title?: string;
  learningLine: string;
}

const Icon = ({ learningLine = "blue" }: CardProps) => {
  if (learningLine === "blue") {
    return <Image src={blueIcon} width={35} height={35} />;
  } else if (learningLine === "green") {
    return <Image src={greenIcon} width={35} height={35} />;
  } else if (learningLine === "orange") {
    return <Image src={orangeIcon} width={35} height={35} />;
  } else if (learningLine === "pink") {
    return <Image src={pinkIcon} width={35} height={35} />;
  } else if (learningLine === "red") {
    return <Image src={redIcon} width={35} height={35} />;
  } else {
    return null;
  }
};

const Card = ({ tags, learningLine, title }: CardProps) => {
  return (
    <Container learningLine={learningLine}>
      <Title>
        <Icon learningLine={learningLine} />
        <h3>{title}</h3>
      </Title>
      <CTA>
        <p className="CTA_text">Explore more</p>
        <div className="Dot"></div>
      </CTA>
      <FlexContainer>
        {tags && tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
      </FlexContainer>
    </Container>
  );
};

export default Card;
