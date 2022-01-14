import { DELETE_LEARNING_LINE } from "../../graphql/learningLines";
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
      dataName: "id",
      colName: "id",
    },
    {
      dataName: "name",
      colName: "name",
    },
    // {
    //   dataName: 'teaserImage',
    //   colName: 'teaserImage',
    // }
  ],
  courses: [
    {
      dataName: "id",
      colName: "id",
    },
    {
      dataName: "name",
      colName: "naam",
    },
    {
      dataName: "description",
      colName: "beschrijving",
    },
    {
      dataName: "term",
      colName: "periode",
    },
    {
      dataName: "academicYear",
      colName: "academiejaar",
    },
    {
      dataName: "learningLineId",
      colName: "leerlijn ID",
    },
    // {
    //   dataName: 'learningLine["name"]',
    //   colName: 'leerlijn'
    // },
    {
      dataName: "specialisationId",
      colName: "specialisatie ID",
    },
  ],
  learningLines: [
    {
      dataName: "id",
      colName: "id",
    },
    {
      dataName: "name",
      colName: "naam",
    },
    {
      dataName: "color",
      colName: "kleur",
    },
  ],
  persons: [
    {
      dataName: "id",
      colName: "id",
    },
    {
      dataName: "firstName",
      colName: "voornaam",
    },
    {
      dataName: "lastName",
      colName: "familienaam",
    },
    {
      dataName: "type",
      colName: "type",
    },
  ],
  students: [
    {
      dataName: "id",
      colName: "id",
    },
    {
      dataName: "firstName",
      colName: "voornaam",
    },
    {
      dataName: "lastName",
      colName: "familienaam",
    },
    {
      dataName: "type",
      colName: "type",
    },
    {
      dataName: "generationId",
      colName: "generation ID",
    },
  ],
  teachers: [
    {
      dataName: "id",
      colName: "id",
    },
    {
      dataName: "firstName",
      colName: "voornaam",
    },
    {
      dataName: "lastName",
      colName: "familienaam",
    },
    {
      dataName: "type",
      colName: "type",
    },
  ],
  specialisations: [
    {
      dataName: "id",
      colName: "id",
    },
    {
      dataName: "name",
      colName: "naam",
    },
    {
      dataName: "academicYear",
      colName: "academiejaren",
    },
  ],
};

let deleteQueries: { [key: string]: any } = {
  specialisations: DELETE_SPECIALISATION,
};

deleteQueries["learning-lines"] = DELETE_LEARNING_LINE;

let fetchQueries: { [key: string]: any } = {
  specialisations: GET_ALL_SPECIALISATIONS,
};
export { colors, deleteQueries, fetchQueries, tableColumns };
