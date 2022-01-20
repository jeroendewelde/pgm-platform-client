import { GET_ALL_COURSES } from "../../graphql/attachments";
import { DELETE_COURSE } from "../../graphql/courses";
import {
  DELETE_LEARNING_LINE,
  GET_ALL_LEARNING_LINES,
} from "../../graphql/learningLines";
import {
  DELETE_SPECIALISATION,
  GET_ALL_SPECIALISATIONS,
} from "../../graphql/specialisations";

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
    },
    {
      field: "name",
      headerName: "name",
    },
    // {
    //   field: 'teaserImage',
    //   headerName: 'teaserImage',
    // }
  ],
  courses: [
    {
      field: "id",
      headerName: "id",
    },
    {
      field: "name",
      headerName: "naam",
    },
    {
      field: "description",
      headerName: "beschrijving",
    },
    {
      field: "term",
      headerName: "periode",
    },
    {
      field: "academicYear",
      headerName: "academiejaar",
    },
    {
      field: "learningLineId",
      headerName: "leerlijn ID",
    },
    // {
    //   field: 'learningLine["name"]',
    //   headerName: 'leerlijn'
    // },
    {
      field: "specialisationId",
      headerName: "specialisatie ID",
    },
  ],
  learningLines: [
    {
      field: "id",
      headerName: "id",
    },
    {
      field: "name",
      headerName: "naam",
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
    },
    {
      field: "name",
      headerName: "naam",
    },
    {
      field: "teaserText",
      headerName: "teaser",
    },
    {
      field: "body",
      headerName: "body",
    },
    {
      field: "academicYear",
      headerName: "academiejaar",
    },
    {
      field: "courseId",
      headerName: "vak id",
    },
  ],
  students: [
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
      field: "academicYear",
      headerName: "academiejaar",
    },
    // {
    //   field: "type",
    //   headerName: "type",
    // },
    // {
    //   field: "generationId",
    //   headerName: "generation ID",
    // },
  ],
  teachers: [
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
    // {
    //   field: "type",
    //   headerName: "type",
    // },
  ],
  testimonials: [
    {
      field: "id",
      headerName: "id",
    },
    {
      field: "quote",
      headerName: "quote",
    },
    {
      field: "name",
      headerName: "auteur",
    },
    {
      field: "company",
      headerName: "bedrijf",
    },
  ],
  specialisations: [
    {
      field: "id",
      headerName: "id",
    },
    {
      field: "name",
      headerName: "naam",
    },
    {
      field: "academicYear",
      headerName: "academiejaren",
    },
  ],
};

let deleteQueries: { [key: string]: any } = {
  specialisations: DELETE_SPECIALISATION,
  courses: DELETE_COURSE,
};

deleteQueries["learning-lines"] = DELETE_LEARNING_LINE;

let fetchQueries: { [key: string]: any } = {
  specialisations: GET_ALL_SPECIALISATIONS,
  courses: GET_ALL_COURSES,
};
fetchQueries["learning-lines"] = GET_ALL_LEARNING_LINES;
export { colors, deleteQueries, fetchQueries, tableColumns };
