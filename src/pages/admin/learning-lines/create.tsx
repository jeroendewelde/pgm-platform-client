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
import { CREATE_LEARNING_LINE } from "../../../../graphql/learningLines";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";

const validationSchema = yup.object({
  name: yup.string().required("Naam is verplicht"),
  color: yup.string().required("Kleur is verplicht"),
});

export default function createLearningLine(): ReactElement {
  const router = useRouter();
  const [addLearningLine, { data, loading, error }] = useMutation(
    CREATE_LEARNING_LINE,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  return (
    <BasicContainer title="Nieuwe Leerlijn">
      <Formik
        initialValues={{
          name: "",
          color: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          addLearningLine({
            variables: {
              input: {
                name: values.name,
                color: values.color,
              },
            },
          });
          if (!error && !loading) {
            setSubmitting(false);
            window.location.href = "/admin/learning-lines";
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
                  helperText="Naam van de leerlijn"
                  fullWidth
                  multiline
                  maxRows={2}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Field
                  required
                  component={TextField}
                  name="color"
                  type="text"
                  label="Kleur"
                  helperText="Kleur van de leerlijn"
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
