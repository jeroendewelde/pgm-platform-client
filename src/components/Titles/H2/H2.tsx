import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: -webkit-linear-gradient(
    -70deg,
    ${(props) => props.theme.colors.purple} 10%,
    ${(props) => props.theme.colors.red} 60%
  );

  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TitleStyle = styled.h2`
  font-family: ${(props) => props.theme.fontFamilies.primary};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export interface H2Props {
  children?: React.ReactNode;
}

const H2 = ({ children }: H2Props) => {
  return (
    <Container>
      <TitleStyle>{children}</TitleStyle>
    </Container>
  );
};

export default H2;
