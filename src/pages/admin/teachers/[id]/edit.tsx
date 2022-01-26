import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";

// Material UI Components
import {
  Button,
  Grid,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Remove, Add } from "@material-ui/icons";
import { TextField } from "formik-mui";

// Queries
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_SOCIAL_MEDIA_PLATFORMS } from "../../../../../graphql/enums";
import { GET_ALL_COURSES } from "../../../../../graphql/courses";
import {
  DELETE_PERSON,
  GET_PERSON_BY_ID,
  UPDATE_PERSON,
} from "../../../../../graphql/persons";

// Custom Components
import BasicContainer from "../../../../components/Admin/style/BasicContainer";
import CustomLoading from "../../../../components/Admin/style/CustomLoading";
import CustomDatePicker from "../../../../components/Admin/Form/CustomDatePicker";
import CustomSingleSelectForEnum from "../../../../components/Admin/Form/CustomSingleSelectForEnum";
import CustomMultiSelectWithChips from "../../../../components/Admin/Form/CustomMultiSelectWithChips";

// Variabels
import {
  Course,
  FieldExperience,
  SocialMedia,
} from "../../../../../interfaces";

const validationSchema = yup.object({
  firstName: yup.string().required("Voornaam is verplicht"),
  lastName: yup.string().required("Familienaam is verplicht"),
  quote: yup.string(),
  bio: yup.string(),
});

