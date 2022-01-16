import { DocumentNode, useMutation, useQuery } from "@apollo/client";

export default function deleteRecord(
  //   tableName: string,
  id: number,
  //   deleteQueries: { [key: string]: any },
  //   fetchQueries: { [key: string]: any }
  deleteQuery: DocumentNode,
  fetchQuery: DocumentNode
) {
  const [deleteRecord, { data, loading, error }] = useMutation(deleteQuery);

  deleteRecord({
    variables: {
      id: id,
    },
    refetchQueries: [
      {
        query: fetchQuery,
      },
    ],
  });
}
