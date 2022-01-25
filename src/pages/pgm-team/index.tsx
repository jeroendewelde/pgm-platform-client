import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import client from "../../../apollo-client";
import { GET_ALL_GENERATIONS } from "../../../graphql/generations";
import {
  GET_ALL_STUDENTS,
  GET_ALL_TEACHERS_CLIENT,
} from "../../../graphql/persons";
import { AllTeachersClient, Generation, Person } from "../../../interfaces";

import { StudentCarousel, TeachersCarousel } from "../../components/PGM-Team";
import { GlitchTitle } from "../../components/Titles/GlitchTitle";
import { H2 } from "../../components/Titles/H2";

const Container = styled.div``;

interface PgmTeamProps {
  teachers: AllTeachersClient[];
  students: Person[];
  generations: Generation[];
}

const PgmTeam = ({ teachers, students, generations }: PgmTeamProps) => {
  // sort generations on year

  return (
    <Container>
      <motion.div
        className="h1_padding"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{
          delay: 0.3,
          duration: 0.65,
        }}
      >
        <GlitchTitle>Docenten</GlitchTitle>
      </motion.div>
      <TeachersCarousel teachers={teachers} />
      <div className="h1_padding">
        <GlitchTitle>Studenten</GlitchTitle>
      </div>

      <>
        {generations?.map((generation) => (
          <>
            <div className="h2_padding">
              <H2 key={generation.id}>{generation.years}</H2>
            </div>

            {students && students.length > 0 && (
              <StudentCarousel
                students={students?.filter(
                  (student) => student.academicYear === generation.years
                )}
              />
            )}
          </>
        ))}
      </>
    </Container>
  );
};

export default PgmTeam;

export async function getStaticProps() {
  const queryMultiple = async () => {
    const query_Teachers = await client.query({
      query: GET_ALL_TEACHERS_CLIENT,
    });

    const query_Students = await client.query({
      query: GET_ALL_STUDENTS,
    });

    const query_Generations = await client.query({
      query: GET_ALL_GENERATIONS,
    });

    return [query_Teachers, query_Students, query_Generations];
  };

  const [query_Teachers, query_Students, query_Generations] =
    await queryMultiple();

  const { data, error, loading } = query_Teachers;
  const {
    data: data_Students,
    error: error_Students,
    loading: loading_Students,
  } = query_Students;
  const {
    data: data_Generations,
    error: error_Generations,
    loading: loading_Generations,
  } = query_Generations;

  if (error || error_Students || error_Generations) {
    console.log(error || error_Students || error_Generations);
  }

  return {
    props: {
      teachers: data.teachers,
      students: data_Students.students,
      generations: data_Generations.generations,
    },
  };
}
