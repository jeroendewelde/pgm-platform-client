import React, { ReactElement } from "react";
import Router from "next/router";

import * as yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";
import Box from "@mui/material/Box";

import { Button, Typography } from "@mui/material";
import { TextField } from "formik-mui";

// Queries
import {
  CREATE_LEARNING_LINE,
  GET_ALL_LEARNING_LINES,
} from "../../../../graphql/learningLines";
import client from "../../../../apollo-client";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";
import { CREATE_COURSE, GET_ALL_COURSES } from "../../../../graphql/courses";
import { GET_ALL_SPECIALISATIONS } from "../../../../graphql/specialisations";
import { LearningLine, Person, Specialisation } from "../../../../interfaces";
import CustomSingleSelect from "../../../components/Admin/Form/CustomSingleSelect";
import { AsyncLocalStorage } from "async_hooks";
import { CREATE_PROJECT } from "../../../../graphql/projects";
import { CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_STUDENTS } from "../../../../graphql/persons";
import CustomLoading from "../../../components/Admin/style/CustomLoading";
import { Remove, Add } from "@material-ui/icons";
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

export default function createProject(): ReactElement {
  const [
    addProject,
    { data: dataProject, loading: loadingProject, error: errorProject },
  ] = useMutation(CREATE_PROJECT);
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
      <Dashboard title="Nieuw Project">
        {loadingCourses || loadingStudents ? (
          <CustomLoading />
        ) : (
          <>
            <Box
              sx={{
                maxWidth: "md",
                border: "1px solid #e0e0e0",
              }}
            >
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

                  if (!errorProject && !loadingProject) {
                    window.location.href = Router.pathname.split("/create")[0];
                  }
                }}
              >
                {({ values, submitForm, isSubmitting }) => (
                  <Form>
                    <Box margin={1}>
                      <Field
                        required
                        component={TextField}
                        name="name"
                        type="text"
                        label="Naam"
                        helperText="Naam van het project"
                        multiline
                        maxRows={2}
                        sx={{
                          width: "100%",
                          // maxWidth: 'lg'
                        }}
                      />
                    </Box>
                    <Box margin={1}>
                      <Field
                        required
                        component={TextField}
                        name="teaserText"
                        type="text"
                        label="Teaser text"
                        helperText=""
                        multiline
                        maxRows={2}
                        sx={{
                          width: "100%",
                          // maxWidth: 'lg'
                        }}
                      />
                    </Box>
                    <Box margin={1}>
                      <Field
                        required
                        component={TextField}
                        name="body"
                        type="text"
                        label="Body"
                        helperText="Beschrijving van het project"
                        multiline
                        sx={{
                          width: "100%",
                        }}
                        // fullWidth
                      />
                    </Box>
                    {/* <Box margin={1}> */}
                    <Box
                      sx={{
                        border: "1px solid #e0e0e0",
                        width: "100%",
                      }}
                    >
                      <Field
                        required
                        component={TextField}
                        name="academicYear"
                        type="text"
                        label="Academiejaar"
                        helperText="Academiejaar in formaat 2019-2020"
                        sx={{
                          minWidth: "25%",
                          margin: 1,
                        }}
                        // fullWidth
                      />
                    </Box>
                    {/* <Box sx={{
									border: '1px solid #e0e0e0',
									width: '100%',
									display: 'flex',
									justifyContent: 'stretch'
								}}> */}

                    <Box
                      sx={{
                        margin: 1,
                        // display: 'flex',
                        // gap: 2
                      }}
                    >
                      <Field
                        required
                        component={CustomSingleSelect}
                        label="Vak"
                        name="courseId"
                        data={dataCourses.courses}
                        sx={{
                          // minWidth: '45%',
                          // minWidth: '40%',
                          width: "50%",
                          flexGrow: 1,

                          // margin: 1,
                          border: "1px solid #e0e0e0",
                        }}
                        helperText="Naam van het vak"

                        // name="academicYear"
                        // type="text"
                        // label="Academiejaar"
                        // helperText="Academiejaar in formaat 2019-2020"
                        // fullWidth
                      />
                    </Box>
                    <Box margin={1}>
                      <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                          flexGrow: 1,
                          mb: 2,
                          // ml: 1,
                          color: "black",
                        }}
                      >
                        Studenten
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        De (optionele) studenten die aan dit project hebben
                        gewerkt, dit kan nog aangepast worden
                      </Typography>

                      <Box margin={1}>
                        <Field
                          required
                          component={CustomMultiSelectWithChips}
                          label="Studenten"
                          placeholder="Zoek een studennt..."
                          name="students"
                          // data={dataLearningLines.teachers}
                          data={dataStudents.students}
                          // helperText="Naam van de docenten"
                          labelProps={["firstName", "lastName", "academicYear"]}
                        />
                      </Box>
                    </Box>

                    {/* </Box> */}

                    <Box margin={1}>
                      <FieldArray
                        name="tags"
                        render={(arrayHelpers) => (
                          <div>
                            <Typography
                              variant="h6"
                              noWrap
                              component="div"
                              sx={{
                                flexGrow: 1,
                                mb: 2,
                                // ml: 1,
                                color: "black",
                              }}
                            >
                              Optionele Tags
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: "black" }}
                            >
                              De tags kunnen talen/technologieën, vaardigheden
                              of andere belangrijke elementen zijn. Plaats de 5
                              meest belangrijkste bovenaan.
                            </Typography>
                            {values.tags && values.tags.length > 0 ? (
                              values.tags.map((tag, index) => (
                                <div key={index}>
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
                                      arrayHelpers.insert(index, "")
                                    }
                                  >
                                    <Add />
                                  </Button>
                                </div>
                              ))
                            ) : (
                              <Button
                                sx={{ margin: 1 }}
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
                    </Box>
                    <Box margin={1}>
                      <Button
                        sx={{ margin: 1 }}
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                        // type="submit"
                      >
                        Maak aan
                      </Button>
                    </Box>

                    <pre
                      style={{
                        color: "black",
                      }}
                    >
                      {JSON.stringify(values, null, 2)}
                    </pre>
                  </Form>
                )}
              </Formik>
            </Box>
          </>
        )}
      </Dashboard>
    </BasicContainer>
  );
}
