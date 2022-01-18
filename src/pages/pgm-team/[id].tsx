import { GetStaticPaths } from "next";
import React from "react";
import styled from "styled-components";
import client from "../../../apollo-client";
import {
  GET_ALL_TEACHERS_CLIENT,
  GET_TEACHER_BY_ID,
} from "../../../graphql/persons";
import { GetOneTeacherClient } from "../../../interfaces";
import { HeroDetail } from "../../components/PGM-Team";
import { Bio, FieldExperience } from "../../components/Teacher";

const FlexContainer = styled.div``;

interface DetailTeacherProps {
  teacher: GetOneTeacherClient;
}

const TeacherDetail = ({ teacher }: DetailTeacherProps) => {
  return (
    <>
      <HeroDetail teacher={teacher} />

      <FlexContainer>
        <Bio bio={teacher.personInformation.bio} />
        <FieldExperience />
      </FlexContainer>
    </>
  );
};

export default TeacherDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error } = await client.query({
    query: GET_ALL_TEACHERS_CLIENT,
  });

  if (error) {
    console.log(error);
  }

  return {
    paths: data.teachers.map((teacher: { id: any }) => ({
      params: {
        id: teacher.id.toString(),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (context: { params: { id: any } }) => {
  let id = context.params.id;
  typeof id === "string" ? (id = parseInt(id)) : id;

  const { data, error } = await client.query({
    query: GET_TEACHER_BY_ID,
    variables: { id: id },
  });

  console.log(data);

  if (error) {
    console.log(error);
  }

  return {
    props: {
      teacher: data.person,
    },
  };
};
