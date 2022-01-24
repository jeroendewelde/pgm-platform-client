import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";

// Formik & Yup
import * as yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";

// Material UI Components
// import { Box, Button } from "@mui/material";
import {
  Box,
  Button,
  Fab,
  Grid,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { TextField } from "formik-mui";

// Queries
import {
  DELETE_SPECIALISATION,
  GET_SPECIALISATION_BY_ID,
  UPDATE_SPECIALISATION,
} from "../../../../../graphql/specialisations";
import { useMutation, useQuery } from "@apollo/client";
import {
  Course,
  FieldExperience,
  Person,
  PersonInformation,
  SocialMedia,
  Specialisation,
} from "../../../../../interfaces";

// Custom Components
import BasicContainer from "../../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../../components/Admin/Dashboard";
import CustomLoading from "../../../../components/Admin/style/CustomLoading";
import CustomDatePicker from "../../../../components/Admin/Form/CustomDatePicker";

// Variabels
import { colors } from "../../../../utils/constants";
import {
  DELETE_PERSON,
  GET_FIELD_EXPERIENCES_BY_PERSON_ID,
  GET_PERSON_BY_ID,
  GET_PERSON_INFORMATION_BY_PERSON_ID,
  UPDATE_PERSON,
} from "../../../../../graphql/persons";
import { Add, Remove } from "@mui/icons-material";
import CustomSingleSelectForEnum from "../../../../components/Admin/Form/CustomSingleSelectForEnum";
import { GET_ALL_SOCIAL_MEDIA_PLATFORMS } from "../../../../../graphql/enums";
import { GET_ALL_COURSES } from "../../../../../graphql/courses";
import CustomMultiSelectWithChips from "../../../../components/Admin/Form/CustomMultiSelectWithChips";

const validationSchema = yup.object({
  firstName: yup.string().required("Voornaam is verplicht"),
  lastName: yup.string().required("Familienaam is verplicht"),
});

export default function editTeacher(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const adminPath = router.pathname.split("/admin/")[1].split("/")[0];
  const [teacher, setTeacher] = useState<Person>();
  const [teacherInfo, setTeacherInfo] = useState<PersonInformation>();
  const [coursesNEW, setCourses] = useState<Course[]>([]);
  const [showExtraInfo, setShowExtraInfo] = useState(false);

  const handleChangeSwitchExtraInfo = () => {
    setShowExtraInfo(!showExtraInfo);
  };

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

  //   const {
  //     data: dataGetPersonInformation,
  //     error: errorGetPersonInformation,
  //     loading: loadingGetPersonInformation,
  //   } = useQuery(GET_PERSON_INFORMATION_BY_PERSON_ID, {
  //     variables: {
  //       id: Number(id),
  //     },
  //     ssr: true,
  //   });

  //   const {
  //     data: dataGetFieldExperiences,
  //     error: errorGetFieldExperiences,
  //     loading: loadingGetFieldExperiences,
  //   } = useQuery(GET_FIELD_EXPERIENCES_BY_PERSON_ID, {
  //     variables: {
  //       id: Number(id),
  //     },
  //     ssr: true,
  //   });

  useEffect(() => {
    if (dataGet && dataCourses) {
      setTeacher(dataGet.person);
      if (dataGet.person.personInformation) {
        console.log("extra info");
        // setTeacherInfo(dataGetPersonInformation.personInformation);
        // setShowExtraInfo(!showExtraInfo);
        handleChangeSwitchExtraInfo();
      }

      const coursesFromData = dataGet.person.courses.map(
        (courseFromDb: Course) =>
          // console.log("extra.....", extra);
          // data.includes(extra.id);
          // return data.map((t) => t.id === extra.id ? t : null).filter(t => t !== null);
          // return data.map((t) => (t.id === extra.id ? t : null));
          dataCourses.courses.find((t: Course) => t.id === courseFromDb.id)
      );
      console.log(".....coursesFromData....", coursesFromData);

      setCourses(coursesFromData);

      //   console.log(dataGet.person);
    }
    //   }, [dataGet, dataGetPersonInformation]);
  }, [dataGet, dataCourses]);

  const [
    updateTeacher,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_PERSON, {
    notifyOnNetworkStatusChange: true,
  });

  const [
    deletePerson,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_PERSON);

  const handleDelete = () => {
    deletePerson({
      variables: {
        id: Number(id),
      },
      notifyOnNetworkStatusChange: true,
    }).then(() => (window.location.href = `/admin/${adminPath}`));
  };

  const labelSwitch = {
    inputProps: { "aria-label": "Extra informatie toevoegen" },
  };

  return (
    <BasicContainer title="Bewerk Docent">
      {loadingGet ||
      loadingCourses ||
      loadingSocialMediaPlatforms ||
      !coursesNEW ? (
        <CustomLoading />
      ) : (
        <Formik
          initialValues={{
            firstName: dataGet.person.firstName || "",
            lastName: dataGet.person.lastName || "",
            dob: dataGet.person?.personInformation?.dob || null,
            quote: dataGet.person?.personInformation?.quote || "",
            bio: dataGet.person?.personInformation?.bio || "",

            // dob: "",
            // quote: "",
            // bio: "",
            //   fieldExperiences:
            //     dataGet.person?.personInformation?.fieldExperiences || [],
            socialMedias:
              // dataGet.person?.personInformation?.socialMedias || [],
              dataGet.person?.personInformation?.socialMedias?.map(
                (sm: SocialMedia) => {
                  return {
                    platform: sm.platform,
                    url: sm.url,
                    //   id: sm.id || null,
                  };
                }
              ) || [],
            fieldExperiences:
              // dataGet.person?.personInformation?.socialMedias || [],
              dataGet.person?.personInformation?.fieldExperiences?.map(
                (fe: FieldExperience) => {
                  return {
                    company: fe.company,
                    function: fe.function,
                    //   id: sm.id || null,
                  };
                }
              ) || [],
            //   courses: dataGet.person?.courses || [],
            //   courses: dataGet.person?.courses ? courses : [],
            //   courses: dataGet.person?.courses ? coursesNEW : [],
            //   courses: dataGet.person?.courses,
            courses: dataGet.person.courses.map((courseFromDb: Course) =>
              dataCourses.courses.find((t: Course) => t.id === courseFromDb.id)
            ),
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
                    //   personId: Number(id),
                    fieldExperiences: values.fieldExperiences,
                    socialMedias: values.socialMedias,
                  },
                  // fieldExperiences: values.fieldExperiences,
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                              values.fieldExperiences.map((tag, index) => (
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
                                      onClick={() => arrayHelpers.remove(index)}
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
                              ))
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
                              values.socialMedias.map((tag, index) => (
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
                                      // name="platform"
                                      fullWidth
                                      value={
                                        values.socialMedias[index].platform
                                      }
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
                                  <Grid item xs={12} md={3} lg={2}>
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
                                      <Add />
                                    </Button>
                                  </Grid>
                                </Grid>
                              ))
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
            </Form>
          )}
        </Formik>
      )}
    </BasicContainer>
  );
}
