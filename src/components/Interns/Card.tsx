import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import { lighten, transparentize } from "polished";

import companyTest from "../../assets/test/company_test.jpg";
import profile from "../../assets/test/profile.jpg";
import { Company } from "../../../interfaces";

const SuperContainer = styled.div`
  margin-top: 1rem;
  position: relative;

  @media (min-width: ${(props) => props.theme.width.small}) {
    margin-top: 2rem;
  }

  .multiple-students {
    padding-right: 5rem;

    @media (min-width: ${(props) => props.theme.width.small}) {
      padding-right: 5rem;
    }
  }
`;

const CompanyName = styled.div`
  font-size: ${(props) => props.theme.fontSizes.medium};
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  .company-name {
    font-size: ${(props) => props.theme.fontSizes.medium};
  }

  .info {
    font-size: 0.6rem;
    color: ${(props) => props.theme.colors.white};
    font-family: ${(props) => props.theme.fontFamilies.secondary};
    font-weight: ${(props) => props.theme.fontWeights.light};
  }
`;

const Container = styled.div`
  @media (min-width: ${(props) => props.theme.width.small}) {
    display: flex;
    flex-direction: row;
  }

  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  transition: ${(props) => props.theme.transition.normal};

  .students {
    position: absolute;
    top: 0rem;
    right: 0rem;
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .student__list {
    background-color: ${(props) =>
      lighten(0.1, props.theme.colors.bg_gradient_color_1)};
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);

    padding: 0.5rem;
    border-radius: ${(props) => props.theme.borderRadius.normal};
    transition: ${(props) => props.theme.transition.normal};

    li {
      cursor: pointer;
      position: relative;
      width: 2.5rem;
      height: 2.5rem;
      margin-bottom: 0.5rem;
      //border: 2px solid ${(props) => props.theme.colors.pink};
      border-radius: ${(props) => props.theme.borderRadius.circle};

      img {
        border-radius: ${(props) => props.theme.borderRadius.circle};
      }
    }
  }
`;

const CardImage = styled.div`
  padding: 0.5rem;
  position: relative;

  width: 100%;
  height: 12rem;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadius.small};

  @media (min-width: ${(props) => props.theme.width.esmall}) {
    height: 20rem;
  }

  @media (min-width: ${(props) => props.theme.width.small}) {
    max-width: 17rem;
    width: 100%;
    height: auto;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;

  .intern-info {
    .name {
      font-weight: ${(props) => props.theme.fontWeights.bold};
      font-size: ${(props) => props.theme.fontSizes.normal};
      display: block;
    }

    .function {
      font-size: ${(props) => props.theme.fontSizes.small};
      display: block;
      font-family: ${(props) => props.theme.fontFamilies.secondary};
    }
  }
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

export interface CardProps {
  company: Company;
}

const Card = ({ company }: CardProps) => {
  const [activeStudent, setActiveStudent] = useState(0);
  console.log(company.interns[activeStudent].student.firstName);

  const handleClick = () => {};

  return (
    <>
      <SuperContainer>
        <CompanyName>
          <span className="company-name">{company.name}</span>
          {company.interns.length > 1 && (
            <span className="info">Klik op de student voor meer info</span>
          )}
        </CompanyName>
        <Container
          className={company.interns.length > 1 ? "multiple-students" : ""}
        >
          <CardImage>
            <Image
              src={companyTest}
              layout="fill"
              objectFit="cover"
              alt="project-1"
            />
          </CardImage>

          <CardContent>
            <FlexContainer>
              <ActiveStudent>
                <Image src={profile} layout="fill" alt="student-1" />
              </ActiveStudent>
              <div className="intern-info">
                <span className="name">
                  {company.interns[activeStudent]?.student.firstName +
                    " " +
                    company.interns[activeStudent].student.lastName}
                </span>
                <span className="function">
                  {company.interns[activeStudent]?.function}
                </span>
              </div>
            </FlexContainer>
            <p>{company.interns[activeStudent]?.description} </p>
          </CardContent>
          {company.interns.length > 1 && (
            <div className="students">
              <ul className="student__list">
                {company.interns.map((intern, index) => (
                  <li key={intern.id} onClick={() => setActiveStudent(index)}>
                    <Image src={profile} width={40} height={40} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </SuperContainer>
    </>
  );
};

export default Card;
