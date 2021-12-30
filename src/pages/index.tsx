import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { gql } from "@apollo/client";
import client from "../../apollo-client";

// const Home: NextPage = ({ teachers }) => {
export default function Home({ teachers }: any) {
  // teachers = teachers.teachers.data;

  console.log("teachers...", teachers);
  // console.log('test....', test)

  return (
    <>
      {teachers &&
        teachers.map((teacher: any) => (
          <div key={teacher.id}>
            <h2>
              {teacher.attributes.firstname ?? "no name"}{" "}
              {teacher.attributes.lastname ?? ""}
            </h2>
          </div>
        ))}
    </>
  );
}

export async function getStaticProps() {
  const { data, error } = await client.query({
    query: gql`
      {
        teachers {
          data {
            attributes {
              firstname
              lastname
            }
          }
        }
      }
    `,
  });

  // console.log(data.teachers.data);
  if (error) {
    console.log(error);
  }

  return {
    props: {
      teachers: data.teachers.data,
      test: "hello",
    },
  };
}

// async function getData(url: string) {
//     const res = await fetch(url);
//     const data = await res.json();
//     return data;
// }
