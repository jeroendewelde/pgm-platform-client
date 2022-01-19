import Image from "next/image";
import Link from "next/link";
import { transparentize } from "polished";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { Navigation } from "../Navigation";
import MenuButton from "./MenuButton";
import { useMousePosition } from "../../../hooks/useMousePosition";

const Container = styled.header`
  width: 100%;
  padding: 0 1rem;
  background-color: ${(props) =>
    transparentize(0.7, props.theme.colors.turquoise)};
  -webkit-backdrop-filter: blur(2em);
  backdrop-filter: blur(2em);

  @media (min-width: ${(props) => props.theme.width.medium}) {
    padding: 0 2rem;
  }
`;

const Wrapper = styled.div`
  max-width: ${(props) => props.theme.width.large};
  margin: 0 auto;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  cursor: pointer;
  position: relative;
  width: 9.72rem;
  height: 4rem;
`;

export interface HeaderProps {
  setCursorHover: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ setCursorHover }: HeaderProps) => {
  const [navigationState, setNavigationState] = useState(false);

  const router = useRouter();

  const { x, y } = useMousePosition();

  useEffect(() => {
    setNavigationState(false);
  }, [router.pathname]);

  useEffect(() => {
    if (navigationState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [navigationState]);

  return (
    <>
      <Navigation
        x={x}
        y={y}
        navigationState={navigationState}
        setNavigationState={setNavigationState}
        setCursorHover={setCursorHover}
      />
      <Container>
        <Wrapper>
          <FlexContainer>
            <Link href="/">
              <Logo>
                <Image src="/logo/logo.png" layout="fill" />
              </Logo>
            </Link>

            <MenuButton
              setNavigationState={setNavigationState}
              setCursorHover={setCursorHover}
              navigationState={navigationState}
            />
          </FlexContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default Header;
