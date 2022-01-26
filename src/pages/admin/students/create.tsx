import React, { ChangeEvent, ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Formik & Yup
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

// Material UI Components
import { Button, Paper, Grid } from "@mui/material";
import { TextField } from "formik-mui";
import LandscapeIcon from "@mui/icons-material/Landscape";

// Queries
import { useMutation } from "@apollo/client";
import { CREATE_PERSON } from "../../../../graphql/persons";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";

const validationSchema = yup.object({
  firstName: yup.string().required("Voornaam is verplicht"),
  lastName: yup.string().required("Familienaam is verplicht"),
  academicYear: yup
    .string()
    .matches(
      /20[0-9]{2}-20[0-9]{2}/,
      "De duurtijd moet in het formaat 2019-2020 zijn"
    )
    .required("Academiejaren is verplicht"),
});

export default function CreateStudentPage(): ReactElement {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<string>();
  const [uploadData, setUploadData] = useState<File>();
  const [addStudent, { data, loading, error }] = useMutation(CREATE_PERSON, {
    notifyOnNetworkStatusChange: true,
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
    <BasicContainer title="Nieuwe Student">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          academicYear: "",
          avatarUrl: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);

          const imageUpload = uploadData ? await handleUpload() : null;

          addStudent({
            variables: {
              input: {
                firstName: values.firstName,
                lastName: values.lastName,
                academicYear: values.academicYear,
                type: "STUDENT",
                avatarUrl: imageUpload && imageUpload.imagePath,
              },
            },
          });
          if (!error && !loading) {
            setSubmitting(false);
            // window.location.href = "/admin/students";
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
              <Grid item xs={12} md={6} lg={5}>
                <Field
                  required
                  component={TextField}
                  name="firstName"
                  type="text"
                  label="Voornaam"
                  helperText=""
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} lg={5}>
                <Field
                  required
                  component={TextField}
                  name="lastName"
                  type="text"
                  label="Familienaam"
                  helperText=""
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4} lg={2}>
                <Field
                  required
                  component={TextField}
                  name="academicYear"
                  type="text"
                  label="Academiejaren"
                  helperText="Academiejaar in formaat 2019-2020"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <Grid item xs={8}>
                  <Paper
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#E5E5E5",
                      overflow: "hidden",
                      maxWidth: 240,
                    }}
                    style={{
                      aspectRatio: "3 / 4",
                      position: "relative",
                    }}
                  >
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt="avatar student"
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
                        ? "Avatar Image aanpassen"
                        : "Avatar Image toevoegen"}
                    </Button>
                  </label>
                </Grid>
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
    </BasicContainer>
  );
}
