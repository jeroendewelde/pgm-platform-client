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
    @media (min-width: ${(props) => props.theme.width.small}) {
      padding-right: 5rem;
    }
  }

  .multiple-students-image {
    width: calc(100% - 3rem);
  }
`;

const CompanyName = styled.div`
  font-size: ${(props) => props.theme.fontSizes.medium};
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  .company-name {
    font-size: ${(props) => props.theme.fontSizes.medium};
    margin-right: 1rem;
  }

  .info {
    font-size: 0.6rem;
    color: ${(props) => props.theme.colors.white};
    font-family: ${(props) => props.theme.fontFamilies.secondary};
    font-weight: ${(props) => props.theme.fontWeights.light};

    @media (min-width: ${(props) => props.theme.width.medium}) {
      font-size: ${(props) => props.theme.fontSizes.small};
    }
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
    max-height: 15rem;

    @media (min-width: ${(props) => props.theme.width.esmall}) {
      height: 20rem;
      max-height: 20rem;
    }
    @media (min-width: ${(props) => props.theme.width.small}) {
      background-color: ${(props) =>
        lighten(0.05, props.theme.colors.bg_gradient_color_1)};
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
      border-radius: ${(props) => props.theme.borderRadius.small};
      border: 1px solid
        ${(props) => lighten(0.2, props.theme.colors.bg_gradient_color_1)};
      height: 20rem;
      max-height: 20rem;
    }
  }

  .student__list {
    padding: 0.5rem;
    padding-bottom: 0;
    transition: ${(props) => props.theme.transition.normal};

    li {
      cursor: pointer;
      position: relative;
      width: 2rem;
      height: 2rem;
      margin-bottom: 0.5rem;
      //border: 2px solid ${(props) => props.theme.colors.pink};
      border-radius: ${(props) => props.theme.borderRadius.circle};
      border: 1px solid ${(props) => props.theme.colors.white};
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        border-radius: ${(props) => props.theme.borderRadius.circle};
      }

      @media (min-width: ${(props) => props.theme.width.medium}) {
        width: 3rem;
        height: 3rem;
      }
    }
  }
`;

const CardImage = styled.div`
  padding: 0.5rem;
  position: relative;
  margin-right: 5rem;
  width: 100%;
  height: 15rem;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadius.small};

  @media (min-width: ${(props) => props.theme.width.esmall}) {
    height: 20rem;
  }

  @media (min-width: ${(props) => props.theme.width.small}) {
    min-width: 15rem;
    max-width: 15rem;
    width: 15rem;
    height: 17rem;
    margin-right: 2rem;
  }
  @media (min-width: ${(props) => props.theme.width.medium}) {
    min-width: 20rem;
    max-width: 20rem;
    width: 20rem;
    height: 20rem;
    margin-right: 4rem;
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
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 0.5rem;
  padding-top: 1rem;

  @media (min-width: ${(props) => props.theme.width.small}) {
    padding-top: 0;
  }

  p {
    margin-top: 1rem;
    font-size: ${(props) => props.theme.fontSizes.normal};

    @media (min-width: ${(props) => props.theme.width.large}) {
      font-size: ${(props) => props.theme.fontSizes.medium};
    }
  }
`;

export interface CardProps {
  company: Company;
}

const Card = ({ company }: CardProps) => {
  const [activeStudent, setActiveStudent] = useState(0);

  console.log(company);

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
          <CardImage
            className={
              company.interns.length > 1 ? "multiple-students-image" : ""
            }
          >
            <Image
              src={companyTest}
              layout="fill"
              objectFit="cover"
              alt="project-1"
            />
          </CardImage>

          <CardContent>
            <FlexContainer>
              {company?.interns[activeStudent] && (
                <>
                  <ActiveStudent>
                    <Image src={profile} layout="fill" alt="student-1" />
                  </ActiveStudent>
                  <div className="intern-info">
                    <span className="name">
                      {company?.interns[activeStudent]?.student.firstName +
                        " " +
                        company?.interns[activeStudent]?.student.lastName}
                    </span>
                    <span className="function">
                      {company.interns[activeStudent]?.function}
                    </span>
                  </div>
                </>
              )}
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