export default function EditTeacherPage(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const [showExtraInfo, setShowExtraInfo] = useState(false);

  const handleChangeSwitchExtraInfo = () => {
    setShowExtraInfo(!showExtraInfo);
  };

  const [
    updateTeacher,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_PERSON, {
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: dataGet,
    error: errorGet,
    loading: loadingGet,
  } = useQuery(GET_PERSON_BY_ID, {
    variables: {
      id: Number(id),
    },
    errorPolicy: "all",
    ssr: true,
  });

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

  const [
    deletePerson,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_PERSON, {
    notifyOnNetworkStatusChange: true,
  });

  const labelSwitch = {
    inputProps: { "aria-label": "Extra informatie toevoegen" },
  };

  useEffect(() => {
    if (dataGet && dataGet?.person?.personInformation) {
      setShowExtraInfo(true);
    }
  }, [dataGet]);

  const handleDelete = () => {
    deletePerson({
      variables: {
        id: Number(id),
      },
      notifyOnNetworkStatusChange: true,
    });
    if (!errorDelete && !loadingDelete) {
      window.location.href = "/admin/teachers";
    }
  };

  return (
    <BasicContainer title="Bewerk Docent">
      {loadingGet || loadingCourses || loadingSocialMediaPlatforms ? (
        <CustomLoading />
      ) : (
        <Formik
          initialValues={{
            firstName: dataGet.person.firstName || "",
            lastName: dataGet.person.lastName || "",
            dob: dataGet.person?.personInformation?.dob || null,
            quote: dataGet.person?.personInformation?.quote || "",
            bio: dataGet.person?.personInformation?.bio || "",
            courses: dataGet.person?.courses.map((courseFromDb: Course) =>
              dataCourses.courses.find((t: Course) => t.id === courseFromDb.id)
            ),
            fieldExperiences:
              dataGet.person?.personInformation?.fieldExperiences?.map(
                (fe: FieldExperience) => {
                  return {
                    company: fe.company,
                    function: fe.function,
                  };
                }
              ) || [],
            socialMedias:
              dataGet.person?.personInformation?.socialMedias?.map(
                (sm: SocialMedia) => {
                  return {
                    platform: sm.platform,
                    url: sm.url,
                  };
                }
              ) || [],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            updateTeacher({
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
                id: Number(id),
              },
            });
            if (!errorUpdate && !loadingUpdate) {
              setSubmitting(false);
              window.location.href = "/admin/teachers";
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
                <Grid item xs={12} md={6} lg={5}>
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
                <Grid item xs={12} md={6} lg={5}>
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

                <Grid item xs={12}>
                  <Typography variant="h2" component="h2">
                    Vakken
                  </Typography>
                  <Typography variant="subtitle1">
                    De vakken die deze docent geeft, dit kan nog aangepast
                    worden
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Field
                    required
                    component={CustomMultiSelectWithChips}
                    name="courses"
                    label="Vakken"
                    placeholder="Zoek een vak..."
                    data={dataCourses.courses}
                    labelProps={["name", "academicYear"]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        {...labelSwitch}
                        checked={showExtraInfo}
                        onChange={handleChangeSwitchExtraInfo}
                      />
                    }
                    label="Extra informatie toevoegen"
                  />
                </Grid>

                {showExtraInfo && (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="h2" component="h2">
                        Extra Informatie
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Field
                        component={TextField}
                        name="quote"
                        type="text"
                        label="Quote"
                        helperText="Quote over het leven of over de docent"
                        fullWidth
                        multiline
                        maxRows={2}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Field
                        component={TextField}
                        name="bio"
                        type="text"
                        label="Bio"
                        helperText="Kleine biografie over de docent"
                        fullWidth
                        multiline
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Field
                        component={CustomDatePicker}
                        name="dob"
                        value={values.dob}
                        type="date"
                        label="Geboortedatum"
                        helperText=""
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{
                          width: "100%",
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="h2" component="h2">
                        Optionele Werkervaringen
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <FieldArray
                        name="fieldExperiences"
                        render={(arrayHelpers) => (
                          <div>
                            {values.fieldExperiences &&
                            values.fieldExperiences.length > 0 ? (
                              values.fieldExperiences.map(
                                (fe: FieldExperience, index: number) => (
                                  <Grid
                                    item
                                    xs={12}
                                    key={index}
                                    sx={{
                                      mb: "1rem",
                                    }}
                                    container
                                    spacing={{ xs: 2 }}
                                  >
                                    <Grid item xs={12} lg={6}>
                                      <Field
                                        component={TextField}
                                        name={`fieldExperiences.${index}.company`}
                                        type="text"
                                        label="Bedrijf"
                                        helperText="Optioneel bedrijf/sector waar de docent werkzaam was"
                                        fullWidth
                                      />
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                      <Field
                                        component={TextField}
                                        name={`fieldExperiences.${index}.function`}
                                        type="text"
                                        label="Functie"
                                        helperText="Optionele functie die beoefend is"
                                        fullWidth
                                      />
                                    </Grid>

                                    <Grid item xs={12} lg={2}>
                                      <Button
                                        sx={{ margin: 1 }}
                                        variant="outlined"
                                        disabled={isSubmitting}
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      >
                                        <Remove />
                                      </Button>

                                      <Button
                                        sx={{ margin: 1 }}
                                        variant="outlined"
                                        disabled={isSubmitting}
                                        onClick={() =>
                                          arrayHelpers.insert(index + 1, {
                                            company: "",
                                            function: "",
                                          })
                                        }
                                      >
                                        <Add />
                                      </Button>
                                    </Grid>
                                  </Grid>
                                )
                              )
                            ) : (
                              <Grid item xs={12}>
                                <Button
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
                              </Grid>
                            )}
                          </div>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="h2" component="h2">
                        Optionele Social Media
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                      <FieldArray
                        name="socialMedias"
                        render={(arrayHelpers) => (
                          <div>
                            {values.socialMedias &&
                            values.socialMedias.length > 0 ? (
                              values.socialMedias.map(
                                (tag: string, index: number) => (
                                  <Grid
                                    item
                                    xs={12}
                                    key={index}
                                    sx={{
                                      mb: "1rem",
                                    }}
                                    container
                                    spacing={{ xs: 2 }}
                                  >
                                    <Grid item xs={12} lg={6}>
                                      <Field
                                        component={TextField}
                                        name={`socialMedias.${index}.url`}
                                        type="text"
                                        label="url"
                                        helpText=""
                                        fullWidth
                                      />
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                      <Field
                                        required
                                        component={CustomSingleSelectForEnum}
                                        label="Platform"
                                        fullWidth
                                        name={`socialMedias.${index}.platform`}
                                        value={
                                          values.socialMedias[index].platform
                                        }
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

                                    <Grid item xs={12} md={3} lg={2}>
                                      <Button
                                        sx={{ margin: 1 }}
                                        variant="outlined"
                                        disabled={isSubmitting}
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      >
                                        <Remove />
                                      </Button>

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
                                        <Add />
                                      </Button>
                                    </Grid>
                                  </Grid>
                                )
                              )
                            ) : (
                              <Grid item xs={12}>
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
                              </Grid>
                            )}
                          </div>
                        )}
                      />
                    </Grid>
                  </>
                )}

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
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      )}
    </BasicContainer>
  );
}
