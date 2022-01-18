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
import { FieldExperience, SocialMedia } from "../../../../interfaces";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";
import CustomDatePicker from "../../../components/Admin/Form/CustomDatePicker";
import CustomSingleSelectForEnum from "../../../components/Admin/Form/CustomSingleSelectForEnum";
import CustomLoading from "../../../components/Admin/style/CustomLoading";

const validationSchema = yup.object({
  firstName: yup.string().required("Voornaam is verplicht"),
  lastName: yup.string().required("Familienaam is verplicht"),
});

export default function createLearningLine(): ReactElement {
  const [
    addTeacher,
    { data: dataTeacher, loading: loadingTeacher, error: errorTeacher },
  ] = useMutation(CREATE_PERSON);
  const [
    addTeacherInformation,
    {
      data: dataTeacherInformation,
      loading: loadingTeacherInformation,
      error: errorTeacherInformation,
    },
  ] = useMutation(CREATE_PERSON_INFORMATION);
  const [
    addFieldExperience,
    {
      data: dataFieldExperience,
      loading: loadingFieldExperience,
      error: errorFieldExperience,
    },
  ] = useMutation(CREATE_FIELD_EXPERIENCE);
  const [
    addSocialMedia,
    {
      data: dataSocialMedia,
      loading: loadingSocialMedia,
      error: errorSocialMedia,
    },
  ] = useMutation(CREATE_SOCIAL_MEDIA);

  const {
    data: dataSocialMediaPlatforms,
    error: errorSocialMediaPlatforms,
    loading: loadingSocialMediaPlatforms,
  } = useQuery(GET_ALL_SOCIAL_MEDIA_PLATFORMS, {
    ssr: true,
  });

  const [showExtraInfo, setShowExtraInfo] = useState(false);

  const labelSwitch = {
    inputProps: { "aria-label": "Extra informatie toevoegen" },
  };

  const handleChangeSwitch = () => {
    setShowExtraInfo(!showExtraInfo);
  };

  return (
    <BasicContainer title="Nieuwe Docent">
      <Dashboard title="Nieuwe Docent">
        {loadingSocialMediaPlatforms ? (
          <CustomLoading />
        ) : (
          <>
            <Box
              sx={{
                maxWidth: "lg",
              }}
            >
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  dob: "",
                  quote: "",
                  bio: "",
                  fieldExperiences: [],
                  socialMedias: [],
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
                        // dob: values.dob,
                        // quote: values.quote,
                        // bio: values.bio,
                        // fieldExperiences: values.fieldExperiences,
                      },
                    },
                  })
                    .then((res) => {
                      // Add person information with person Id if it is toggled
                      if (showExtraInfo) {
                        addTeacherInformation({
                          variables: {
                            input: {
                              personId: res.data.createPerson.id,
                              quote: values.quote,
                              bio: values.bio,
                              dob: values.dob,
                            },
                          },
                        }).then((res2) => {
                          if (values.fieldExperiences.length > 0) {
                            values.fieldExperiences.forEach(
                              (fieldExperience: FieldExperience) => {
                                addFieldExperience({
                                  variables: {
                                    input: {
                                      personId:
                                        res2.data.createPersonInformation.id,
                                      company: fieldExperience.company,
                                      function: fieldExperience.function,
                                    },
                                  },
                                });
                              }
                            );
                          }

                          if (values.socialMedias.length > 0) {
                            values.socialMedias.forEach(
                              (socialMedia: SocialMedia) => {
                                addSocialMedia({
                                  variables: {
                                    input: {
                                      personId:
                                        res2.data.createPersonInformation.id,
                                      platform: socialMedia.platform,
                                      url: socialMedia.url,
                                    },
                                  },
                                });
                              }
                            );
                          }
                        });
                      }
                    })
                    .then(() => {
                      window.location.href =
                        Router.pathname.split("/create")[0];
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
                          onChange={handleChangeSwitch}
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
            </Box>
          </>
          //   )}
        )}
      </Dashboard>
    </BasicContainer>
  );
}
