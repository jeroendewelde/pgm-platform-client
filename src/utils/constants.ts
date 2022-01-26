import { GridRenderCellParams } from "@mui/x-data-grid";
import { DELETE_COURSE } from "../../graphql/courses";
import {
  DELETE_LEARNING_LINE,
  GET_ALL_LEARNING_LINES,
} from "../../graphql/learningLines";
import {
  DELETE_SPECIALISATION,
  GET_ALL_SPECIALISATIONS,
} from "../../graphql/specialisations";
import { Course, LearningLine, Specialisation } from "../../interfaces";

const colors = {
  primary: "#7e57c5",
  orange: "#f58732",
  blue: "#00a5d9",
  purple: "#7e57c5",
  red: "#ed0034",
  green: "#5ab946",
  pink: "#d20082",
  pastelOrange: "#fac38c",
  pastelBlue: "#a5cdd7",
  pastelGreen: "#bed2b9",
  pastelRed: "#dc6455",
  pastelPink: "#e6a5aa",
  pastelPurple: "#b9b4c3",
  pastelRust: "#e18c5a",
  pastelYellow: "#ebc37d",
  edit: "#FAA628",
  delete: "#ED4245",
  edit_bg: "#FCD293",
  delete_bg: "#F6A0A1",
  white: "#FFF",
};

const tableColumns = {
  companies: [
    {
      field: "id",
      headerName: "id",
      width: 20,
    },
    {
      field: "name",
      headerName: "name",
      width: 300,
    },
  ],
  courses: [
    {
      field: "id",
      headerName: "id",
      width: 20,
    },
    {
      field: "name",
      headerName: "naam",
      width: 300,
    },
    {
      field: "term",
      headerName: "periode",
      width: 100,
    },
    {
      field: "academicYear",
      headerName: "academiejaar",
      width: 150,
    },
    {
      field: "learningLine",
      headerName: "leerlijn",
      renderCell: (params: GridRenderCellParams<LearningLine>) =>
        params.value.name,
      width: 200,
    },
    {
      field: "description",
      headerName: "beschrijving",
      width: 200,
    },
    {
      field: "specialisation",
      headerName: "afstudeerrichting",
      renderCell: (params: GridRenderCellParams<Specialisation>) =>
        params.value?.name,
      width: 300,
    },
  ],
  learningLines: [
    {
      field: "id",
      headerName: "id",
      width: 20,
    },
    {
      field: "name",
      headerName: "naam",
      width: 300,
    },
    {
      field: "color",
      headerName: "kleur",
    },
  ],
  persons: [
    {
      field: "id",
      headerName: "id",
    },
    {
      field: "firstName",
      headerName: "voornaam",
    },
    {
      field: "lastName",
      headerName: "familienaam",
    },
    {
      field: "type",
      headerName: "type",
    },
  ],
  projects: [
    {
      field: "id",
      headerName: "id",
      width: 20,
    },
    {
      field: "name",
      headerName: "naam",
      width: 300,
    },
    {
      field: "teaserText",
      headerName: "teaser",
      width: 200,
    },
    {
      field: "academicYear",
      headerName: "academiejaar",
      width: 150,
    },
    {
      field: "course",
      headerName: "vak",
      renderCell: (params: GridRenderCellParams<Course>) => params.value.name,
      width: 200,
    },
  ],
  specialisations: [
    {
      field: "id",
      headerName: "id",
      width: 20,
    },
    {
      field: "name",
      headerName: "naam",
      width: 300,
    },
    {
      field: "academicYear",
      headerName: "academiejaren",
      width: 150,
    },
  ],
  students: [
    {
      field: "id",
      headerName: "id",
      width: 20,
    },
    {
      field: "firstName",
      headerName: "voornaam",
      width: 200,
    },
    {
      field: "lastName",
      headerName: "familienaam",
      width: 200,
    },
    {
      field: "academicYear",
      headerName: "academiejaar",
      width: 150,
    },
  ],
  teachers: [
    {
      field: "id",
      headerName: "id",
    },
    {
      field: "firstName",
      headerName: "voornaam",
      width: 200,
    },
    {
      field: "lastName",
      headerName: "familienaam",
      width: 200,
    },
  ],
  testimonials: [
    {
      field: "id",
      headerName: "id",
      width: 20,
    },
    {
      field: "quote",
      headerName: "quote",
      width: 200,
    },
    {
      field: "name",
      headerName: "auteur",
      width: 200,
    },
    {
      field: "company",
      headerName: "bedrijf",
      width: 200,
    },
  ],
};

// let deleteQueries: { [key: string]: any } = {
//   specialisations: DELETE_SPECIALISATION,
//   courses: DELETE_COURSE,
// };

// deleteQueries["learning-lines"] = DELETE_LEARNING_LINE;

// let fetchQueries: { [key: string]: any } = {
//   specialisations: GET_ALL_SPECIALISATIONS,
//   courses: GET_ALL_COURSES,
// };
// fetchQueries["learning-lines"] = GET_ALL_LEARNING_LINES;
// export { colors, deleteQueries, fetchQueries, tableColumns };
export { colors, tableColumns };
