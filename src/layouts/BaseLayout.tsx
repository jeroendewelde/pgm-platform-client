import React from "react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default BaseLayout;
