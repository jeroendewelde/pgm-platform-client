const colors = {
  primary: '#7e57c5',
  orange: '#f58732',
  blue: '#00a5d9',
  purple: '#7e57c5',
  red: '#ed0034',
  green: '#5ab946',
  pink: '#d20082',
  pastelOrange: '#fac38c',
  pastelBlue: '#a5cdd7',
  pastelGreen: '#bed2b9',
  pastelRed: '#dc6455',
  pastelPink: '#e6a5aa',
  pastelPurple: '#b9b4c3',
  pastelRust: '#e18c5a',
  pastelYellow: '#ebc37d'
}

const tableColumns = {
  courses : [
    {
      dataName: 'id',
      colName: 'id'
    },
    {
      dataName: 'name',
      colName: 'naam'
    },
    {
      dataName: 'description',
      colName: 'beschrijving'
    },
    {
      dataName: 'term',
      colName: 'periode'
    },
    {
      dataName: 'academicYear',
      colName: 'academiejaar'
    },
    {
      dataName: 'learlingLineId',
      colName: 'leerlijn ID'
    },
    {
      dataName: 'specialisationId',
      colName: 'specialisatie ID'
    },
  ],
  learlingLines: [
    {
      dataName: 'id',
      colName: 'id'
    },
    {
      dataName: 'name',
      colName: 'naam'
    },
    {
      dataName: 'color',
      colName: 'kleur'
    },
    // {
    //   dataName: 'delete',
    //   colName: 'wis'
    // },
  ],
}

export {
  colors,
  tableColumns
}