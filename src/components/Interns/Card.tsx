import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";

import companyTest from "../../assets/test/company_test.jpg";
import profile from "../../assets/test/profile.jpg";

const CompanyName = styled.h3`
  padding-left: 1rem;
`;

const Container = styled.div`
  width: 18rem;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadius.normal};
  background-color: ${(props) =>
    transparentize(0.5, props.theme.colors.turquoise)};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px dashed ${(props) => props.theme.colors.turquoise};
  transition: ${(props) => props.theme.transition.normal};

  &:hover .student__list {
    left: 0;
  }
`;

const CardImage = styled.div`
  padding: 0.5rem;
  position: relative;
  height: 10.125rem;
  width: 100%;

  .student__list {
    position: absolute;
    bottom: 0.5rem;
    left: -100%;
    background-color: ${(props) =>
      transparentize(0.4, props.theme.colors.black)};
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    display: flex;
    flex-wrap: wrap;
    padding-left: 0.5rem;
    margin-right: 2rem;
    border-bottom-right-radius: ${(props) => props.theme.borderRadius.large};
    border-top-right-radius: ${(props) => props.theme.borderRadius.large};
    transition: ${(props) => props.theme.transition.normal};
    max-width: 16rem;

    li {
      cursor: pointer;
      position: relative;
      width: 2.5rem;
      height: 2.5rem;
      margin: 0.2rem 0;
      margin-right: 0.5rem;
      border: 2px solid ${(props) => props.theme.colors.pink};
      border-radius: ${(props) => props.theme.borderRadius.circle};

      img {
        border-radius: ${(props) => props.theme.borderRadius.circle};
      }
    }
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ActiveStudent = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;

  img {
    border-radius: ${(props) => props.theme.borderRadius.circle};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  min-height: 8rem;

  p {
    margin-top: 1rem;
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

export interface CardProps {}

const Card = () => {
  return (
    <>
      <CompanyName>Duke & Grace</CompanyName>
      <Container>
        <CardImage>
          <Image src={companyTest} layout="fill" alt="project-1" />
          <ul className="student__list">
            <li>
              <Image src={profile} layout="fill" alt="student-1" />
            </li>
            <li>
              <Image src={profile} layout="fill" alt="student-1" />
            </li>
            <li>
              <Image src={profile} layout="fill" alt="student-1" />
            </li>
            <li>
              <Image src={profile} layout="fill" alt="student-1" />
            </li>
            <li>
              <Image src={profile} layout="fill" alt="student-1" />
            </li>
            <li>
              <Image src={profile} layout="fill" alt="student-1" />
            </li>
            <li>
              <Image src={profile} layout="fill" alt="student-1" />
            </li>
            <li>
              <Image src={profile} layout="fill" alt="student-1" />
            </li>
            <li>
              <Image src={profile} layout="fill" alt="student-1" />
            </li>
          </ul>
        </CardImage>
        <CardContent>
          <FlexContainer>
            <ActiveStudent>
              <Image src={profile} layout="fill" alt="student-1" />
            </ActiveStudent>
            <h3>Naam student</h3>
          </FlexContainer>
          <p>
            Placeat earum quia tenetur nisi dolorem. Occaecati quae dolore
            asperiores et voluptatem magni ut. Quis deserunt molestiae libero.
            Enim repellat veritatis nostrum veritatis eos.
          </p>
        </CardContent>
      </Container>
    </>
  );
};

export default Card;
