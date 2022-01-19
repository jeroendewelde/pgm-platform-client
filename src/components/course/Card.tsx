import React, { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

import Tag from "./Tag";
import { CursorContext } from "../../context/CursorContext";

import greenIcon from "../../assets/learning-line/green.svg";
import blueIcon from "../../assets/learning-line/blue.svg";
import orangeIcon from "../../assets/learning-line/orange.svg";
import redIcon from "../../assets/learning-line/red.svg";
import pinkIcon from "../../assets/learning-line/pink.svg";

interface Props {
  learningLine: string;
}

const Container = styled.li<Props>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.279);
  -webkit-backdrop-filter: blur(50px);
  backdrop-filter: blur(50px);
  width: 100%;
  height: 4rem;
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

  @media (min-width: ${(props) => props.theme.width.esmall}) {
    height: 7rem;
    margin-bottom: 2rem;
  }

  @media (min-width: ${(props) => props.theme.width.small}) {
    /* width: calc(50% - 1rem); */
    height: 10rem;
    margin-bottom: 2rem;
  }

  @media (min-width: ${(props) => props.theme.width.medium}) {
    width: calc(50% - 1rem);
    height: 12rem;
  }

  @media (min-width: ${(props) => props.theme.width.large}) {
    height: 12rem;
  }

  .Dot {
    position: absolute;
    right: 1.3rem;
    bottom: 1rem;
    width: 1rem;
    height: 1rem;
    border-radius: ${(props) => props.theme.borderRadius.circle};
    transition: ${(props) => props.theme.transition.bounce};
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
    transform: scale(46.5);
  }
  @media (min-width: ${(props) => props.theme.width.esmall}) {
    &:hover .Dot {
      transform: scale(56.5);
    }

    &:hover .CTA_text {
      color: ${(props) => props.theme.colors.white};
    }
  }

  @media (min-width: ${(props) => props.theme.width.medium}) {
    &:hover .Dot {
      transform: scale(36.5);
    }
  }

  @media (min-width: ${(props) => props.theme.width.large}) {
    &:hover .Dot {
      transform: scale(56.5);
    }
  }
`;

const Title = styled.div`
  margin: 0;
  display: flex;
  align-items: center;

  h3 {
    margin: 0;
    margin-left: 0.5rem;
    font-size: ${(props) => props.theme.fontSizes.normal};
    font-family: ${(props) => props.theme.fontFamilies.primary};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    position: relative;
    z-index: 99;
    margin-right: 22%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;

    @media (min-width: ${(props) => props.theme.width.esmall}) {
      font-size: ${(props) => props.theme.fontSizes.medium};
    }

    @media (min-width: ${(props) => props.theme.width.esmall}) {
      font-size: ${(props) => props.theme.fontSizes.semimedium};
    }

    @media (min-width: ${(props) => props.theme.width.medium}) {
      font-size: ${(props) => props.theme.fontSizes.semimedium};
    }

    @media (min-width: ${(props) => props.theme.width.large}) {
      font-size: ${(props) => props.theme.fontSizes.emedium};
    }
  }
`;

const CTA = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 25%;

  justify-content: flex-end;
  padding: 1rem;
  background-color: transparent;

  @media (min-width: ${(props) => props.theme.width.esmall}) {
    background-color: ${(props) => props.theme.colors.white};
    display: flex;
  }

  @media (min-width: ${(props) => props.theme.width.medium}) {
    width: 15%;
    min-width: 4rem;
  }

  .CTA_text {
    font-size: ${(props) => props.theme.fontSizes.normal};
    font-family: ${(props) => props.theme.fontFamilies.secondary};
    color: ${(props) => props.theme.colors.black};
    position: relative;
    z-index: 99;
    display: none;

    @media (min-width: ${(props) => props.theme.width.esmall}) {
      display: block;
    }
    @media (min-width: ${(props) => props.theme.width.medium}) {
      writing-mode: vertical-rl;
    }
  }
`;

const FlexContainer = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.width.small}) {
    width: 100%;
    padding-right: 18%;
    flex-wrap: wrap;
    display: flex;
  }
`;

export interface CardProps {
  tags: string[];
  title: string;
  learningLine: string;
  id: number;
}

const Icon = ({ learningLine = "blue" }: Props) => {
  if (learningLine === "blue") {
    return <Image className="image" src={blueIcon} width={35} height={35} />;
  } else if (learningLine === "green") {
    return <Image className="image" src={greenIcon} width={35} height={35} />;
  } else if (learningLine === "orange") {
    return <Image className="image" src={orangeIcon} width={35} height={35} />;
  } else if (learningLine === "pink") {
    return <Image className="image" src={pinkIcon} width={35} height={35} />;
  } else if (learningLine === "red") {
    return <Image className="image" src={redIcon} width={35} height={35} />;
  } else {
    return null;
  }
};

const Card = ({ tags, learningLine, title, id }: CardProps) => {
  const { setCursorHover } = useContext(CursorContext);

  const handleMouseEnter = () => {
    setCursorHover(true);
    //change z-index of the card to be on top of the other cursor
    // if (document.querySelector(".cursor")) {
    //   document.querySelector(".cursor").style.zIndex = "0";
    // }
  };

  const handleMouseLeave = () => {
    setCursorHover(false);
    //change z-index of the card to be on top of the other cursor
    // if (document.querySelector(".cursor")) {
    //   document.querySelector(".cursor").style.zIndex = "11";
    // }
  };

  return (
    <Link href={`vakken/${id}`}>
      <Container
        className="Card"
        learningLine={learningLine}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Title>
          <Icon learningLine={learningLine} />
          <h3>{title}</h3>
          <div className="Dotbg"></div>
        </Title>
        <CTA>
          <p className="CTA_text">Explore more</p>
          <div className="Dot"></div>
        </CTA>
        <FlexContainer>
          {tags && tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </FlexContainer>
      </Container>
    </Link>
  );
};

export default Card;
