import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

import greenIcon from "../../assets/learning-line/green.svg";
import { transparentize } from "polished";
import Tag from "./Tag";

const Container = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 0.5rem;
  border-bottom: 3px solid ${(props) => props.theme.colors.green};
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.279);
  -webkit-backdrop-filter: blur(2em);
  backdrop-filter: blur(2em);
  width: 100%;
  height: 12rem;
  margin-bottom: 1rem;

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
    background-color: ${(props) => props.theme.colors.green};
    border-radius: ${(props) => props.theme.borderRadius.circle};
    transition: ${(props) => props.theme.transition.normal};
  }

  &:hover .Dot {
    transform: scale(26.5);
  }

  &:hover .CTA_text {
    color: ${(props) => props.theme.colors.white};
  }

  &:hover {
    box-shadow: ${(props) => transparentize(0.9, props.theme.colors.green)} 0px
        1px 1px 0px inset,
      ${(props) => transparentize(0.75, props.theme.colors.green)} 0px 50px
        100px -20px,
      ${(props) => transparentize(0.7, props.theme.colors.green)} 0px 30px 60px -30px;
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
}

const Card = ({ tags }: CardProps) => {
  return (
    <Container>
      <Title>
        <Image src={greenIcon} width={30} height={30} alt="Computer systems" />
        <h3>Interactive Virtual Reality</h3>
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
