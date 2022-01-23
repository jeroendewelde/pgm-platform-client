import React, { ReactElement } from "react";
import styled from "styled-components";
import Dashboard from "../Dashboard";
import PageTitle from "./PageTitle";

interface BasicContainerProps {
  children: ReactElement;
  title: string;
  alsoTitle?: boolean;
}

export default function BasicContainer({
  title,
  children,
  alsoTitle = true,
}: BasicContainerProps): ReactElement {
  return (
    <>
      <PageTitle title={title} />
      <Dashboard title={alsoTitle ? title : null}>{children}</Dashboard>
    </>
  );
}
