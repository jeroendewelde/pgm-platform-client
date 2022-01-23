import React, { ReactElement, useState } from "react";
import Router from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, Form, Formik, FieldArray } from "formik";

// Material UI Components
import {
  Button,
  Fab,
  Typography,
  Switch,
  FormControlLabel,
  Grid,
} from "@mui/material";
import Box from "@mui/material/Box";
import { TextField } from "formik-mui";
import { Remove, Add } from "@material-ui/icons";

// Queries
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_SOCIAL_MEDIA_PLATFORMS } from "../../../../graphql/enums";
import {
  CREATE_FIELD_EXPERIENCE,
  CREATE_PERSON,
  CREATE_PERSON_INFORMATION,
  CREATE_SOCIAL_MEDIA,
} from "../../../../graphql/persons";
import { Course, FieldExperience, SocialMedia } from "../../../../interfaces";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";
import CustomDatePicker from "../../../components/Admin/Form/CustomDatePicker";
import CustomSingleSelectForEnum from "../../../components/Admin/Form/CustomSingleSelectForEnum";
import CustomLoading from "../../../components/Admin/style/CustomLoading";
import { GET_ALL_COURSES } from "../../../../graphql/courses";
import CustomMultiSelectWithChips from "../../../components/Admin/Form/CustomMultiSelectWithChips";
import { ModeEditOutlined, DeleteOutline } from "@mui/icons-material";

const validationSchema = yup.object({
  firstName: yup.string().required("Voornaam is verplicht"),
  lastName: yup.string().required("Familienaam is verplicht"),
  quote: yup.string(),
  bio: yup.string(),
  //   dob: yup.date().required("Geboortedatum is verplicht"),
});

