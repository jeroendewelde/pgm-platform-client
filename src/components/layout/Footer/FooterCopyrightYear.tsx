import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap;
`;

const Copyright = styled.span`
  font-size: ${(props) => props.theme.fontSizes.normal};
  display: block;
  margin: 0.5rem auto;
  text-align: center;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
  margin: 0.5rem auto;

  li {
    transition: ${(props) => props.theme.transition.normal};

    &::after {
      content: "|";
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      color: ${(props) => props.theme.colors.turquoise};
    }

    &:last-child ::after {
      content: "";
      margin: 0;
    }

    &:hover a {
      color: ${(props) => props.theme.colors.turquoise};
    }

    a {
      color: ${(props) => props.theme.colors.white};
    }
  }
`;

const FooterCopyrightYear = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <Copyright>Copyright © {currentYear} Arteveldehogeschool</Copyright>
      <List>
        <li>
          <Link href="https://www.arteveldehogeschool.be/disclaimer">
            Disclaimer
          </Link>
        </li>
        <li>
          <Link href="https://www.arteveldehogeschool.be/privacybeleid">
            Privacybeleid
          </Link>
        </li>
        <li>
          <Link href="https://www.arteveldehogeschool.be/cookiebeleid">
            Cookiebeleid
          </Link>
        </li>
      </List>
    </Container>
  );
};

export default FooterCopyrightYear;
