import Head from "next/head";
import Link from "next/link";
import client from "../../apollo-client";


import { GET_ALL_COURSES } from "../../graphql/courses";
import { Course } from "../../interfaces";
import CourseList from "../components/Course/CourseList";

interface HomeProps {
    courses: Course[];
}

export default function Home({courses}: HomeProps) {

  return (
    <div className="container">
        <Head>
            <title>Home</title>
            
        </Head>
        <h1 className="title">
            Home page
        </h1>
            <Link href="/admin">
                <a>admin panel</a>
            </Link>


      <CourseList courses={courses} />
    </div>
  );
}

export async function getStaticProps() {
    const { data, error } = await client.query({
        query: GET_ALL_COURSES
    });

    if (error) {
        console.log(error);
    }

    return {
        props: {
            courses: data.courses,
        },
    };
}
