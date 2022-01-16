import React from "react";
import styled from "styled-components";

import { StudentCard, TeachersCarousel } from "../components/PGM-Team";
import { GlitchTitle } from "../components/Titles/GlitchTitle";

const FlexContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${(props) => props.theme.width.esmall}) {
    justify-content: left;
  }
`;

const PgmTeam = () => {
  return (
    <>
      <GlitchTitle>Docenten</GlitchTitle>
      <TeachersCarousel />
      <GlitchTitle>Studenten</GlitchTitle>
      <FlexContainer>
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
        <StudentCard name={"jamie"} />
      </FlexContainer>
    </>
  );
};

export default PgmTeam;
