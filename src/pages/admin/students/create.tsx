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
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PERSON } from "../../../../graphql/persons";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";

const validationSchema = yup.object({
  firstName: yup.string().required("Voornaam is verplicht"),
  lastName: yup.string().required("Familienaam is verplicht"),
  academicYear: yup
    .string()
    .matches(
      /20[0-9]{2}-20[0-9]{2}/,
      "De duurtijd moet in het formaat 2019-2020 zijn"
    )
    .required("Academiejaar is verplicht"),
});

export default function createStudent(): ReactElement {
  const [
    addStudent,
    { data: dataStudent, loading: loadingStudent, error: errorStudent },
  ] = useMutation(CREATE_PERSON);

  return (
    <BasicContainer title="Nieuwe Student">
      <Dashboard title="Nieuwe Student">
        <>
          <Box
            sx={{
              maxWidth: "lg",
            }}
          >
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                academicYear: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log("values.....", values);
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
                if (!errorStudent && !loadingStudent) {
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
                      name="firstName"
                      type="text"
                      label="Voornaam"
                      helperText=""
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
                      name="lastName"
                      type="text"
                      label="Familienaam"
                      helperText=""
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
                      label="Academiejaar"
                      helperText="Academiejaar in formaat 2019-2020"
                      sx={{
                        minWidth: "25%",
                        margin: 1,
                      }}
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
                      type="submit"
                    >
                      Maak aan
                    </Button>
                  </Box>

                  <pre
                    style={{
                      color: "black",
                    }}
                  >
                    {JSON.stringify(values, null, 2)}
                  </pre>
                </Form>
              )}
            </Formik>
          </Box>
        </>
      </Dashboard>
    </BasicContainer>
  );
}
