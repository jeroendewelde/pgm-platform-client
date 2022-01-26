import React, { ReactElement } from "react";

// Formik & Yup
import * as yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";

// Material UI Components
import { Button, Grid, Typography } from "@mui/material";
import { TextField } from "formik-mui";
import { Remove, Add } from "@material-ui/icons";

// Queries
import { GET_ALL_COURSES } from "../../../../graphql/courses";
import { GET_ALL_STUDENTS } from "../../../../graphql/persons";
import { CREATE_PROJECT } from "../../../../graphql/projects";
import { useMutation, useQuery } from "@apollo/client";
import { Person } from "../../../../interfaces";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import CustomSingleSelect from "../../../components/Admin/Form/CustomSingleSelect";
import { CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";
import CustomLoading from "../../../components/Admin/style/CustomLoading";
import CustomMultiSelectWithChips from "../../../components/Admin/Form/CustomMultiSelectWithChips";

const validationSchema = yup.object({
  name: yup.string().required("Projectnaam is verplicht"),
  teaserText: yup.string().required("Kleine teaser-text is verplicht"),
  body: yup.string().required("Grote beschrijving is verplicht"),
  academicYear: yup
    .string()
    .matches(
      /20[0-9]{2}-20[0-9]{2}/,
      "De duurtijd moet in het formaat 2019-2020 zijn"
    )
    .required("Academiejaar is verplicht"),
  tags: yup.array().of(yup.string()).required("Tags zijn verplicht"),
  courseId: yup.number().required("Vak is verplicht"),
});

export default function CreateProjectPage(): ReactElement {
  const [addProject, { data, loading, error }] = useMutation(CREATE_PROJECT, {
    notifyOnNetworkStatusChange: true,
  });
  const checkBoxIcon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIconChecked = <CheckBox fontSize="small" />;

  const {
    data: dataCourses,
    error: errorCourses,
    loading: loadingCourses,
  } = useQuery(GET_ALL_COURSES, {
    ssr: true,
  });

  const {
    data: dataStudents,
    error: errorStudents,
    loading: loadingStudents,
  } = useQuery(GET_ALL_STUDENTS, {
    ssr: true,
  });

  return (
    <BasicContainer title="Nieuw Project">
      {loadingCourses || loadingStudents ? (
        <CustomLoading />
      ) : (
        <Formik
          initialValues={{
            name: "",
            teaserText: "",
            body: "",
            academicYear: "",
            tags: [],
            courseId: "",
            students: [],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            addProject({
              variables: {
                input: {
                  name: values.name,
                  teaserText: values.teaserText,
                  body: values.body,
                  academicYear: values.academicYear,
                  tags: values.tags,
                  courseId: values.courseId,
                  studentIds: values.students.map(
                    (student: Person) => student.id
                  ),
                },
              },
            });

            if (!error && !loading) {
              setSubmitting(false);
              window.location.href = "/admin/projects";
            }
          }}
        >
          {({ values, submitForm, isSubmitting }) => (
            <Form
              style={{
                width: "100%",
              }}
            >
              <Grid
                container
                spacing={{ xs: 2 }}
                sx={{
                  maxWidth: "xl",
                  mb: 4,
                }}
              >
                <Grid item xs={12} md={8}>
                  <Field
                    required
                    component={TextField}
                    name="name"
                    type="text"
                    label="Naam"
                    helperText="Naam van het project"
                    fullWidth
                    multiline
                    maxRows={2}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    required
                    component={TextField}
                    name="academicYear"
                    type="text"
                    label="Academiejaar"
                    helperText="Academiejaar in formaat 2019-2020"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    component={TextField}
                    name="teaserText"
                    type="text"
                    label="Teaser text"
                    fullWidth
                    multiline
                    maxRows={2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    component={TextField}
                    name="body"
                    type="text"
                    label="Body"
                    helperText="Beschrijving van het project"
                    fullWidth
                    multiline
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    component={CustomSingleSelect}
                    name="courseId"
                    label="Vak"
                    helperText="Naam van het vak"
                    fullWidth
                    data={dataCourses.courses}
                    labelProps={["name", "academicYear"]}
                    sx={{
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h2" component="h2">
                    Studenten
                  </Typography>
                  <Typography variant="subtitle1">
                    De (optionele) studenten die aan dit project hebben gewerkt,
                    dit kan nog aangepast worden
                  </Typography>

                  <Field
                    required
                    component={CustomMultiSelectWithChips}
                    name="students"
                    label="Studenten"
                    placeholder="Zoek een student..."
                    data={dataStudents.students}
                    labelProps={["firstName", "lastName", "academicYear"]}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h2" component="h2">
                    Optionele Tags
                  </Typography>
                  <Typography variant="subtitle1">
                    De tags kunnen talen/technologieën, vaardigheden of andere
                    belangrijke elementen zijn. Plaats de 5 meest belangrijkste
                    bovenaan.
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <FieldArray
                    name="tags"
                    render={(arrayHelpers) => (
                      <div>
                        {values.tags && values.tags.length > 0 ? (
                          values.tags.map((tag, index) => (
                            <div
                              key={index}
                              style={{
                                marginBottom: "1rem",
                              }}
                            >
                              <Field
                                component={TextField}
                                name={`tags.${index}`}
                                type="text"
                                label="Tag"
                              />

                              <Button
                                sx={{ margin: 1 }}
                                variant="outlined"
                                disabled={isSubmitting}
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <Remove />
                              </Button>

                              <Button
                                sx={{ margin: 1 }}
                                variant="outlined"
                                disabled={isSubmitting}
                                onClick={() =>
                                  arrayHelpers.insert(index + 1, "")
                                }
                              >
                                <Add />
                              </Button>
                            </div>
                          ))
                        ) : (
                          <Button
                            variant="outlined"
                            disabled={isSubmitting}
                            onClick={() => arrayHelpers.push("")}
                          >
                            Tags toevoegen
                          </Button>
                        )}
                      </div>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Maak aan
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </BasicContainer>
  );
}
