import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

// Material UI Components
import { Button, Grid } from "@mui/material";
import { TextField } from "formik-mui";

// Queries
import {
  DELETE_SPECIALISATION,
  GET_SPECIALISATION_BY_ID,
  UPDATE_SPECIALISATION,
} from "../../../../../graphql/specialisations";
import { useMutation, useQuery } from "@apollo/client";

// Custom Components
import BasicContainer from "../../../../components/Admin/style/BasicContainer";
import CustomLoading from "../../../../components/Admin/style/CustomLoading";

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

export default function EditSpecialisationPage(): ReactElement {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: dataGet,
    error: errorGet,
    loading: loadingGet,
  } = useQuery(GET_SPECIALISATION_BY_ID, {
    variables: {
      id: Number(id),
    },
    ssr: true,
  });

  const [
    updateSpecialisation,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_SPECIALISATION, {
    notifyOnNetworkStatusChange: true,
  });

  const [
    deleteSpecialisation,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_SPECIALISATION, {
    notifyOnNetworkStatusChange: true,
  });

  const handleDelete = () => {
    deleteSpecialisation({
      variables: {
        id: Number(id),
      },
    });
    if (!errorDelete && !loadingDelete) {
      window.location.href = "/admin/specialisations";
    }
  };

  return (
    <BasicContainer title="Bewerk Afstudeerrichting">
      {loadingGet ? (
        <CustomLoading />
      ) : (
        <Formik
          initialValues={{
            name: dataGet?.specialisation.name || "",
            academicYear: dataGet?.specialisation.academicYear || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            updateSpecialisation({
              variables: {
                input: {
                  name: values.name,
                  academicYear: values.academicYear,
                },
                id: Number(id),
              },
            });
            if (!errorUpdate && !loadingUpdate) {
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
