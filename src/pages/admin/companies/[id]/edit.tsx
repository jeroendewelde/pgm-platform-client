import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";

// Material UI Components
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { TextField } from "formik-mui";

// Queries
import {
  DELETE_SPECIALISATION,
  GET_SPECIALISATION_BY_ID,
  UPDATE_SPECIALISATION,
} from "../../../../../graphql/specialisations";
import { useMutation, useQuery } from "@apollo/client";
import { Intern, Specialisation } from "../../../../../interfaces";

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
import { styled } from "@mui/material/styles";
import LandscapeIcon from "@mui/icons-material/Landscape";

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
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

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

  const [
    deleteCompany,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_COMPANY);

  const handleDelete = () => {
    deleteCompany({
      variables: {
        id: Number(id),
      },
      notifyOnNetworkStatusChange: true,
    }).then(() => (window.location.href = `/admin/${adminPath}`));
  };

  const Input = styled("input")({
    display: "none",
  });

  const handleOnChangeImage = ({ target: { files } }) => {
    const file = files[0];
    console.log("...file", file);
    if (files.length > 0) {
      setUploadData(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  return (
    <BasicContainer title="Bewerk Leerbedrijf">
      {loadingGet || loadingStudents ? (
        <CustomLoading />
      ) : (
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
                  //   interns: values.interns,
                  interns: values.interns.map((intern) => {
                    const { __typename, ...rest } = intern;
                    return rest;
                  }),
                  //   internIds: values.interns.map(
                  //     (intern: Intern) => intern.studentId
                  //   ),
                  //   interns: values.interns.map((intern: Intern) => {
                  //     const { __typename, ...rest } = intern;
                  //     return rest;
                  //   }),
                },
                id: Number(id),
              },
            });
            if (!errorUpdate && !loadingUpdate) {
              window.location.href = `/admin/${adminPath}`;
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
                <Grid item xs={12}>
                  <Field
                    required
                    component={TextField}
                    name="name"
                    type="text"
                    label="Naam"
                    fullWidth
                    multiline
                    maxRows={2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="teaserImage"
                    type="text"
                    label="Teaser Image"
                    helperText="link naar de teaser image"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleOnChangeImage}
                    />
                    <Button
                      variant="outlined"
                      component="span"
                      color={imageSrc && "warning"}
                    >
                      {imageSrc
                        ? "Teaser Image aanpassen"
                        : "Teaser Image toevoegen"}
                    </Button>
                  </label>
                  <Paper
                    sx={{
                      width: "100%",
                      height: 180,
                      width: 320,
                      mt: 2,
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#E5E5E5",
                      overflow: "hidden",
                    }}
                  >
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt="teaser image"
                        style={{
                          height: 180,
                          width: 320,
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <LandscapeIcon
                        sx={{
                          color: "#FFF",
                          fontSize: 64,
                        }}
                      />
                    )}
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h2" component="h2">
                    Studenten
                  </Typography>
                  <Typography variant="subtitle1">
                    Studenten die bij dit leerbedrijf hun werkplekleren hebben
                    beoefend
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FieldArray
                    name="interns"
                    render={(arrayHelpers) => (
                      <div>
                        {values.interns && values.interns.length > 0 ? (
                          values.interns.map((tag, index) => (
                            // <Grid
                            //   item
                            //   xs={12}
                            //   key={index}
                            //   sx={
                            //     {
                            //       // mb: "1rem",
                            //     }
                            //   }
                            //   container
                            //   // CHECK SPACING
                            //   //   spacing={{ xs: 2 }}
                            // >

                            <Grid
                              container
                              spacing={{ xs: 2 }}
                              key={index}
                              sx={{
                                maxWidth: "xl",
                              }}
                            >
                              <Grid item xs={12} lg={5} xl={4}>
                                <Field
                                  required
                                  component={CustomSingleSelect}
                                  name={`interns.${index}.studentId`}
                                  label="Student"
                                  helperText="Naam van de Student"
                                  fullWidth
                                  data={dataStudents.students}
                                  value={values.interns[index].studentId}
                                  otherId="studentId"
                                  //   value={75}
                                  labelProps={[
                                    "firstName",
                                    "lastName",
                                    "academicYear",
                                  ]}
                                  sx={{
                                    width: "100%",
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} lg={5}>
                                <Field
                                  required
                                  component={TextField}
                                  name={`interns.${index}.function`}
                                  type="text"
                                  label="Functie"
                                  helperText=" "
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={12} lg={2} xl={3}>
                                <Field
                                  required
                                  component={TextField}
                                  name={`interns.${index}.year`}
                                  type="text"
                                  label="Jaar"
                                  helperText="Jaar wanneer de student stage heeft gelopen"
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={12} md={9} lg={10}>
                                <Field
                                  required
                                  component={TextField}
                                  name={`interns.${index}.description`}
                                  type="text"
                                  label="Beschrijving"
                                  helperText=" "
                                  fullWidth
                                  multiline
                                  maxRows={2}
                                />
                              </Grid>
                              <Grid item xs={12} md={3} lg={2}>
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
                                    arrayHelpers.insert(index + 1, {
                                      function: "",
                                      description: "",
                                      year: "",
                                      studentId: "",
                                    })
                                  }
                                >
                                  <Add />
                                </Button>
                              </Grid>
                              {index < values.interns.length - 1 && (
                                <Grid
                                  item
                                  xs={12}
                                  sx={{
                                    mb: 5,
                                  }}
                                >
                                  <Divider orientation="horizontal" flexItem />
                                </Grid>
                              )}
                            </Grid>
                          ))
                        ) : (
                          <Grid item xs={12}>
                            <Button
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
                          </Grid>
                        )}
                      </div>
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                  }}
                >
                  <Button
                    variant="contained"
                    disabled={isSubmitting || loadingDelete}
                    onClick={submitForm}
                  >
                    Pas aan
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      marginLeft: "auto",
                    }}
                    disabled={isSubmitting || loadingDelete}
                    onClick={(e) => handleDelete()}
                  >
                    Verwijder
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
