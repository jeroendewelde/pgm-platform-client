import React from "react";
import styled from "styled-components";

import { StudentCarousel, TeachersCarousel } from "../components/PGM-Team";
import { GlitchTitle } from "../components/Titles/GlitchTitle";
import { H2 } from "../components/Titles/H2";

const PgmTeam = () => {
  return (
    <>
      <GlitchTitle>Docenten</GlitchTitle>
      <TeachersCarousel />
      <GlitchTitle>Studenten</GlitchTitle>
      <>
        <H2>2021 - 2022</H2>
        <StudentCarousel />
      </>
      <>
        <H2>2020 - 2021</H2>
        <StudentCarousel />
      </>
      <>
        <H2>2019 - 2020</H2>
        <StudentCarousel />
      </>
    </>
  );
};

export default PgmTeam;
