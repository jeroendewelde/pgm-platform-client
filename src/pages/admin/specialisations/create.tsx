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
import { CREATE_SPECIALISATION } from "../../../../graphql/specialisations";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";

const validationSchema = yup.object({
  name: yup.string().required("Naam is verplicht"),
  academicYear: yup
    .string()
    .matches(
      /20[0-9]{2}-20[0-9]{2}/,
      "De duurtijd moet in het formaat 2019-2021 zijn"
    )
    .required("Academiejaren is verplicht"),
});

export default function createLearningLine(): ReactElement {
  const router = useRouter();
  const [addSpecialisation, { data, loading, error }] = useMutation(
    CREATE_SPECIALISATION
  );

  return (
    <BasicContainer title="Nieuwe Afstudeerrichting">
      <Formik
        initialValues={{
          name: "",
          academicYear: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          addSpecialisation({
            variables: {
              input: {
                name: values.name,
                academicYear: values.academicYear,
              },
            },
          });
          if (!error && !loading) {
            setSubmitting(false);
            window.location.href = "/admin/specialisations";
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
              <Grid item xs={12} md={8}>
                <Field
                  required
                  component={TextField}
                  name="name"
                  type="text"
                  label="Naam"
                  helperText="Naam van de afstudeerrichting"
                  fullWidth
                  multiline
                  maxRows={2}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Field
                  required
                  component={TextField}
                  name="academicYear"
                  type="text"
                  label="Academiejaren"
                  helperText="Academiejaren in formaat 2019-2021"
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
