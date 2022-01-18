import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";

// Material UI Components
import { Box, Button, Typography } from "@mui/material";
import { TextField } from "formik-mui";

// Queries
import {
  DELETE_SPECIALISATION,
  GET_ALL_SPECIALISATIONS,
  GET_SPECIALISATION_BY_ID,
  UPDATE_SPECIALISATION,
} from "../../../../../graphql/specialisations";
import { useMutation, useQuery } from "@apollo/client";
import { Course, Specialisation } from "../../../../../interfaces";

// Custom Components
import BasicContainer from "../../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../../components/Admin/Dashboard";
import CustomLoading from "../../../../components/Admin/style/CustomLoading";

// Variabels
import { colors } from "../../../../utils/constants";
import {
  DELETE_COURSE,
  GET_COURSE_BY_ID,
  UPDATE_COURSE,
} from "../../../../../graphql/courses";
import { GET_ALL_LEARNING_LINES } from "../../../../../graphql/learningLines";
import CustomSingleSelect from "../../../../components/Admin/Form/CustomSingleSelect";

import { Remove, Add } from "@material-ui/icons";

const validationSchema = yup.object({
  name: yup.string().required("Naam is verplicht"),
  description: yup.string().required("Beschrijving is verplicht"),
  academicYear: yup
    .string()
    .matches(
      /20[0-9]{2}-20[0-9]{2}/,
      "De duurtijd moet in het formaat 2019-2020 zijn"
    )
    .required("Academiejaar is verplicht"),
  learningLineId: yup.number().required("Leerlijn is verplicht"),
  //   tags: yup.array().of(yup.string()).required("Tags zijn verplicht"),

  // specialisationId: yup.string().required('Naam is verplicht'),
  // color: yup.string().matches(/(^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$)/, 'Kleur moet een hexadecimaal getal zijn, bv. #FFFFFF').required('Kleur is verplicht')
});

