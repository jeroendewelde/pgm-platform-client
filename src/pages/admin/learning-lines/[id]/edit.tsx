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
  DELETE_LEARNING_LINE,
  GET_LEARNING_LINE_BY_ID,
  UPDATE_LEARNING_LINE,
} from "../../../../../graphql/learningLines";
import { useMutation, useQuery } from "@apollo/client";
import { LearningLine } from "../../../../../interfaces";

// Custom Components
import BasicContainer from "../../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../../components/Admin/Dashboard";
import CustomLoading from "../../../../components/Admin/style/CustomLoading";

// Variabels
import { colors } from "../../../../utils/constants";

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

export default function editLearningLine(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const adminPath = router.pathname.split("/admin/")[1].split("/")[0];
  const [learningLine, setLearningLine] = useState<LearningLine>();

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

  useEffect(() => {
    if (dataGet) {
      setLearningLine(dataGet.learningLine);
    }
  }, [dataGet]);

  const [
    updateLearningLine,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_LEARNING_LINE, {
    notifyOnNetworkStatusChange: true,
  });

  const [deleteLearningLine, { data, loading, error }] =
    useMutation(DELETE_LEARNING_LINE);

  const handleDelete = () => {
    deleteLearningLine({
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
          {!learningLine ? (
            <CustomLoading />
          ) : (
            <>
              <Formik
                initialValues={{
                  name: learningLine?.name ? learningLine?.name : "",
                  color: learningLine?.color ? learningLine?.color : "",
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
                      id: learningLine?.id,
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
                        value={values.name ? values.name : learningLine?.name}
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
                        value={
                          values.color ? values.color : learningLine?.color
                        }
                        helperText="Kleur van de leerlijn"
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
