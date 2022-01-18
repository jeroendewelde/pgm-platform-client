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

  const {
    data: dataGetFieldExperiences,
    error: errorGetFieldExperiences,
    loading: loadingGetFieldExperiences,
  } = useQuery(GET_FIELD_EXPERIENCES_BY_PERSON_ID, {
    variables: {
      id: Number(id),
    },
    ssr: true,
  });

  useEffect(() => {
    if (dataGet) {
      setTeacher(dataGet.person);
      if (dataGet?.person.personInformation) {
        console.log("extra info");
        // setTeacherInfo(dataGetPersonInformation.personInformation);
        // setShowExtraInfo(!showExtraInfo);
        handleChangeSwitchExtraInfo();
      } else {
        console.log("geen extra info");
      }

      //   console.log(dataGet.person);
    }
    //   }, [dataGet, dataGetPersonInformation]);
  }, [dataGet]);

  const [
    updateTeacher,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_PERSON, {
    notifyOnNetworkStatusChange: true,
  });

  const [deletePerson, { data, loading, error }] = useMutation(DELETE_PERSON);

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
      <Dashboard title="Bewerk Docent">
        <Box
          sx={{
            maxWidth: "lg",
          }}
        >
          {/* {!teacher && !teacherInfo ? ( */}
          {loadingGet || loadingCourses ? (
            <CustomLoading />
          ) : (
            <>
              {console.log("data info....", teacherInfo)}
              <Formik
                initialValues={{
                  firstName: dataGet.person.firstName || "",
                  lastName: dataGet.person.lastName || "",
                  dob: dataGet.person?.personInformation?.dob || "",
                  quote: dataGet.person?.personInformation?.quote || "",
                  bio: dataGet.person?.personInformation?.bio || "",

                  // dob: "",
                  // quote: "",
                  // bio: "",
                  fieldExperiences: [],
                  socialMedias: [],
                  courses: [],
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
                        courseIds: values.courses.map(
                          (course: Course) => course.id
                        ),
                        dob: values.dob,
                        quote: values.quote,
                        bio: values.bio,
                        // fieldExperiences: values.fieldExperiences,
                      },
                      id: dataGet.person.id,
                    },
                  })
                    // .then((res) => {
                    //   // Add person information with person Id if it is toggled
                    //   if (showExtraInfo) {
                    //     addTeacherInformation({
                    //       variables: {
                    //         input: {
                    //           personId: res.data.createPerson.id,
                    //           quote: values.quote,
                    //           bio: values.bio,
                    //           dob: values.dob,
                    //         },
                    //       },
                    //     }).then((res2) => {
                    //       if (values.fieldExperiences.length > 0) {
                    //         values.fieldExperiences.forEach(
                    //           (fieldExperience: FieldExperience) => {
                    //             addFieldExperience({
                    //               variables: {
                    //                 input: {
                    //                   personId:
                    //                     res2.data.createPersonInformation.id,
                    //                   company: fieldExperience.company,
                    //                   function: fieldExperience.function,
                    //                 },
                    //               },
                    //             });
                    //           }
                    //         );
                    //       }

                    //       if (values.socialMedias.length > 0) {
                    //         values.socialMedias.forEach(
                    //           (socialMedia: SocialMedia) => {
                    //             addSocialMedia({
                    //               variables: {
                    //                 input: {
                    //                   personId:
                    //                     res2.data.createPersonInformation.id,
                    //                   platform: socialMedia.platform,
                    //                   url: socialMedia.url,
                    //                 },
                    //               },
                    //             });
                    //           }
                    //         );
                    //       }
                    //     });
                    //   }
                    // })
                    .then(() => {
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
                        name="firstName"
                        type="text"
                        label="Voornaam"
                        helperText=""
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
                        name="lastName"
                        type="text"
                        label="Familienaam"
                        helperText=""
                        sx={{
                          width: "75%",
                          // maxWidth: 'lg'
                        }}
                      />
                    </Box>

                    <FormControlLabel
                      control={
                        <Switch
                          {...labelSwitch}
                          checked={showExtraInfo}
                          onChange={handleChangeSwitchExtraInfo}
                        />
                      }
                      label="Extra informatie toevoegen"
                      sx={{
                        color: "black",
                        ml: 1,
                      }}
                    />
                    {showExtraInfo && (
                      <>
                        <Box margin={1}>
                          <Field
                            component={TextField}
                            name="quote"
                            type="text"
                            label="Quote"
                            helperText="Quote over het leven of over de docent"
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
                            component={TextField}
                            name="bio"
                            type="text"
                            label="Bio"
                            helperText="Kleine biografie over de docent"
                            multiline
                            sx={{
                              width: "100%",
                              // maxWidth: 'lg'
                            }}
                          />
                        </Box>
                        <Box margin={1}>
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
                        </Box>
                        <Box margin={1}>
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
                                            arrayHelpers.insert(index, "")
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
                                    onClick={() => arrayHelpers.push("")}
                                  >
                                    Werk-ervaring toevoegen
                                  </Button>
                                )}
                              </div>
                            )}
                          />
                        </Box>
                        <Box margin={1}>
                          <FieldArray
                            name="socialMedias"
                            render={(arrayHelpers2) => (
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
                                      <Box margin={1}>
                                        <Field
                                          component={TextField}
                                          name={`socialMedias.${index}.url`}
                                          type="text"
                                          label="url"
                                          helpText=""
                                        />

                                        <Field
                                          required
                                          component={CustomSingleSelectForEnum}
                                          label="Platform"
                                          // name="platform"
                                          name={`socialMedias.${index}.platform`}
                                          data={
                                            dataSocialMediaPlatforms.__type
                                              .enumValues
                                          }
                                          sx={{
                                            width: "50%",
                                          }}
                                          helperText="Optioneel platform"
                                        />

                                        <Button
                                          sx={{ margin: 1 }}
                                          variant="outlined"
                                          disabled={isSubmitting}
                                          onClick={() =>
                                            arrayHelpers2.remove(index)
                                          }
                                        >
                                          <Remove />
                                        </Button>

                                        <Button
                                          sx={{ margin: 1 }}
                                          variant="outlined"
                                          disabled={isSubmitting}
                                          onClick={() =>
                                            arrayHelpers2.insert(index, "")
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
                                    onClick={() => arrayHelpers2.push("")}
                                  >
                                    Social Media Toevoegen
                                  </Button>
                                )}
                              </div>
                            )}
                          />
                        </Box>
                      </>
                    )}
                    <Box margin={1}>
                      <Field
                        required
                        component={TextField}
                        name="academicYear"
                        type="text"
                        label="Academiejaren"
                        helperText="Academiejaren in formaat 2019-2021"
                        // value={
                        //   values.name
                        //     ? values.academicYear
                        //     : specialisation?.academicYear
                        // }
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
            </>
          )}
        </Box>
      </Dashboard>
    </BasicContainer>
  );
}
