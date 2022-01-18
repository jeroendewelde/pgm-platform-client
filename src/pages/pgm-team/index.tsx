import React from "react";
import styled from "styled-components";
import client from "../../../apollo-client";
import { GET_ALL_TEACHERS_CLIENT } from "../../../graphql/persons";
import { AllTeachersClient } from "../../../interfaces";

import { StudentCarousel, TeachersCarousel } from "../../components/PGM-Team";
import { GlitchTitle } from "../../components/Titles/GlitchTitle";
import { H2 } from "../../components/Titles/H2";

const Container = styled.div``;

interface PgmTeamProps {
  teachers: AllTeachersClient[];
}

const PgmTeam = ({ teachers }: PgmTeamProps) => {
  console.log(teachers);

  return (
    <Container>
      <div className="h1_padding">
        <GlitchTitle>Docenten</GlitchTitle>
      </div>
      <TeachersCarousel teachers={teachers} />
      <div className="h1_padding">
        <GlitchTitle>Studenten</GlitchTitle>
      </div>
      <>
        <div className="h2_padding">
          <H2>2021 - 2022</H2>
        </div>
        <StudentCarousel />
      </>
      <>
        <div className="h2_padding">
          <H2>2020 - 2021</H2>
        </div>
        <StudentCarousel />
      </>
      <>
        <div className="h2_padding">
          <H2>2019 - 2020</H2>
        </div>
        <StudentCarousel />
      </>
    </Container>
  );
};

export default PgmTeam;

export async function getStaticProps() {
  const { data, error } = await client.query({
    query: GET_ALL_TEACHERS_CLIENT,
  });

  if (error) {
    console.log(error);
  }

  return {
    props: {
      teachers: data.teachers,
    },
  };
}
