import React, { ChangeEvent, ReactElement, useState } from "react";

// Formik & Yup
import * as yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";

// Material UI Components
import { Button, Grid, Typography, Paper } from "@mui/material";
import { TextField } from "formik-mui";
import { Remove, Add } from "@material-ui/icons";
import { styled } from "@mui/material/styles";
import LandscapeIcon from "@mui/icons-material/Landscape";

// Queries
import { CREATE_COMPANY } from "../../../../graphql/companies";
import { GET_ALL_STUDENTS } from "../../../../graphql/persons";
import { useMutation, useQuery } from "@apollo/client";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
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
        .matches(/^[0-9]{4}$/, "Jaar moet 4 cijfers bevatten")
        .required("Jaar is verplicht"),
    })
  ),
});

export default function createCompany(): ReactElement {
  const [imageSrc, setImageSrc] = useState<string>();
  const [uploadData, setUploadData] = useState<File>();

  const [addCompany, { data, loading, error }] = useMutation(CREATE_COMPANY);

  const {
    data: dataStudents,
    error: errorStudents,
    loading: loadingStudents,
  } = useQuery(GET_ALL_STUDENTS, {
    ssr: true,
  });

  const Input = styled("input")({
    display: "none",
  });

  const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("...file", file);
    if (e.target?.files && e.target?.files.length > 0) {
      const file = e.target.files[0];
      setUploadData(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    const formData: any = new FormData();
    try {
      formData.append("file", uploadData);
      const response = await fetch("http://localhost:3000/photos/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      //   console.log(await response.json());
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BasicContainer title="Nieuw Leerbedrijf">
      {loadingStudents ? (
        <CustomLoading />
      ) : (
        <Formik
          initialValues={{
            name: "",
            teaserImage: "",
            interns: [],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            console.log("....UPLOAD", uploadData);

            const imageUpload = await handleUpload();
            // console.log("....res", await res);

            addCompany({
              variables: {
                input: {
                  name: values.name,
                  teaserImage: imageUpload && imageUpload.imagePath,
                  interns: values.interns,
                  // file: uploadData || null,
                },
              },
            });
            if (!error && !loading) {
              //   window.location.href = "/admin/companies";
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
                spacing={2}
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

                <Grid item xs={12} md={4}>
                  <Paper
                    sx={{
                      //   width: "100%",
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
                      color={imageSrc ? "warning" : "primary"}
                    >
                      {imageSrc
                        ? "Teaser Image aanpassen"
                        : "Teaser Image toevoegen"}
                    </Button>
                  </label>
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
                            <Grid
                              item
                              xs={12}
                              key={index}
                              sx={{
                                mb: "1rem",
                              }}
                              container
                              spacing={2}
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
                              </Grid>
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
