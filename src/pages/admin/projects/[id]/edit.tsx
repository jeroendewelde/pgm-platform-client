import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";

// Material UI Components
import { Box, Button, Typography } from "@mui/material";
import { TextField } from "formik-mui";

// Queries
import {
  DELETE_SPECIALISATION,
  GET_ALL_SPECIALISATIONS,
  GET_SPECIALISATION_BY_ID,
  UPDATE_SPECIALISATION,
} from "../../../../../graphql/specialisations";
import { useMutation, useQuery } from "@apollo/client";
import {
  Course,
  Person,
  Project,
  Specialisation,
} from "../../../../../interfaces";

// Custom Components
import BasicContainer from "../../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../../components/Admin/Dashboard";
import CustomLoading from "../../../../components/Admin/style/CustomLoading";

// Variabels
import { colors } from "../../../../utils/constants";
import {
  DELETE_COURSE,
  GET_COURSE_BY_ID,
  UPDATE_COURSE,
} from "../../../../../graphql/courses";
import { GET_ALL_LEARNING_LINES } from "../../../../../graphql/learningLines";
import CustomSingleSelect from "../../../../components/Admin/Form/CustomSingleSelect";

import { Remove, Add } from "@material-ui/icons";
import {
  GET_ALL_STUDENTS,
  GET_ALL_TEACHERS,
} from "../../../../../graphql/persons";
import CustomMultiSelectWithChips from "../../../../components/Admin/Form/CustomMultiSelectWithChips";
import { GET_ALL_COURSES } from "../../../../../graphql/courses";
import {
  DELETE_PROJECT,
  GET_PROJECT_BY_ID,
  UPDATE_PROJECT,
} from "../../../../../graphql/projects";

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

export default function editProject(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const adminPath = router.pathname.split("/admin/")[1].split("/")[0];
  const [project, setProject] = useState<Project>();
  const [students, setStudents] = useState<Person[]>([]);

  const {
    data: dataGet,
    error: errorGet,
    loading: loadingGet,
  } = useQuery(GET_PROJECT_BY_ID, {
    variables: {
      id: Number(id),
    },
    ssr: true,
  });

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

  useEffect(() => {
    if (dataGet && dataStudents) {
      setProject(dataGet.project);

      const studentsFromData = dataGet.project.students?.map(
        (studentFromDb: Person) =>
          dataStudents.students.find((s: Person) => s.id === studentFromDb.id)
      );

      setStudents(studentsFromData);
    }
  }, [dataGet, dataStudents]);

  const [
    updateProject,
    { data: dataProject, loading: loadingProject, error: errorProject },
  ] = useMutation(UPDATE_PROJECT, {
    notifyOnNetworkStatusChange: true,
  });

  const [deleteProject, { data, loading, error }] = useMutation(DELETE_PROJECT);

  const handleDelete = () => {
    deleteProject({
      variables: {
        id: Number(id),
      },
      notifyOnNetworkStatusChange: true,
    }).then(() => (window.location.href = `/admin/${adminPath}`));
  };

  return (
    <BasicContainer title="Bewerk Project">
      <Dashboard title="Bewerk Project">
        <Box
          sx={{
            maxWidth: "lg",
          }}
        >
          {!project || !dataCourses || !dataStudents ? (
            <CustomLoading />
          ) : (
            <>
              <Formik
                initialValues={{
                  name: project?.name || "",
                  teaserText: project?.teaserText || "",
                  body: project?.body || "",
                  academicYear: project?.academicYear || "",
                  tags: project?.tags || [],
                  courseId: project?.courseId || "",
                  students: project?.students || [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  console.log("...values", values);

                  updateProject({
                    variables: {
                      input: {
                        name: values.name,
                        teaserText: values.teaserText,
                        body: values.body,
                        academicYear: values.academicYear,
                        tags: values.tags,
                        courseId: values.courseId,
                        studentIds: values.students?.map((s: Person) => s.id),
                      },
                      id: project?.id,
                    },
                  });

                  if (!loadingProject && !errorProject) {
                    window.location.href = `/admin/${adminPath}`;
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
                        value={values.courseId}
                        name="courseId"
                        data={dataCourses.courses}
                        extraData="academicYear"
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
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Box margin={1}>
                        <Button
                          sx={{ margin: 1 }}
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                          onClick={submitForm}
                          // type="submit"
                        >
                          Pas aan
                        </Button>
                      </Box>
                      <Box margin={1}>
                        <Button
                          sx={{
                            margin: 1,
                            // backgroundColor: colors.delete,
                            color: colors.delete,
                            borderColor: colors.delete,
                            "&:hover": {
                              backgroundColor: colors.delete,
                              color: colors.white,
                              borderColor: colors.delete,
                            },
                          }}
                          variant="outlined"
                          disabled={isSubmitting}
                          onClick={(e) => handleDelete()}
                        >
                          Verwijder
                        </Button>
                      </Box>
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
            </>
          )}
        </Box>
      </Dashboard>
    </BasicContainer>
  );
}
