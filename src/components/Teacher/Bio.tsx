import React from "react";
import styled from "styled-components";
import { H2 } from "../Titles/H2";

const Container = styled.div`
  p {
    margin-bottom: 3rem;
    margin-top: 1rem;
  }

  @media (min-width: ${(props) => props.theme.width.medium}) {
    p {
      margin-bottom: 0;
      margin-top: 3rem;
    }
  }
`;

interface BioProps {
  bio: string;
}

const Bio = ({ bio }: BioProps) => {
  return (
    <Container>
      <H2>Biography</H2>
      <p>{bio}</p>
    </Container>
  );
};

export default Bio;
