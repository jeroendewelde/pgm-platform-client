import React, { ReactElement } from "react";
import { useRouter } from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

// Material UI Components
import { Button, Grid } from "@mui/material";
import { TextField } from "formik-mui";

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
  const [addStudent, { data, loading, error }] = useMutation(CREATE_PERSON, {
    notifyOnNetworkStatusChange: true,
  });

  return (
    <BasicContainer title="Nieuwe Student">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          academicYear: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          addStudent({
            variables: {
              input: {
                firstName: values.firstName,
                lastName: values.lastName,
                academicYear: values.academicYear,
                type: "STUDENT",
              },
            },
          });
          if (!error && !loading) {
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