export default function editCourse(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const adminPath = router.pathname.split("/admin/")[1].split("/")[0];
  const [course, setCourse] = useState<Course>();

  const {
    data: dataGet,
    error: errorGet,
    loading: loadingGet,
  } = useQuery(GET_COURSE_BY_ID, {
    variables: {
      id: Number(id),
    },
    ssr: true,
  });

  const {
    data: dataLearningLines,
    error: errorLearningLines,
    loading: loadingLearningLines,
  } = useQuery(GET_ALL_LEARNING_LINES, {
    ssr: true,
  });

  const {
    data: dataSpecialisations,
    error: errorSpecialisations,
    loading: loadingSpecialisations,
  } = useQuery(GET_ALL_SPECIALISATIONS, {
    ssr: true,
  });

  useEffect(() => {
    if (dataGet) {
      setCourse(dataGet.course);
    }
  }, [dataGet]);

  const [
    updateCourse,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_COURSE, {
    notifyOnNetworkStatusChange: true,
  });

  const [deleteCourse, { data, loading, error }] = useMutation(DELETE_COURSE);

  const handleDelete = () => {
    deleteCourse({
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
          {!course || !dataSpecialisations || !dataLearningLines ? (
            <CustomLoading />
          ) : (
            <>
              <Formik
                initialValues={{
                  name: course?.name || "",
                  description: course?.description || "",
                  term: course?.term || "",
                  academicYear: course?.academicYear || "",
                  tags: course?.tags || [],
                  learningLineId: course?.learningLineId || "",
                  specialisationId: course?.specialisationId || "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);

                  updateCourse({
                    variables: {
                      input: {
                        name: values.name,
                        description: values.description,
                        term: values.term,
                        academicYear: values.academicYear,
                        tags: values.tags,
                        learningLineId: values.learningLineId,
                        specialisationId: values.specialisationId,
                      },
                      id: course?.id,
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
                        value={values.name || course.name}
                        helperText="Naam van het vak"
                        multiline
                        maxRows={2}
                        sx={{
                          width: "100%",
                          // maxWidth: 'lg'
                        }}
                      />
                    </Box>
                    <Box margin={1}>
                      <Field
                        required
                        component={TextField}
                        name="description"
                        type="text"
                        label="Beschrijving"
                        // value={values.description || course.description}
                        helperText="Beschrijving van het vak"
                        multiline
                        sx={{
                          width: "100%",
                        }}
                        // fullWidth
                      />
                    </Box>
                    {/* <Box margin={1}> */}
                    <Box
                      sx={{
                        border: "1px solid #e0e0e0",
                        width: "100%",
                      }}
                    >
                      <Field
                        required
                        component={TextField}
                        name="term"
                        type="number"
                        label="Periode"
                        // value={values.term || course.term}
                        helperText="Periode van het vak"
                        sx={{
                          minWidth: "25%",
                          margin: 1,
                        }}
                        // fullWidth
                      />
                      {/* </Box> */}
                      {/* <Box margin={1}> */}
                      <Field
                        required
                        component={TextField}
                        name="academicYear"
                        type="text"
                        label="Academiejaar"
                        // value={values.academicYear || course.academicYear}
                        helperText="Academiejaar in formaat 2019-2020"
                        sx={{
                          minWidth: "25%",
                          margin: 1,
                        }}
                        // fullWidth
                      />
                    </Box>
                    {/* <Box sx={{
								  border: '1px solid #e0e0e0',
								  width: '100%',
								  display: 'flex',
								  justifyContent: 'stretch'
							  }}> */}

                    <Box
                      sx={{
                        margin: 1,
                        // display: 'flex',
                        // gap: 2
                      }}
                    >
                      <Field
                        required
                        component={CustomSingleSelect}
                        label="Leerlijn"
                        // value={values.learningLineId || course.learningLineId}
                        value={2}
                        name="learningLineId"
                        data={dataLearningLines.learningLines}
                        sx={{
                          // minWidth: '45%',
                          // minWidth: '40%',
                          width: "50%",
                          flexGrow: 1,

                          // margin: 1,
                          border: "1px solid #e0e0e0",
                        }}
                        helperText="Naam van de Leerlijn"

                        // name="academicYear"
                        // type="text"
                        // label="Academiejaar"
                        // helperText="Academiejaar in formaat 2019-2020"
                        // fullWidth
                      />
                    </Box>

                    <Box margin={1}>
                      <Field
                        required
                        component={CustomSingleSelect}
                        label="Afstudeerrichting"
                        value={
                          values.specialisationId || course.specialisationId
                        }
                        name="specialisationId"
                        data={dataSpecialisations.specialisations}
                        extraData={"academicYear"}
                        sx={{
                          minWidth: "50%",
                          // minWidth: '40%',
                          // margin: 1
                        }}
                        helperText="Naam van de Afstudeerrrichting"

                        // name="academicYear"
                        // type="text"
                        // label="Academiejaar"
                        // helperText="Academiejaar in formaat 2019-2020"
                        // fullWidth
                      />
                    </Box>
                    {/* </Box> */}

                    <Box margin={1}>
                      <FieldArray
                        name="tags"
                        render={(arrayHelpers) => (
                          <div>
                            <Typography
                              variant="h6"
                              noWrap
                              component="div"
                              sx={{
                                flexGrow: 1,
                                mb: 2,
                                // ml: 1,
                                color: "black",
                              }}
                            >
                              Optionele Tags
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: "black" }}
                            >
                              De tags kunnen talen/technologieën, vaardigheden
                              of andere belangrijke elementen zijn. Plaats de 5
                              meest belangrijkste bovenaan.
                            </Typography>
                            {values.tags && values.tags.length > 0 ? (
                              values.tags.map((tag, index) => (
                                <div key={index}>
                                  <Field
                                    component={TextField}
                                    name={`tags.${index}`}
                                    type="text"
                                    label="Tag"
                                  />

                                  <Button
                                    sx={{ margin: 1 }}
                                    variant="outlined"
                                    disabled={isSubmitting}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <Remove />
                                  </Button>

                                  <Button
                                    sx={{ margin: 1 }}
                                    variant="outlined"
                                    disabled={isSubmitting}
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    }
                                  >
                                    <Add />
                                  </Button>
                                </div>
                              ))
                            ) : (
                              <Button
                                sx={{ margin: 1 }}
                                variant="outlined"
                                disabled={isSubmitting}
                                onClick={() => arrayHelpers.push("")}
                              >
                                Tags toevoegen
                              </Button>
                            )}
                          </div>
                        )}
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
                          Maak aan
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
