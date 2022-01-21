import React, { ReactElement } from "react";
import styled from "styled-components";
import PageTitle from "./PageTitle";

interface BasicContainerProps {
  children: ReactElement;
  title: string;
}

export default function BasicContainer({
  title,
  children,
}: BasicContainerProps): ReactElement {
  return (
    <>
      <PageTitle title={title} />
      <Container>{children}</Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #fff;
  flex-direction: "column";
  justify-content: "center";
  align-items: "center";
  min-height: 100vh;
`;
