import React, { ReactElement } from "react";
import { useRouter } from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";

// Material UI Components
import { Button, Grid, TextField as TextMUI, Typography } from "@mui/material";
import { Remove, Add } from "@material-ui/icons";
import { TextField } from "formik-mui";
import { CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";

// Queries
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COURSE } from "../../../../graphql/courses";
import { GET_ALL_LEARNING_LINES } from "../../../../graphql/learningLines";
import { GET_ALL_SPECIALISATIONS } from "../../../../graphql/specialisations";
import { GET_ALL_TEACHERS } from "../../../../graphql/persons";
import { Person } from "../../../../interfaces";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import CustomSingleSelect from "../../../components/Admin/Form/CustomSingleSelect";
import CustomMultiSelectWithChips from "../../../components/Admin/Form/CustomMultiSelectWithChips";
import CustomLoading from "../../../components/Admin/style/CustomLoading";

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
  term: yup.number().min(1).max(8).required("Periode is verplicht"),
  learningLineId: yup.number().required("Leerlijn is verplicht"),
  specialisationId: yup.number().required("Afstudeerrichting is verplicht"),
});

export default function createCourse(): ReactElement {
  const router = useRouter();
  const [addCourse, { data, loading, error }] = useMutation(CREATE_COURSE, {
    notifyOnNetworkStatusChange: true,
  });
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
    errorPolicy: "all",
  });

  return (
    <BasicContainer title="Nieuw Vak">
      {loadingLearningLines || loadingSpecialisations || loadingTeachers ? (
        <CustomLoading />
      ) : (
        <Formik
          initialValues={{
            name: "",
            teaserImage: "",
            description: "",
            term: "",
            academicYear: "",
            tags: [],
            learningLineId: "",
            specialisationId: "",
            teachers: [],
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
                  teacherIds: values.teachers.map(
                    (teacher: Person) => teacher.id
                  ),
                },
                // attachments: values.attachments,
              },
            });
            if (!error && !loading) {
              setSubmitting(false);
              window.location.href = "/admin/courses";
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
                <Grid item xs={12} md={7} lg={8} xl={9}>
                  <Field
                    required
                    component={TextField}
                    name="name"
                    type="text"
                    label="Naam"
                    helperText="Naam van het vak"
                    fullWidth
                    multiline
                    maxRows={2}
                  />
                </Grid>
                <Grid item xs={6} md={3} lg={2} xl={2}>
                  <Field
                    required
                    component={TextField}
                    name="academicYear"
                    type="text"
                    label="Academiejaar"
                    helperText="in formaat 2019-2020"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} md={2} lg={2} xl={1}>
                  <Field
                    required
                    component={TextField}
                    name="term"
                    type="number"
                    label="Periode"
                    helperText=" "
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    component={TextField}
                    name="description"
                    type="text"
                    label="Beschrijving"
                    helperText="Beschrijving van het vak"
                    fullWidth
                    multiline
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    required
                    component={CustomSingleSelect}
                    name="learningLineId"
                    label="Leerlijn"
                    helperText="Naam van de Leerlijn"
                    fullWidth
                    data={dataLearningLines.learningLines}
                    labelProps={["name"]}
                    sx={{
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    required
                    component={CustomSingleSelect}
                    name="specialisationId"
                    label="Afstudeerrichting"
                    helperText="Naam van de Afstudeerrichting"
                    data={dataSpecialisations.specialisations}
                    labelProps={["name", "academicYear"]}
                    sx={{
                      width: "100%",
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h2" component="h2">
                    Docenten
                  </Typography>
                  <Typography variant="subtitle1">
                    De docenten die dit vak in deze periode geven, dit kan nog
                    aangepast worden
                  </Typography>

                  <Field
                    required
                    component={CustomMultiSelectWithChips}
                    name="teachers"
                    label="Docenten"
                    placeholder="Zoek een docent..."
                    data={dataTeachers.teachers}
                    labelProps={["firstName", "lastName"]}
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
