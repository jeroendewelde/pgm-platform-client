import React from "react";
import styled from "styled-components";

const CourseTitleStyle = styled.h1`
  padding-left: 0.5rem;
  background: transparent
    linear-gradient(
      66deg,
      ${(props) => props.theme.colors.green} 0%,
      transparent 40%
    )
    0% 0% no-repeat padding-box;
`;

export interface CourseTitleProps {
  children: React.ReactNode;
}

const CourseTitle = ({ children }: CourseTitleProps) => {
  return <CourseTitleStyle>{children}</CourseTitleStyle>;
};

export default CourseTitle;
