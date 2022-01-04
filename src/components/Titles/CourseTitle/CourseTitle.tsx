import React from "react";
import styled from "styled-components";
import blueIcon from "../../../assets/learning-line/blue.svg";
import greenIcon from "../../../assets/learning-line/green.svg";
import orangeIcon from "../../../assets/learning-line/orange.svg";
import redIcon from "../../../assets/learning-line/red.svg";
import pinkIcon from "../../../assets/learning-line/pink.svg";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const CourseTitleStyle = styled.h2<CourseTitleProps>`
  padding-left: 0.5rem;
  margin-right: 1.5rem;

  background: ${({ learningLine }) => {
    if (learningLine === "blue") {
      return (props) => `linear-gradient(
      66deg,
      ${props.theme.colors.blue} 0%,
      transparent 70%
    )
    0% 0% no-repeat padding-box;`;
    } else if (learningLine === "green") {
      return (props) => `linear-gradient(
      66deg,
      ${props.theme.colors.green} 0%,
      transparent 70%
    )
    0% 0% no-repeat padding-box;`;
    } else if (learningLine === "orange") {
      return (props) => `linear-gradient(
      66deg,
      ${props.theme.colors.orange} 0%,
      transparent 70%
    )
    0% 0% no-repeat padding-box;`;
    } else if (learningLine === "pink") {
      return (props) => `linear-gradient(
      66deg,
      ${props.theme.colors.pink} 0%,
      transparent 70%
    )
    0% 0% no-repeat padding-box;`;
    } else if (learningLine === "red") {
      return (props) => `linear-gradient(
      66deg,
      ${props.theme.colors.red} 0%,
      transparent 70%
    )
    0% 0% no-repeat padding-box;`;
    }
  }};
`;

export interface CourseTitleProps {
  children: React.ReactNode;
  learningLine: "blue" | "green" | "orange" | "pink" | "red";
}

const Icon = ({ learningLine = "blue" }: CourseTitleProps) => {
  if (learningLine === "blue") {
    return <img src={blueIcon} alt="blue" />;
  } else if (learningLine === "green") {
    return <img src={greenIcon} alt="green" />;
  } else if (learningLine === "orange") {
    return <img src={orangeIcon} alt="orange" />;
  } else if (learningLine === "pink") {
    return <img src={pinkIcon} alt="pink" />;
  } else if (learningLine === "red") {
    return <img src={redIcon} alt="red" />;
  } else {
    return null;
  }
};

const CourseTitle = ({ children, learningLine = "blue" }: CourseTitleProps) => {
  return (
    <Container>
      <CourseTitleStyle learningLine={learningLine}>
        {children}
      </CourseTitleStyle>
      <Icon learningLine={learningLine} children={undefined} />
    </Container>
  );
};

export default CourseTitle;
