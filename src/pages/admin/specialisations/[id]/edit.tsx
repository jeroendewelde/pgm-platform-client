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

export default function editSpecialisation(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const adminPath = router.pathname.split("/admin/")[1].split("/")[0];
  const [specialisation, setSpecialisation] = useState<Specialisation>();

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

  useEffect(() => {
    if (dataGet) {
      setSpecialisation(dataGet.specialisation);
    }
  }, [dataGet]);

  const [
    updateSpecialisation,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_SPECIALISATION, {
    notifyOnNetworkStatusChange: true,
  });

  const [deleteSpecialisation, { data, loading, error }] = useMutation(
    DELETE_SPECIALISATION
  );

  const handleDelete = () => {
    deleteSpecialisation({
      variables: {
        id: Number(id),
      },
      notifyOnNetworkStatusChange: true,
    }).then(() => (window.location.href = `/admin/${adminPath}`));
  };

  return (
    <BasicContainer title="Bewerk Afstudeerrichting">
      <Dashboard title="Bewerk Afstudeerrichting">
        <Box
          sx={{
            maxWidth: "lg",
          }}
        >
          {!specialisation ? (
            <CustomLoading />
          ) : (
            <>
              <Formik
                initialValues={{
                  name: specialisation?.name ? specialisation?.name : "",
                  academicYear: specialisation?.academicYear
                    ? specialisation?.academicYear
                    : "",
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
                      id: specialisation?.id,
                    },
                  }).then(() => {
                    window.location.href = `/admin/${adminPath}`;
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
                        value={values.name ? values.name : specialisation?.name}
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
                        value={
                          values.name
                            ? values.academicYear
                            : specialisation?.academicYear
                        }
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
