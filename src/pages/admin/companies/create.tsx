import React, { ReactElement } from "react";
import Router from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";

// Material UI Components
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { TextField } from "formik-mui";

// Queries
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_SPECIALISATION } from "../../../../graphql/specialisations";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";
import { CREATE_TESTIMONIAL } from "../../../../graphql/testimonials";
import { CREATE_COMPANY } from "../../../../graphql/companies";
import { Remove, Add } from "@material-ui/icons";
import { GET_ALL_STUDENTS } from "../../../../graphql/persons";
import CustomLoading from "../../../components/Admin/style/CustomLoading";
import CustomSingleSelect from "../../../components/Admin/Form/CustomSingleSelect";

const validationSchema = yup.object({
  name: yup.string().required("Naam van het leerbedrijf is verplicht"),
  interns: yup.array().of(
    yup.object({
      function: yup.string().required("Uitgeoefende functie is verplict"),
      description: yup.string().required("Beschrijving is verplicht"),
      year: yup
        .string()
        // .length(4, "Jaar moet 4 cijfers bevatten")
        .matches(/^[0-9]{4}$/, "Jaar moet 4 cijfers bevatten")
        .required("Jaar is verplicht"),
    })
  ),
});

export default function createCompany(): ReactElement {
  const [addTestimonial, { data, loading, error }] =
    useMutation(CREATE_COMPANY);

  const {
    data: dataStudents,
    error: errorStudents,
    loading: loadingStudents,
  } = useQuery(GET_ALL_STUDENTS, {
    ssr: true,
  });

  return (
    <BasicContainer title="Nieuw Leerbedrijf">
      <Dashboard title="Nieuw Leerbedrijf">
        {loadingStudents ? (
          <CustomLoading />
        ) : (
          <>
            <Box
              sx={{
                maxWidth: "lg",
              }}
            >
              <Formik
                initialValues={{
                  name: "",
                  teaserImage: "",
                  interns: [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  addTestimonial({
                    variables: {
                      input: {
                        name: values.name,
                        teaserImage: values.teaserImage,
                        interns: values.interns,
                      },
                    },
                  });
                  if (!error && !loading) {
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
                        helperText=" "
                        multiline
                        maxRows={2}
                        sx={{
                          width: "75%",
                          // maxWidth: 'lg'
                        }}
                      />
                    </Box>
                    <Box margin={1}>
                      <Field
                        component={TextField}
                        name="teaserImage"
                        type="text"
                        label="Teaser Image"
                        helperText="link naar de teaser image"
                        // fullWidth
                      />
                    </Box>

                    <Box margin={1}>
                      <FieldArray
                        name="interns"
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
                              Studenten
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: "black" }}
                            >
                              Studenten die bij dit leerbedrijf hun
                              werkplekleren hebben beoefend
                            </Typography>
                            {values.interns && values.interns.length > 0 ? (
                              values.interns.map((tag, index) => (
                                <div key={index}>
                                  <Box margin={1}>
                                    <Field
                                      component={TextField}
                                      name={`interns.${index}.function`}
                                      type="text"
                                      label="Functie"
                                      helperText=" "
                                    />
                                    <Field
                                      component={TextField}
                                      name={`interns.${index}.description`}
                                      type="text"
                                      label="Beschrijving"
                                      helperText=" "
                                    />
                                    <Field
                                      required
                                      component={TextField}
                                      name={`interns.${index}.year`}
                                      type="text"
                                      label="Jaar"
                                      helperText="Jaar wanneer de student stage heeft gelopen"
                                      sx={{
                                        minWidth: "25%",
                                        margin: 1,
                                      }}
                                      // fullWidth
                                    />

                                    <Field
                                      required
                                      component={CustomSingleSelect}
                                      label="Student"
                                      name={`interns.${index}.studentId`}
                                      data={dataStudents.students}
                                      sx={{
                                        flexGrow: 1,

                                        border: "1px solid #e0e0e0",
                                      }}
                                      helperText="Naam van de Student"
                                      labelProps={[
                                        "firstName",
                                        "lastName",
                                        "academicYear",
                                      ]}
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
                                        arrayHelpers.push({
                                          function: "",
                                          description: "",
                                          year: "",
                                          studentId: "",
                                        })
                                      }
                                    >
                                      <Add />
                                    </Button>
                                  </Box>
                                </div>
                              ))
                            ) : (
                              <Button
                                sx={{ margin: 1 }}
                                variant="outlined"
                                disabled={isSubmitting}
                                onClick={() =>
                                  arrayHelpers.push({
                                    function: "",
                                    description: "",
                                    year: "",
                                    studentId: "",
                                  })
                                }
                              >
                                studenten toevoegen
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
