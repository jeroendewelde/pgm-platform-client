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
import { CREATE_TESTIMONIAL } from "../../../../graphql/testimonials";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";

const validationSchema = yup.object({
  quote: yup.string().required("Quote is verplicht"),
});

export default function CreateTestimonialPage(): ReactElement {
  const router = useRouter();
  const [addTestimonial, { data, loading, error }] =
    useMutation(CREATE_TESTIMONIAL);

  return (
    <BasicContainer title="Nieuwe Testimonial">
      <Formik
        initialValues={{
          quote: "",
          name: "",
          company: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          addTestimonial({
            variables: {
              input: {
                quote: values.quote,
                name: values.name,
                company: values.company,
              },
            },
          });
          if (!error && !loading) {
            window.location.href = "/admin/testimonials";
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
                  name="quote"
                  type="text"
                  label="Quote"
                  multiline
                  fullWidth
                  maxRows={3}
                  rows={3}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  component={TextField}
                  name="name"
                  type="text"
                  label="Auteur"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  component={TextField}
                  name="company"
                  type="text"
                  label="Bedrijf"
                  helperText="Optioneel bedrijf"
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
