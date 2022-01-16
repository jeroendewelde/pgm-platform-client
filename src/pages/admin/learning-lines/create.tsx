import React, { ReactElement } from "react";
import Router from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

// Material UI Components
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { TextField } from "formik-mui";

// Queries
import { CREATE_LEARNING_LINE } from "../../../../graphql/learningLines";
import client from "../../../../apollo-client";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";
import { useMutation } from "@apollo/client";

const validationSchema = yup.object({
  name: yup.string().required("Naam is verplicht"),
  color: yup
    .string()
    .matches(
      /(^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$)/,
      "Kleur moet een hexadecimaal getal zijn, bv. #FFFFFF"
    )
    .required("Kleur is verplicht"),
});

export default function createLearningLine(): ReactElement {
  const [addLearningLine, { data, loading, error }] =
    useMutation(CREATE_LEARNING_LINE);

  return (
    <BasicContainer title="Nieuwe Leerlijn">
      <Dashboard title="Nieuwe Leerlijn">
        <Box
          sx={{
            maxWidth: "lg",
          }}
        >
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
              }).then(() => {
                window.location.href = Router.pathname.split("/create")[0];
              });
            }}
          >
            {({ values, submitForm, isSubmitting }) => (
              <Form>
                <Box margin={1}>
                  <Field
                    required
                    component={TextField}
                    name="name"
                    type="text"
                    label="Naam"
                    helperText="Naam van de leerlijn"
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
                    required
                    component={TextField}
                    name="color"
                    type="text"
                    label="Kleur"
                    helperText="Kleur van de leerlijn"
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
