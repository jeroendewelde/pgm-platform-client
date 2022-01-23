// Query

// Custom Imports
import BasicContainer from "../../components/Admin/style/BasicContainer";

// Variables
import NavigationButton from "../../components/Admin/NavigationButton";

export default function AdminPanel() {
  return (
    <BasicContainer title="Home" alsoTitle={false}>
      <>
        <NavigationButton title="nieuw vak toevoegen" path="courses/create" />
        <NavigationButton
          title="nieuw project toevoegen"
          path="projects/create"
        />
        <NavigationButton
          title="nieuwe docent toevoegen"
          path="teachers/create"
        />
        <NavigationButton
          title="nieuwe student toevoegen"
          path="students/create"
        />
        <NavigationButton
          title="nieuwe leerlijn toevoegen"
          path="learning-lines/create"
        />
        <NavigationButton
          title="nieuwe afstuderrichting toevoegen"
          path="specialisations/create"
        />
        <NavigationButton
          title="nieuw leerbedrijf toevoegen"
          path="companies/create"
        />
        <NavigationButton
          title="nieuwe testimonial toevoegen"
          path="testimonials/create"
        />
      </>
    </BasicContainer>
  );
}
