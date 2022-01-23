import React, { ReactElement } from "react";
import { useRouter } from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

// Material UI Components
import { Button, Grid } from "@mui/material";
import { TextField } from "formik-mui";

// Queries
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_TESTIMONIAL,
  GET_TESTIMONIAL_BY_ID,
  UPDATE_TESTIMONIAL,
} from "../../../../../graphql/testimonials";

// Custom Components
import BasicContainer from "../../../../components/Admin/style/BasicContainer";
import CustomLoading from "../../../../components/Admin/style/CustomLoading";

const validationSchema = yup.object({
  quote: yup.string().required("Quote is verplicht"),
});

export default function editTestimonial(): ReactElement {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: dataGet,
    error: errorGet,
    loading: loadingGet,
  } = useQuery(GET_TESTIMONIAL_BY_ID, {
    variables: {
      id: Number(id),
    },
    ssr: true,
  });

  const [
    updateTestimonial,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_TESTIMONIAL, {
    notifyOnNetworkStatusChange: true,
  });

  const [
    deleteTestimonial,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_TESTIMONIAL);

  const handleDelete = () => {
    deleteTestimonial({
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
    <BasicContainer title="Bewerk Testimonial">
      {loadingGet ? (
        <CustomLoading />
      ) : (
        <Formik
          initialValues={{
            quote: dataGet?.testimonial.quote || "",
            name: dataGet?.testimonial.name || "",
            company: dataGet?.testimonial.company || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            updateTestimonial({
              variables: {
                input: {
                  quote: values.quote,
                  name: values.name,
                  company: values.company,
                },
                id: Number(id),
              },
            });
            if (!errorUpdate && !loadingUpdate) {
              setSubmitting(false);
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
