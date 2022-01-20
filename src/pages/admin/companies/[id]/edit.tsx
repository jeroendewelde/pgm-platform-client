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
  GET_SPECIALISATION_BY_ID,
  UPDATE_SPECIALISATION,
} from "../../../../../graphql/specialisations";
import { useMutation, useQuery } from "@apollo/client";
import { Specialisation } from "../../../../../interfaces";

// Custom Components
import BasicContainer from "../../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../../components/Admin/Dashboard";
import CustomLoading from "../../../../components/Admin/style/CustomLoading";

// Variabels
import { colors } from "../../../../utils/constants";
import {
  DELETE_TESTIMONIAL,
  GET_TESTIMONIAL_BY_ID,
  UPDATE_TESTIMONIAL,
} from "../../../../../graphql/testimonials";
import {
  DELETE_COMPANY,
  GET_COMPANY_BY_ID,
  UPDATE_COMPANY,
} from "../../../../../graphql/companies";
import { UPDATE_COURSE } from "../../../../../graphql/courses";
import { GET_ALL_STUDENTS } from "../../../../../graphql/persons";
import CustomSingleSelect from "../../../../components/Admin/Form/CustomSingleSelect";
import { Remove, Add } from "@material-ui/icons";

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

export default function editCompany(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const adminPath = router.pathname.split("/admin/")[1].split("/")[0];

  const {
    data: dataGet,
    error: errorGet,
    loading: loadingGet,
  } = useQuery(GET_COMPANY_BY_ID, {
    variables: {
      id: Number(id),
    },
    ssr: true,
  });

  const {
    data: dataStudents,
    error: errorStudents,
    loading: loadingStudents,
  } = useQuery(GET_ALL_STUDENTS, {
    ssr: true,
  });

  const [
    updateCompany,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_COMPANY, {
    notifyOnNetworkStatusChange: true,
  });

  const [deleteCompany, { data, loading, error }] = useMutation(DELETE_COMPANY);

  const handleDelete = () => {
    deleteCompany({
      variables: {
        id: Number(id),
      },
      notifyOnNetworkStatusChange: true,
    }).then(() => (window.location.href = `/admin/${adminPath}`));
  };

  return (
    <BasicContainer title="Bewerk Leerbedrijf">
      <Dashboard title="Bewerk Leerbedrijf">
        <Box
          sx={{
            maxWidth: "lg",
          }}
        >
          {loadingGet || loadingStudents ? (
            <CustomLoading />
          ) : (
            <>
              <Formik
                initialValues={{
                  name: dataGet?.company.name || "",
                  teaserImage: dataGet?.company.teaserImage || "",
                  interns: dataGet?.company.interns || [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);

                  updateCompany({
                    variables: {
                      input: {
                        name: values.name,
                        teaserImage: values.teaserImage,
                        // interns: values.interns,
                        interns: values.interns.map((intern: Intern) => {
                          const { __typename, ...rest } = intern;
                          return rest;
                        }),
                      },
                      id: Number(id),
                    },
                  });
                  if (!error && !loading) {
                    // window.location.href = `/admin/${adminPath}`;
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
                                      value={values.interns[index].studentId}
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

                    <pre>{JSON.stringify(values, null, 2)}</pre>
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
