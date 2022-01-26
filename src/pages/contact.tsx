import Head from "next/head";
import React from "react";
import { Campus, ContactInfo, MapBox } from "../components/Contact";

const contact = () => {
  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <MapBox />
      <ContactInfo />
      <Campus />
    </>
  );
};

export default contact;
