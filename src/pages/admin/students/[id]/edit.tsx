import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Formik & Yup
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

// Material UI Components
import { Button, Grid, Paper } from "@mui/material";
import { TextField } from "formik-mui";
import LandscapeIcon from "@mui/icons-material/Landscape";

// Queries
import {
  DELETE_PERSON,
  GET_PERSON_BY_ID,
  UPDATE_PERSON,
} from "../../../../../graphql/persons";
import { useMutation, useQuery } from "@apollo/client";

// Custom Components
import BasicContainer from "../../../../components/Admin/style/BasicContainer";
import CustomLoading from "../../../../components/Admin/style/CustomLoading";

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

export default function EditStudentPage(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const [imageSrc, setImageSrc] = useState<string>();
  const [uploadData, setUploadData] = useState<File>();

  const {
    data: dataGet,
    error: errorGet,
    loading: loadingGet,
  } = useQuery(GET_PERSON_BY_ID, {
    variables: {
      id: Number(id),
    },
    errorPolicy: "all",
    ssr: true,
  });

  const [
    updateStudent,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_PERSON, {
    notifyOnNetworkStatusChange: true,
  });

  const [
    deletePerson,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_PERSON, {
    notifyOnNetworkStatusChange: true,
  });

  const handleDelete = () => {
    deletePerson({
      variables: {
        id: Number(id),
      },
      notifyOnNetworkStatusChange: true,
    });
    if (!errorDelete && !loadingDelete) {
      window.location.href = "/admin/students";
    }
  };

  const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target?.files.length > 0) {
      const file = e.target.files[0];
      setUploadData(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (dataGet?.person) {
      setImageSrc(dataGet.person.avatarUrl);
    }
  }, [dataGet]);

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
    <BasicContainer title="Bewerk Student">
      {loadingGet ? (
        <CustomLoading />
      ) : (
        <Formik
          initialValues={{
            firstName: dataGet.person.firstName || "",
            lastName: dataGet.person.lastName || "",
            academicYear: dataGet.person.academicYear || "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            let imageUpload;

            if (imageSrc && imageSrc.split("http").length <= 1) {
              imageUpload = await handleUpload();
            }

            updateStudent({
              variables: {
                input: {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  type: "STUDENT",
                  avatarUrl: imageUpload && imageUpload.imagePath,
                  academicYear: values.academicYear,
                },
                id: Number(id),
              },
            });
            if (!errorUpdate && !loadingUpdate) {
              setSubmitting(false);
              window.location.href = "/admin/students";
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
