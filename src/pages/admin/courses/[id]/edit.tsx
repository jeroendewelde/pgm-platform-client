import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Formik & Yup
import * as yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";

// Material UI Components
import { Button, Grid, Paper, Typography } from "@mui/material";
import { TextField } from "formik-mui";
import { Remove, Add } from "@material-ui/icons";
import LandscapeIcon from "@mui/icons-material/Landscape";

// Queries
import { GET_ALL_SPECIALISATIONS } from "../../../../../graphql/specialisations";
import {
  DELETE_COURSE,
  GET_COURSE_BY_ID,
  UPDATE_COURSE,
} from "../../../../../graphql/courses";
import { GET_ALL_LEARNING_LINES } from "../../../../../graphql/learningLines";
import { GET_ALL_TEACHERS } from "../../../../../graphql/persons";
import { useMutation, useQuery } from "@apollo/client";
import { Person } from "../../../../../interfaces";

// Custom Components
import BasicContainer from "../../../../components/Admin/style/BasicContainer";
import CustomLoading from "../../../../components/Admin/style/CustomLoading";
import CustomSingleSelect from "../../../../components/Admin/Form/CustomSingleSelect";
import CustomMultiSelectWithChips from "../../../../components/Admin/Form/CustomMultiSelectWithChips";

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
});

export default function EditCoursePage(): ReactElement {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<string>();
  const [uploadData, setUploadData] = useState<File>();
  const { id } = router.query;

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

  const {
    data: dataTeachers,
    error: errorTeachers,
    loading: loadingTeachers,
  } = useQuery(GET_ALL_TEACHERS, {
    ssr: true,
  });

  const [
    updateCourse,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_COURSE, {
    notifyOnNetworkStatusChange: true,
  });

  const [
    deleteCourse,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_COURSE, {
    notifyOnNetworkStatusChange: true,
  });

  const handleDelete = () => {
    deleteCourse({
      variables: {
        id: Number(id),
      },
      notifyOnNetworkStatusChange: true,
    });
    if (!errorDelete && !loadingDelete) {
      window.location.href = "/admin/courses";
    }
  };

  const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target?.files.length > 0) {
      const file = e.target.files[0];
      setUploadData(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (dataGet?.course?.teaserImage) {
      setImageSrc(dataGet.course.teaserImage);
    }
  }, [dataGet]);

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
    <BasicContainer title="Bewerk Vak">
      {loadingGet ||
      loadingSpecialisations ||
      loadingLearningLines ||
      loadingTeachers ? (
        <CustomLoading />
      ) : (
        <Formik
          initialValues={{
            name: dataGet?.course.name || "",
            description: dataGet?.course.description || "",
            term: dataGet?.course.term || "",
            academicYear: dataGet?.course.academicYear || "",
            tags: dataGet?.course.tags || [],
            learningLineId: dataGet?.course.learningLineId || "",
            specialisationId: dataGet?.course.specialisationId || "",
            teachers: dataGet?.course.teachers || [],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            console.log(dataGet.course);

            let imageUpload;

            if (imageSrc && imageSrc.split("http").length <= 1) {
              imageUpload = await handleUpload();
              console.log("lokale image", imageUpload);
            } else {
              imageUpload = uploadData ? await handleUpload() : null;
              console.log("externe image", imageUpload);
            }

            updateCourse({
              variables: {
                input: {
                  name: values.name,
                  description: values.description,
                  term: values.term,
                  academicYear: values.academicYear,
                  teaserImage: imageUpload ? imageUpload.imagePath : null,
                  tags: values.tags,
                  learningLineId: values.learningLineId,
                  specialisationId: values.specialisationId,
                  teacherIds: values.teachers.map(
                    (teacher: Person) => teacher.id
                  ),
                },
                id: Number(id),
              },
            });
            if (!errorUpdate && !loadingUpdate) {
              setSubmitting(false);
              window.location.href = "/admin/courses";
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
                <Grid item xs={12} md={7} lg={8} xl={9}>
                  <Field
                    required
                    component={TextField}
                    name="name"
                    type="text"
                    label="Naam"
                    helperText="Naam van het vak"
                    fullWidth
                    multiline
                    maxRows={2}
                  />
                </Grid>
                <Grid item xs={6} md={3} lg={2} xl={2}>
                  <Field
                    required
                    component={TextField}
                    name="academicYear"
                    type="text"
                    label="Academiejaar"
                    helperText="in formaat 2019-2020"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} md={2} lg={2} xl={1}>
                  <Field
                    required
                    component={TextField}
                    name="term"
                    type="number"
                    label="Periode"
                    helperText=" "
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    component={TextField}
                    name="description"
                    type="text"
                    label="Beschrijving"
                    helperText="Beschrijving van het vak"
                    fullWidth
                    multiline
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper
                      sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#E5E5E5",
                        overflow: "hidden",
                      }}
                      style={{
                        aspectRatio: "16 / 9",
                        position: "relative",
                      }}
                    >
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt="teaser image vak"
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
                        style={{ display: "none" }}
                      />
                      <Button
                        variant="outlined"
                        component="span"
                        color={imageSrc ? "warning" : "primary"}
                      >
                        {imageSrc
                          ? "Teaser Image aanpassen"
                          : "Teaser Image toevoegen"}
                      </Button>
                    </label>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    required
                    component={CustomSingleSelect}
                    name="learningLineId"
                    label="Leerlijn"
                    helperText="Naam van de Leerlijn"
                    fullWidth
                    data={dataLearningLines.learningLines}
                    value={values.learningLineId}
                    labelProps={["name"]}
                    sx={{
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    required
                    component={CustomSingleSelect}
                    name="specialisationId"
                    label="Afstudeerrichting"
                    helperText="Naam van de Afstudeerrichting"
                    data={dataSpecialisations.specialisations}
                    value={values.specialisationId}
                    labelProps={["name", "academicYear"]}
                    sx={{
                      width: "100%",
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h2" component="h2">
                    Docenten
                  </Typography>
                  <Typography variant="subtitle1">
                    De docenten die dit vak in deze periode geven, dit kan nog
                    aangepast worden
                  </Typography>

                  <Field
                    required
                    component={CustomMultiSelectWithChips}
                    name="teachers"
                    label="Docenten"
                    placeholder="Zoek een docent..."
                    data={dataTeachers.teachers}
                    labelProps={["firstName", "lastName"]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h2" component="h2">
                    Optionele Tags
                  </Typography>
                  <Typography variant="subtitle1">
                    De tags kunnen talen/technologieën, vaardigheden of andere
                    belangrijke elementen zijn. Plaats de 5 meest belangrijkste
                    bovenaan.
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <FieldArray
                    name="tags"
                    render={(arrayHelpers) => (
                      <div>
                        {values.tags && values.tags.length > 0 ? (
                          values.tags.map((tag: string, index: number) => (
                            <div
                              key={index}
                              style={{
                                marginBottom: "1rem",
                              }}
                            >
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
                                  arrayHelpers.insert(index + 1, "")
                                }
                              >
                                <Add />
                              </Button>
                            </div>
                          ))
                        ) : (
                          <Button
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
                </Grid>

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
