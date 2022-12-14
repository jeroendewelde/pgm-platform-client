import React, { ChangeEvent, ReactElement, useState } from "react";
import Image from "next/image";

// Formik & Yup
import * as yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";

// Material UI Components
import { Button, Divider, Grid, Typography, Paper } from "@mui/material";
import { TextField } from "formik-mui";
import { Remove, Add } from "@material-ui/icons";
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

export default function CreateCompanyPage(): ReactElement {
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

  const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}photos/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
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
            teaserIamge: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            const imageUpload = uploadData ? await handleUpload() : null;

            addCompany({
              variables: {
                input: {
                  name: values.name,
                  teaserImage: imageUpload ? imageUpload.imagePath : null,
                  interns: values.interns,
                },
              },
            });
            if (!error && !loading) {
              window.location.href = "/admin/companies";
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
                <Grid item xs={12}>
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper
                      sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#E5E5E5",
                        overflow: "hidden",
                      }}
                      style={{
                        aspectRatio: "16 / 9",
                        position: "relative",
                      }}
                    >
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt="teaser image bedrijf"
                          layout="fill"
                          objectFit="cover"
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
                      <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleOnChangeImage}
                        style={{
                          display: "none",
                        }}
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
