import React, { ReactElement } from "react";

import { Course } from "../../../interfaces";

interface CourseListProps {
  courses?: Course[];
}

export default function CourseList({ courses }: CourseListProps) {
  return (
    <>
      <h1>These are courses coming from graphql:</h1>
      {courses &&
        courses.map((course: Course) => (
          <div key={course.id}>
            <h2>
              Term: {course.name} - {course.description}
            </h2>
            <p>
              Term: {course.term} - {course.academicYear}
            </p>
          </div>
        ))}
    </>
  );
}
