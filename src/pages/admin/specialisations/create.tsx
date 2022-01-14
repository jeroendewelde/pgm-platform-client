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

interface createLearningLineProps {}

export default function createLearningLine({}: createLearningLineProps): ReactElement {
  const [addSpecialisation, { data, loading, error }] = useMutation(
    CREATE_SPECIALISATION
  );

  return (
    <BasicContainer title="Nieuwe Afstudeerrichting">
      <Dashboard title="Nieuwe Afstudeerrichting">
        <Box
          sx={{
            maxWidth: "lg",
          }}
        >
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
                    helperText="Naam van de afstudeerrichting"
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
                    name="academicYear"
                    type="text"
                    label="Academiejaren"
                    helperText="Academiejaren in formaat 2019-2021"
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
