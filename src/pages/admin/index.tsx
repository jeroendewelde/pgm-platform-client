import { NextPage } from "next";

// Query
import { GET_ALL_COURSES } from "../../../graphql/courses";
import { Course } from "../../../interfaces";
import client from "../../../apollo-client";

// Custom Imports
import BasicContainer from "../../components/Admin/style/BasicContainer";
import Dashboard from "../../components/Admin/Dashboard";
import DataGridContent from "../../components/Admin/DataGridContent";

// Variables
import { tableColumns } from "../../utils/constants";
import NavigationButton from "../../components/Admin/NavigationButton";

interface AdminPanelProps {
  courses: Course[];
}

export default function AdminPanel({ courses }: AdminPanelProps) {
  return (
    <BasicContainer title="Home">
      <Dashboard title="Vakken">
        <>
          <p>Choose an entity in the left navigation</p>
          <NavigationButton title="nieuw vak" path="courses" />
          <NavigationButton title="nieuw project" path="projects" />
          <NavigationButton title="nieuwe docent" path="teachers" />
          <NavigationButton title="nieuwe student" path="students" />
          <NavigationButton title="nieuwe leerlijn" path="learning-lines" />
          <NavigationButton
            title="nieuwe afstuderrichting"
            path="specialisations"
          />
          <NavigationButton title="nieuw leerbedrijf" path="companies" />
          <NavigationButton title="nieuwe testimonial" path="testimonials" />
        </>
      </Dashboard>
    </BasicContainer>
  );
}

export async function getStaticProps() {
  const { data, error } = await client.query({
    query: GET_ALL_COURSES,
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
