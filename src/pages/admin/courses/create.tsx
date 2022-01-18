import React, { ReactElement } from "react";
import Router from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";

// Material UI Components
import {
  Button,
  Typography,
  Autocomplete,
  Chip,
  TextField as TextMUI,
  Checkbox,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Remove, Add } from "@material-ui/icons";
import { TextField } from "formik-mui";

// Queries
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COURSE, GET_ALL_COURSES } from "../../../../graphql/courses";
import { GET_ALL_LEARNING_LINES } from "../../../../graphql/learningLines";
import { GET_ALL_SPECIALISATIONS } from "../../../../graphql/specialisations";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";
import CustomSingleSelect from "../../../components/Admin/Form/CustomSingleSelect";
import CustomMultiSelectWithChips from "../../../components/Admin/Form/CustomMultiSelectWithChips";
import CustomLoading from "../../../components/Admin/style/CustomLoading";
import { GET_ALL_TEACHERS } from "../../../../graphql/persons";
import CustomMultiSelect from "../../../components/Admin/Form/CustomMultiSelect";
import { Person } from "../../../../interfaces";
import { CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";

const validationSchema = yup.object({
  name: yup.string().required("Naam is verplicht"),
  description: yup.string().required("Beschrijving is verplicht"),
  academicYear: yup
    .string()
    .matches(
      /20[0-9]{2}-20[0-9]{2}/,
      "De duurtijd moet in het formaat 2019-2020 zijn"
    )
    .required("Academiejaar is verplicht"),
  learningLineId: yup.number().required("Leerlijn is verplicht"),
  //   tags: yup.array().of(yup.string()).required("Tags zijn verplicht"),

  // specialisationId: yup.string().required('Naam is verplicht'),
  // color: yup.string().matches(/(^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$)/, 'Kleur moet een hexadecimaal getal zijn, bv. #FFFFFF').required('Kleur is verplicht')
});

export default function createCourse(): ReactElement {
  const [addCourse, { data, loading, error }] = useMutation(CREATE_COURSE);
  const checkBoxIcon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIconChecked = <CheckBox fontSize="small" />;

  const {
    data: dataLearningLines,
    error: errorLearningLines,
    loading: loadingLearningLines,
  } = useQuery(GET_ALL_LEARNING_LINES, {
    ssr: true,
  });

  const {
    data: dataSpecialisations,
    error: errorSpecialisations,
    loading: loadingSpecialisations,
  } = useQuery(GET_ALL_SPECIALISATIONS, {
    ssr: true,
  });

  const {
    data: dataTeachers,
    error: errorTeachers,
    loading: loadingTeachers,
  } = useQuery(GET_ALL_TEACHERS, {
    ssr: true,
  });

  return (
    <BasicContainer title="Nieuw Vak">
      <Dashboard title="Nieuw Vak">
        {loadingLearningLines || loadingSpecialisations || loadingTeachers ? (
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
                  description: "",
                  term: "",
                  academicYear: "",
                  tags: [],
                  learningLineId: "",
                  specialisationId: "",
                  teachers: [],
                  //   fieldExperiences: [],
                  // attachments: [],
                  // teachers: [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);

                  addCourse({
                    variables: {
                      input: {
                        name: values.name,
                        description: values.description,
                        term: values.term,
                        academicYear: values.academicYear,
                        tags: values.tags,
                        learningLineId: values.learningLineId,
                        specialisationId: values.specialisationId,
                        // attachments: values.attachments,
                        teacherIds: values.teachers.map(
                          (teacher: Person) => teacher.id
                        ),
                      },
                    },
                  }).then(
                    () =>
                      (window.location.href =
                        Router.pathname.split("/create")[0])
                  );
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
                        helperText="Naam van het vak"
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
                        name="description"
                        type="text"
                        label="Beschrijving"
                        helperText="Beschrijving van het vak"
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
                        name="term"
                        type="number"
                        label="Periode"
                        helperText="Periode van het vak"
                        sx={{
                          minWidth: "25%",
                          margin: 1,
                        }}
                        // fullWidth
                      />
                      {/* </Box> */}
                      {/* <Box margin={1}> */}
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
                        label="Leerlijn"
                        name="learningLineId"
                        data={dataLearningLines.learningLines}
                        sx={{
                          // minWidth: '45%',
                          // minWidth: '40%',
                          width: "50%",
                          flexGrow: 1,

                          // margin: 1,
                          border: "1px solid #e0e0e0",
                        }}
                        helperText="Naam van de Leerlijn"

                        // name="academicYear"
                        // type="text"
                        // label="Academiejaar"
                        // helperText="Academiejaar in formaat 2019-2020"
                        // fullWidth
                      />
                    </Box>

                    <Box margin={1}>
                      <Field
                        required
                        component={CustomSingleSelect}
                        label="Afstudeerrichting"
                        name="specialisationId"
                        data={dataSpecialisations.specialisations}
                        extraData={"academicYear"}
                        sx={{
                          minWidth: "50%",
                          // minWidth: '40%',
                          // margin: 1
                        }}
                        helperText="Naam van de Afstudeerrichting"

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
                        Docenten
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        De docenten die dit vak in deze periode geven, dit kan
                        nog aangepast worden
                      </Typography>

                      <Box margin={1}>
                        <Field
                          required
                          component={CustomMultiSelectWithChips}
                          label="Docenten"
                          name="teachers"
                          // data={dataLearningLines.teachers}
                          data={dataTeachers.teachers}
                          // helperText="Naam van de docenten"
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

const teachersDataTest = [
  {
    id: 1,
    firstName: "voornaam",
    lastName: "familienaam",
    type: "TEACHER",
  },
  {
    id: 2,
    firstName: "Jeroen",
    lastName: "Dewelde",
    type: "TEACHER",
  },
  {
    id: 3,
    firstName: "Pieter",
    lastName: "Dewelde",
    type: "TEACHER",
  },
];
