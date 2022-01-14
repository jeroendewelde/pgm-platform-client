import React, { useEffect, useState } from "react";
import styled from "styled-components";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const Map = styled.div`
  top: 4rem;
  left: 0;
  width: 100%;
  position: absolute;
  height: 50vh;

  @media (min-width: ${(props) => props.theme.width.small}) {
    height: 80vh;
  }

  .marker-popup {
    p {
      color: ${(props) => props.theme.colors.black};
      font-family: ${(props) => props.theme.fontFamilies.primary};
      font-size: ${(props) => props.theme.fontSizes.normal};
      margin: 0;
    }
  }
`;

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapBox = () => {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const center = [3.6681126, 51.0871784];

  useEffect(() => {
    setPageIsMounted(true);
    const map = new mapboxgl.Map({
      container: "my-map",
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: center,
      pitch: 50,
      zoom: 16,
    });

    const popUp = new mapboxgl.Popup({
      className: "marker-popup",
      closeButton: false,
    })
      .setHTML("<p>Industrieweg 232,</p><p>9030 Gent</p>")
      .setMaxWidth("300px");

    const marker = new mapboxgl.Marker({ color: "#ED0034" })
      .setLngLat(center)
      .setPopup(popUp)
      .addTo(map);

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "bottom-left");

    map.scrollZoom.disable();
  }, []);
  return <Map id="my-map" />;
};

export default MapBox;
