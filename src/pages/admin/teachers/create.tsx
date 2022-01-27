import React, { ChangeEvent, ReactElement, useState } from "react";
import Image from "next/image";

// Formik & Yup
import * as yup from "yup";
import { Field, Form, Formik, FieldArray } from "formik";

// Material UI Components
import {
  Button,
  Typography,
  Switch,
  FormControlLabel,
  Grid,
  Paper,
} from "@mui/material";
import { TextField } from "formik-mui";
import { Remove, Add } from "@material-ui/icons";
import LandscapeIcon from "@mui/icons-material/Landscape";

// Queries
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_SOCIAL_MEDIA_PLATFORMS } from "../../../../graphql/enums";
import { GET_ALL_COURSES } from "../../../../graphql/courses";
import { CREATE_PERSON } from "../../../../graphql/persons";
import { Course, FieldExperience, SocialMedia } from "../../../../interfaces";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import CustomDatePicker from "../../../components/Admin/Form/CustomDatePicker";
import CustomSingleSelectForEnum from "../../../components/Admin/Form/CustomSingleSelectForEnum";
import CustomLoading from "../../../components/Admin/style/CustomLoading";
import CustomMultiSelectWithChips from "../../../components/Admin/Form/CustomMultiSelectWithChips";

const validationSchema = yup.object({
  firstName: yup.string().required("Voornaam is verplicht"),
  lastName: yup.string().required("Familienaam is verplicht"),
  quote: yup.string(),
  bio: yup.string(),
});

export default function CreateTeacherPage(): ReactElement {
  const [showExtraInfo, setShowExtraInfo] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>();
  const [uploadData, setUploadData] = useState<File>();
  const [addTeacher, { data, loading, error }] = useMutation(CREATE_PERSON, {
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: dataCourses,
    error: errorCourses,
    loading: loadingCourses,
  } = useQuery(GET_ALL_COURSES, {
    ssr: true,
  });

  const {
    data: dataSocialMediaPlatforms,
    error: errorSocialMediaPlatforms,
    loading: loadingSocialMediaPlatforms,
  } = useQuery(GET_ALL_SOCIAL_MEDIA_PLATFORMS, {
    ssr: true,
  });

  const labelSwitch = {
    inputProps: { "aria-label": "Extra informatie toevoegen" },
  };

  const handleChangeSwitchExtraInfo = () => {
    setShowExtraInfo(!showExtraInfo);
  };

  const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target?.files.length > 0) {
      const file = e.target.files[0];
      setUploadData(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    const formData: any = new FormData();
    try {
      formData.append("file", uploadData);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}photos/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BasicContainer title="Nieuwe Docent">
      {loadingCourses ? (
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
            socialMedias: [] as SocialMedia[],
            courses: [],
            avatarUrl: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            const imageUpload = uploadData ? await handleUpload() : null;

            addTeacher({
              variables: {
                input: {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  type: "TEACHER",
                  avatarUrl: imageUpload && imageUpload.imagePath,
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
            if (!error && !loading) {
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
                      <Grid item xs={8}>
                        <Paper
                          sx={{
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#E5E5E5",
                            overflow: "hidden",
                            maxWidth: 240,
                          }}
                          style={{
                            aspectRatio: "3 / 4",
                            position: "relative",
                          }}
                        >
                          {imageSrc ? (
                            <Image
                              src={imageSrc}
                              alt="avatar docent"
                              layout="fill"
                              objectFit="cover"
                            />
                          ) : (
                            <LandscapeIcon
                              sx={{
                                color: "#FFF",
                                fontSize: 64,
                              }}
                            />
                          )}
                        </Paper>
                        <label htmlFor="contained-button-file">
                          <input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleOnChangeImage}
                            style={{
                              display: "none",
                            }}
                          />
                          <Button
                            variant="outlined"
                            component="span"
                            color={imageSrc ? "warning" : "primary"}
                          >
                            {imageSrc
                              ? "Avatar Image aanpassen"
                              : "Avatar Image toevoegen"}
                          </Button>
                        </label>
                      </Grid>
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
                                      onClick={() => arrayHelpers.remove(index)}
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

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Maak aan
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
