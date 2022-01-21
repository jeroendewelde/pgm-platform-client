import React, { ReactElement } from "react";
import Router from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

// Material UI Components
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { TextField } from "formik-mui";

// Queries
import { useMutation } from "@apollo/client";
import { CREATE_SPECIALISATION } from "../../../../graphql/specialisations";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";
import { CREATE_TESTIMONIAL } from "../../../../graphql/testimonials";

const validationSchema = yup.object({
  quote: yup.string().required("Quote is verplicht"),
});

export default function createTestimonial(): ReactElement {
  const [addTestimonial, { data, loading, error }] =
    useMutation(CREATE_TESTIMONIAL);

  return (
    <BasicContainer title="Nieuwe Testimonial">
      <Dashboard title="Nieuwe Testimonial">
        <Box
          sx={{
            maxWidth: "lg",
          }}
        >
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
                window.location.href = Router.pathname.split("/create")[0];
              }
            }}
          >
            {({ values, submitForm, isSubmitting }) => (
              <Form>
                <Box margin={1}>
                  <Field
                    required
                    component={TextField}
                    name="quote"
                    type="text"
                    label="Quote"
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
                    name="name"
                    type="text"
                    label="Auteur"
                    helperText=" "
                    // fullWidth
                  />
                </Box>
                <Box margin={1}>
                  <Field
                    component={TextField}
                    name="company"
                    type="text"
                    label="Bedrijf"
                    helperText="Optioneel bedrijf"
                    // fullWidth
                  />
                </Box>
                <Box margin={1}>
                  <Button
                    sx={{ margin: 1 }}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    // type="submit"
                  >
                    Maak aan
                  </Button>
                </Box>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Form>
            )}
          </Formik>
        </Box>
      </Dashboard>
    </BasicContainer>
  );
}
