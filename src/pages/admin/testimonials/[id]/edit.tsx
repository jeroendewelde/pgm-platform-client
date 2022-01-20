import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

// Material UI Components
import { Box, Button } from "@mui/material";
import { TextField } from "formik-mui";

// Queries
import {
  DELETE_SPECIALISATION,
  GET_SPECIALISATION_BY_ID,
  UPDATE_SPECIALISATION,
} from "../../../../../graphql/specialisations";
import { useMutation, useQuery } from "@apollo/client";
import { Specialisation } from "../../../../../interfaces";

// Custom Components
import BasicContainer from "../../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../../components/Admin/Dashboard";
import CustomLoading from "../../../../components/Admin/style/CustomLoading";

// Variabels
import { colors } from "../../../../utils/constants";
import {
  DELETE_TESTIMONIAL,
  GET_TESTIMONIAL_BY_ID,
  UPDATE_TESTIMONIAL,
} from "../../../../../graphql/testimonials";

const validationSchema = yup.object({
  quote: yup.string().required("Quote is verplicht"),
});

export default function editSpecialisation(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const adminPath = router.pathname.split("/admin/")[1].split("/")[0];

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

  const [deleteTestimonial, { data, loading, error }] =
    useMutation(DELETE_TESTIMONIAL);

  const handleDelete = () => {
    deleteTestimonial({
      variables: {
        id: Number(id),
      },
      notifyOnNetworkStatusChange: true,
    }).then(() => (window.location.href = `/admin/${adminPath}`));
  };

  return (
    <BasicContainer title="Bewerk Testimonial">
      <Dashboard title="Bewerk Testimonial">
        <Box
          sx={{
            maxWidth: "lg",
          }}
        >
          {loadingGet ? (
            <CustomLoading />
          ) : (
            <>
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
                  if (!error && !loading) {
                    window.location.href = `/admin/${adminPath}`;
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
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Box margin={1}>
                        <Button
                          sx={{ margin: 1 }}
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                          onClick={submitForm}
                          // type="submit"
                        >
                          Pas aan
                        </Button>
                      </Box>
                      <Box margin={1}>
                        <Button
                          sx={{
                            margin: 1,
                            // backgroundColor: colors.delete,
                            color: colors.delete,
                            borderColor: colors.delete,
                            "&:hover": {
                              backgroundColor: colors.delete,
                              color: colors.white,
                              borderColor: colors.delete,
                            },
                          }}
                          variant="outlined"
                          disabled={isSubmitting}
                          onClick={(e) => handleDelete()}
                        >
                          Verwijder
                        </Button>
                      </Box>
                    </Box>

                    <pre>{JSON.stringify(values, null, 2)}</pre>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </Box>
      </Dashboard>
    </BasicContainer>
  );
}