export default function createTeacher(): ReactElement {
  const [
    addTeacher,
    { data: dataTeacher, loading: loadingTeacher, error: errorTeacher },
  ] = useMutation(CREATE_PERSON);

  const {
    data: dataSocialMediaPlatforms,
    error: errorSocialMediaPlatforms,
    loading: loadingSocialMediaPlatforms,
  } = useQuery(GET_ALL_SOCIAL_MEDIA_PLATFORMS, {
    ssr: true,
  });

  const {
    data: dataCourses,
    error: errorCourses,
    loading: loadingCourses,
  } = useQuery(GET_ALL_COURSES, {
    ssr: true,
  });

  const [showExtraInfo, setShowExtraInfo] = useState(false);
  const [showCourses, setShowCourses] = useState(false);

  const labelSwitch = {
    inputProps: { "aria-label": "Extra informatie toevoegen" },
  };

  const handleChangeSwitchExtraInfo = () => {
    setShowExtraInfo(!showExtraInfo);
  };

  const handleChangeSwitchCourseInfo = () => {
    setShowCourses(!showCourses);
  };

  return (
    <BasicContainer title="Nieuwe Docent">
      {loadingSocialMediaPlatforms || loadingCourses ? (
        <CustomLoading />
      ) : (
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            dob: null,
            quote: "",
            bio: "",
            fieldExperiences: [],
            socialMedias: [],
            courses: [],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            addTeacher({
              variables: {
                input: {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  type: "TEACHER",
                  courseIds: values.courses.map((course: Course) => course.id),
                  personInformation: {
                    dob: values.dob,
                    quote: values.quote,
                    bio: values.bio,
                    fieldExperiences: values.fieldExperiences,
                    socialMedias: values.socialMedias,
                  },
                },
              },
            });
            if (!errorTeacher && !loadingTeacher) {
              window.location.href = Router.pathname.split("/create")[0];
            }
          }}
        >
          {({ values, submitForm, isSubmitting }) => (
            <Form>
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{
                  pt: 2,
                  maxWidth: "lg",
                }}
              >
                <Grid item xs={12} sm={12} md={12}>
                  <Field
                    required
                    component={TextField}
                    name="firstName"
                    type="text"
                    label="Voornaam"
                    helperText=""
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Field
                    required
                    component={TextField}
                    name="lastName"
                    type="text"
                    label="Familienaam"
                    helperText=""
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
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
                    Docenten
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "black" }}>
                    De vakken die deze docent geeft, dit kan nog aangepast
                    worden
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Field
                    required
                    component={CustomMultiSelectWithChips}
                    label="Vakken"
                    name="courses"
                    placeholder="Zoek een vak..."
                    // data={dataLearningLines.teachers}
                    data={dataCourses.courses}
                    // helperText="Naam van de docenten"
                    labelProps={["name", "academicYear"]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        {...labelSwitch}
                        onChange={handleChangeSwitchExtraInfo}
                      />
                    }
                    label="Extra informatie toevoegen"
                    sx={{
                      color: "black",
                      ml: 1,
                    }}
                  />
                </Grid>

                {showExtraInfo && (
                  <>
                    <Grid item xs={12} sm={12} md={12}>
                      <Field
                        component={TextField}
                        name="quote"
                        type="text"
                        label="Quote"
                        helperText="Quote over het leven of over de docent"
                        multiline
                        maxRows={2}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Field
                        component={TextField}
                        name="bio"
                        type="text"
                        label="Bio"
                        helperText="Kleine biografie over de docent"
                        multiline
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Field
                        component={CustomDatePicker}
                        name="dob"
                        type="date"
                        label="Geboortedatum"
                        helperText=""
                        // defaultValue="1969-04-20"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{
                          width: "100%",
                          // maxWidth: 'lg'
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <FieldArray
                        name="fieldExperiences"
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
                              Optionele Werkervaringen
                            </Typography>
                            {values.fieldExperiences &&
                            values.fieldExperiences.length > 0 ? (
                              values.fieldExperiences.map((tag, index) => (
                                <div key={index}>
                                  <Box margin={1}>
                                    <Field
                                      component={TextField}
                                      name={`fieldExperiences.${index}.company`}
                                      type="text"
                                      label="Bedrijf"
                                      helperText="Optioneel bedrijf/sector waar de docent werkzaam was"
                                    />
                                    <Field
                                      component={TextField}
                                      name={`fieldExperiences.${index}.function`}
                                      type="text"
                                      label="Functie"
                                      helperText="Optionele functie die beoefend is"
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
                                        arrayHelpers.insert(index, {
                                          company: "",
                                          function: "",
                                        })
                                      }
                                    >
                                      <Add />
                                    </Button>
                                  </Box>
                                </div>
                              ))
                            ) : (
                              <Button
                                sx={{ margin: 1 }}
                                variant="outlined"
                                disabled={isSubmitting}
                                onClick={() =>
                                  arrayHelpers.push({
                                    company: "",
                                    function: "",
                                  })
                                }
                              >
                                Werk-ervaring toevoegen
                              </Button>
                            )}
                          </div>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <FieldArray
                        name="socialMedias"
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
                              Optionele Social Media toevoegen
                            </Typography>
                            {values.socialMedias &&
                            values.socialMedias.length > 0 ? (
                              values.socialMedias.map((tag, index) => (
                                <div key={index}>
                                  <Grid item xs={12} sm={12} md={6}>
                                    <Field
                                      component={TextField}
                                      name={`socialMedias.${index}.url`}
                                      type="text"
                                      label="url"
                                      helpText=""
                                      fullWidth
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={6}>
                                    <Field
                                      required
                                      component={CustomSingleSelectForEnum}
                                      label="Platform"
                                      // name="platform"
                                      fullWidth
                                      name={`socialMedias.${index}.platform`}
                                      data={
                                        dataSocialMediaPlatforms.__type
                                          .enumValues
                                      }
                                      sx={{
                                        width: "100%",
                                      }}
                                      helperText="Optioneel platform"
                                    />
                                  </Grid>
                                  <Button
                                    sx={{ margin: 1 }}
                                    variant="outlined"
                                    disabled={isSubmitting}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <Remove /> {index}
                                  </Button>

                                  <Button
                                    sx={{ margin: 1 }}
                                    variant="outlined"
                                    disabled={isSubmitting}
                                    onClick={
                                      () =>
                                        arrayHelpers.push({
                                          platform: "",
                                          url: "",
                                        })
                                      // arrayHelpers.insert(index + 1, {
                                      //   platform: "",
                                      //   url: "",
                                      // })
                                    }
                                  >
                                    <Add /> {index}
                                  </Button>
                                </div>
                              ))
                            ) : (
                              <Button
                                sx={{ margin: 1 }}
                                variant="outlined"
                                disabled={isSubmitting}
                                onClick={() =>
                                  arrayHelpers.push({
                                    platform: "",
                                    url: "",
                                  })
                                }
                              >
                                Social Media Toevoegen
                              </Button>
                            )}
                          </div>
                        )}
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12} sm={12} md={12}>
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
                </Grid>
              </Grid>
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
      )}
    </BasicContainer>
  );
}
