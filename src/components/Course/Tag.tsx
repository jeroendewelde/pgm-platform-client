import React from "react";
import styled from "styled-components";

const Container = styled.li`
  display: inline-block;
  padding: 0.15rem 0.3rem;
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px dashed ${(props) => props.theme.colors.white};
  margin-right: 1rem;
  position: relative;
  z-index: 5;
  margin-bottom: 0.5rem;

  span {
    text-transform: capitalize;
    font-family: ${(props) => props.theme.fontFamilies.secondary};
    font-weight: ${(props) => props.theme.fontWeights.light};
    font-size: ${(props) => props.theme.fontSizes.normal};
    margin: 0;
  }
`;

interface TagProps {
  children: React.ReactNode;
}

const Tag = ({ children }: TagProps) => {
  return (
    <Container>
      <span>{children}</span>
    </Container>
  );
};

export default Tag;
