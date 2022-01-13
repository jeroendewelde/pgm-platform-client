import React, { ReactElement } from "react";
import Card from "./Card";

import { Course } from "../../../interfaces";

interface CourseListProps {
  courses?: Course[];
}

export default function CourseList({ courses }: CourseListProps) {
  courses?.map((course: Course) => {
    console.log(course);
  });

  return (
    <>
      <h1>These are courses coming from graphql:</h1>
      {courses &&
        courses.map((course: Course) => (
          <Card
            key={course.id}
            tags={course.tags}
            title={course.name}
            learningLine={course.learningLine.color}
          />
          //   <div key={course.id}>
          //     <h2>
          //       Term: {course.name} - {course.description}
          //     </h2>
          //     <p>
          //       Term: {course.term} - {course.academicYear}
          //     </p>
          //     <p>Tags: {course.tags}</p>
          //     <p>color: {course.learningLine.color}</p>
          //   </div>
        ))}
    </>
  );
}
