import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { SocialMedia } from "../../../interfaces";

const ListItem = styled.li`
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
  return (
    <ListItem key={socialMedia.id}>
      <Link href={socialMedia.url}>
        <a>{socialMedia.platform}</a>
      </Link>
    </ListItem>
  );
};

export default SocialMediaListItem;
