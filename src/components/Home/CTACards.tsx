import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import useInViewObserver from "../../hooks/useInView";
import Card from "./Card";

const CTACardsStyle = styled(motion.div)`
  margin-top: 5rem;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin-top: 10rem;
  }

  .cards-list {
    width: 100%;

    @media (min-width: ${(props) => props.theme.width.small}) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      flex-wrap: wrap;
    }
  }
`;

const CTACards = () => {
  const { ref, inView } = useInView();
  const animation = useInViewObserver(inView);

  const data = [
    {
      id: 1,
      title: "Opleidingsprogramma",
      text: "Ontdek hier het studieprogramma voor academiejaar 2022-2023",
      url: "https://www.pgm.gent/info/",
    },
    {
      id: 2,
      title: "Opleidingsbrochure",
      text: "Ontvang je opleidingsbrochure via mail - Academiejaar 2022-2023",
      url: "https://forms.summit.nl/Artevelde/BrochureAanvraagDigitaal/1b5d2211-96fc-4f2e-999b-9414b617413d/started#/Page/0",
    },
    {
      id: 3,
      title: "Begeleiding op maat",
      text: "Wil je extra advies over studiekeuze, studiefinanciering, trajecten op maat,...",
      url: "https://www.arteveldehogeschool.be/bij-ons-studeren/begeleiding-op-maat",
    },
  ];
  return (
    <CTACardsStyle ref={ref} animate={animation}>
      <ul className="cards-list">
        {data.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            text={item.text}
            url={item.url}
          />
        ))}
      </ul>
    </CTACardsStyle>
  );
};

export default CTACards;
