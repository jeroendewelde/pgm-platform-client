import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import { transparentize } from "polished";

import Panels from "./Panels";
import NavigationListItem from "./NavigationListItem";
import NavigationListItemData from "../../../data/NavigationListItems.json";

// Variants
const parentVariants = {
  animate: {
    transition: { staggerChildren: 0.05, delayChildren: 1 },
  },
};

const Container = styled(motion.div)`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 9;
  overflow: hidden;
  overflow-y: scroll;
  background-color: black;

  .header__container {
    width: 100%;
    padding: 0 1rem;
    background-color: ${(props) =>
      transparentize(0.7, props.theme.colors.turquoise)};
    -webkit-backdrop-filter: blur(2em);
    backdrop-filter: blur(2em);

    @media (min-width: ${(props) => props.theme.width.medium}) {
      padding: 0 2rem;
    }

    .wrapper {
      max-width: ${(props) => props.theme.width.large};
      margin: 0 auto;

      .flex__container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .close {
          display: flex;
          align-items: center;
          cursor: pointer;

          span {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: ${(props) => props.theme.borderRadius.small};
            border: 2px solid ${(props) => props.theme.colors.turquoise};
            font-size: ${(props) => props.theme.fontSizes.medium};
            padding: 0.2rem;
            color: ${(props) => props.theme.colors.white};
            background: ${(props) =>
              transparentize(0.6, props.theme.colors.turquoise)};
            cursor: pointer;
            transition: ${(props) => props.theme.transition.normal};

            &:hover {
              background: ${(props) =>
                transparentize(0, props.theme.colors.turquoise)};
              border: 2px solid ${(props) => props.theme.colors.turquoise};
              box-shadow: ${(props) =>
                `0 0 20px ${transparentize(
                  0.5,
                  props.theme.colors.turquoise
                )}, 0 0 40px ${transparentize(
                  0.6,
                  props.theme.colors.turquoise
                )}, 0 0 80px ${transparentize(
                  0.8,
                  props.theme.colors.turquoise
                )}`};
              color: ${(props) => props.theme.colors.black};
            }
          }
        }
      }
    }
  }
`;

const Logo = styled.div`
  position: relative;
  width: 9.72rem;
  height: 4rem;
`;

const Menu = styled.div`
  height: 100vh;
  margin-top: -2rem;
  display: flex;
  align-items: center;

  .container {
    flex-grow: 1;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    width: auto;
    @media (min-width: 1024px) {
      max-width: 960px;
    }
    @media (min-width: 1216px) {
      max-width: 1152px;
    }
    @media (min-width: 1480px) {
      max-width: 1244px;
    }
  }

  .container__menu__inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const MenuList = styled(motion.ul)`
  width: 100%;
  display: block;
`;

export interface NavigationProps {
  setNavigationState: Dispatch<SetStateAction<boolean>>;
  navigationState: boolean;
  x: number;
  y: number;
  setCursorHover: Dispatch<SetStateAction<boolean>>;
}

const Navigation = ({
  navigationState,
  setNavigationState,
  x,
  y,
  setCursorHover,
}: NavigationProps) => {
  return (
    <>
      <AnimatePresence>
        {navigationState && (
          <>
            <Container
              initial={{ visibility: "hidden" }}
              animate={{ visibility: "visible", transition: { delay: 1 } }}
              exit={{
                visibility: "hidden",
                transition: {
                  delay: 1,
                },
              }}
            >
              <div className="header__container">
                <div className="wrapper">
                  <div className="flex__container">
                    <motion.div
                      className="menu__logo"
                      onHoverStart={() => {
                        setCursorHover(true);
                      }}
                      onHoverEnd={() => {
                        setCursorHover(false);
                      }}
                    >
                      <Link href="/">
                        <Logo>
                          <Image src="/logo/logo.png" layout="fill" />
                        </Logo>
                      </Link>
                    </motion.div>
                    <motion.div
                      className="close"
                      onHoverStart={() => {
                        setCursorHover(true);
                      }}
                      onHoverEnd={() => {
                        setCursorHover(false);
                      }}
                    >
                      <span>
                        <CgClose onClick={() => setNavigationState(false)} />
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>

              <Menu>
                <div className="container">
                  <div className="container__menu__inner">
                    <MenuList
                      variants={parentVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      {NavigationListItemData.map((item) => (
                        <NavigationListItem
                          x={x}
                          y={y}
                          setCursorHover={setCursorHover}
                          key={item.url}
                          title={item.title}
                          url={item.url}
                          offset={item.offset}
                          rightLineFlex={item.rightLineFlex}
                          leftLineFlex={item.leftLineFlex}
                          image={item.image}
                        />
                      ))}
                    </MenuList>
                  </div>
                </div>
              </Menu>
            </Container>
            <Panels />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
