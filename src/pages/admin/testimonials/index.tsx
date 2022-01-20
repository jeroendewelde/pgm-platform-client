import React, { ReactElement } from "react";

// Query
import { useQuery } from "@apollo/client";
import {
  DELETE_TESTIMONIAL,
  GET_ALL_TESTIMONIALS,
} from "../../../../graphql/testimonials";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";
import DataGridContent from "../../../components/Admin/DataGridContent";
import CustomLoading from "../../../components/Admin/style/CustomLoading";
import NavigationButton from "../../../components/Admin/NavigationButton";

// Variabels
import { tableColumns } from "../../../utils/constants";

export default function TestimonialsPage(): ReactElement {
  const { data, error, loading } = useQuery(GET_ALL_TESTIMONIALS, {
    ssr: true,
  });

  return (
    <BasicContainer title="Testimonials">
      <Dashboard title="Testimonials">
        {loading ? (
          <CustomLoading />
        ) : (
          <>
            <NavigationButton title="nieuwe testimonial" />
            <DataGridContent
              data={data.testimonials}
              info={tableColumns.testimonials}
              deleteQuery={DELETE_TESTIMONIAL}
              fetchAllQuery={GET_ALL_TESTIMONIALS}
            />
          </>
        )}
      </Dashboard>
    </BasicContainer>
  );
}
