import React, { ReactElement } from "react";
import { useRouter } from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

// Material UI Components
import { Button, Grid } from "@mui/material";
import { TextField } from "formik-mui";

// Queries
import {
  DELETE_LEARNING_LINE,
  GET_LEARNING_LINE_BY_ID,
  UPDATE_LEARNING_LINE,
} from "../../../../../graphql/learningLines";
import { useMutation, useQuery } from "@apollo/client";

// Custom Components
import BasicContainer from "../../../../components/Admin/style/BasicContainer";
import CustomLoading from "../../../../components/Admin/style/CustomLoading";

const validationSchema = yup.object({
  name: yup.string().required("Naam is verplicht"),
  color: yup.string().required("Kleur is verplicht"),
});

export default function EditLearningLinePage(): ReactElement {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: dataGet,
    error: errorGet,
    loading: loadingGet,
  } = useQuery(GET_LEARNING_LINE_BY_ID, {
    variables: {
      id: Number(id),
    },
    ssr: true,
  });

  const [
    updateLearningLine,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_LEARNING_LINE, {
    notifyOnNetworkStatusChange: true,
  });

  const [
    deleteLearningLine,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_LEARNING_LINE, {
    notifyOnNetworkStatusChange: true,
  });

  const handleDelete = () => {
    deleteLearningLine({
      variables: {
        id: Number(id),
      },
      notifyOnNetworkStatusChange: true,
    });
    if (!errorDelete && !loadingDelete) {
      window.location.href = "/admin/testimonials";
    }
  };

  return (
    <BasicContainer title="Bewerk Leerlijn">
      {loadingGet ? (
        <CustomLoading />
      ) : (
        <Formik
          initialValues={{
            name: dataGet?.learningLine.name || "",
            color: dataGet?.learningLine.color || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            updateLearningLine({
              variables: {
                input: {
                  name: values.name,
                  color: values.color,
                },
                id: Number(id),
              },
            });
            if (!errorUpdate && !loadingUpdate) {
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
