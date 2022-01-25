import { motion } from "framer-motion";
import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";

import { SocialMedia } from "../../../interfaces";
import { CursorContext } from "../../context/CursorContext";

const fadeUp = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.6, 0.05, -0.01, 0.99],
    },
  },
  exit: {
    y: 20,
    opacity: 0,
  },
};

const ListItem = styled(motion.li)`
  a {
    margin-right: 1rem;
    padding: 0.3rem 0.5rem;
    font-family: ${(props) => props.theme.fontFamilies.secondary};
    font-size: ${(props) => props.theme.fontSizes.small};
    color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.white};
    border-radius: ${(props) => props.theme.borderRadius.small};
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);

    transition: ${(props) => props.theme.transition.normal};

    &:hover {
      background-color: ${(props) => props.theme.colors.white};
      color: ${(props) => props.theme.colors.black};
      box-shadow: 0 0 20px ${(props) => props.theme.colors.white},
        0 0 40px ${(props) => props.theme.colors.white},
        0 0 80px ${(props) => props.theme.colors.white};
      border: 1px solid ${(props) => props.theme.colors.white};
    }
  }
`;

interface Props {
  socialMedia: SocialMedia;
}

const SocialMediaListItem = ({ socialMedia }: Props) => {
  const { setCursorHover } = useContext(CursorContext);

  const handleMouseEnter = () => {
    setCursorHover(true);
    //change z-index of the card to be on top of the other cursor
    const element = document.querySelector(".cursor") as HTMLElement;
    if (element !== null) {
      element.style.zIndex = "0";
    }
  };

  const handleMouseLeave = () => {
    setCursorHover(false);
    const element = document.querySelector(".cursor") as HTMLElement;

    if (element !== null) {
      element.style.zIndex = "11";
    }
  };

  return (
    <ListItem
      key={socialMedia.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={fadeUp}
    >
      <Link href={socialMedia.url}>
        <a>{socialMedia.platform}</a>
      </Link>
    </ListItem>
  );
};

export default SocialMediaListItem;
