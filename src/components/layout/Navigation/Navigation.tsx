import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";

import logo from "../../../assets/logo/logo.png";
import test from "../../../assets/test/company_test.jpg";
import { transparentize } from "polished";

const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 9;
  overflow: hidden;
  overflow-y: scroll;
  background-color: black;

  .menu__logo,
  .close {
    z-index: 1000;
    position: absolute;
    top: 3rem;
    right: 5rem;
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
          )}, 0 0 80px ${transparentize(0.8, props.theme.colors.turquoise)}`};

        color: ${(props) => props.theme.colors.black};
      }
    }
  }

  .menu__logo {
    left: 5.8rem;
  }
`;

const Logo = styled.div`
  position: relative;
  width: 9.72rem;
  height: 4rem;
`;

const Menu = styled.div`
  height: 100vh;
  margin-top: 5rem;

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
    padding: 8rem 0;
    height: 100vh;
  }
`;

const MenuList = styled.ul`
  width: 100%;
  display: block;
`;

const MenuListItem = styled.li`
  position: relative;
  width: 100%;
  height: 6rem;

  a {
    height: 100%;
    color: ${(props) => props.theme.colors.white};

    .wrapper {
      height: 100%;
      display: flex;
      align-items: flex-end;

      .line {
        height: 1px;
        width: 100%;
        background: ${(props) => props.theme.colors.turquoise};
        box-shadow: 0 0 10px ${(props) => props.theme.colors.turquoise};
        margin-bottom: 0.8rem;
        position: relative;
        display: flex;
        align-items: center;

        &.flex-0 {
          flex: 0;

          &::after {
            display: none;
          }
        }

        &.flex-1 {
          flex: 1;
        }
        &.flex-2 {
          flex: 2;
        }
        &.flex-3 {
          flex: 3;
        }

        &::after {
          content: "";
          position: absolute;
          height: 6px;
          width: 6px;
          background: ${(props) => props.theme.colors.turquoise};
          border-radius: 50%;
        }

        &.left {
          &::after {
            right: 0;
          }
        }

        .mask {
        }
      }
    }
  }
`;

const MenuListItemTitle = styled.div`
  margin: 0 1rem;

  span {
    overflow: hidden;
    margin: 0;
    font-size: ${(props) => props.theme.fontSizes.large};
    font-weight: ${(props) => props.theme.fontWeights.bold};
  }
`;

const MenuListItemFloatingImage = styled.div`
  pointer-events: none;
  position: absolute;
  z-index: 99;
  overflow: hidden;
  top: 0;
  opacity: 0;
`;

export interface NavigationProps {
  setMenuState: Dispatch<SetStateAction<boolean>>;
  menuState: boolean;
}

const Navigation = ({ menuState, setMenuState }: NavigationProps) => {
  return (
    <>
      {menuState && (
        <Container>
          <div className="menu__logo">
            <Link href="/">
              <Logo>
                <Image src={logo} layout="fill" />
              </Logo>
            </Link>
          </div>
          <div className="close">
            <span>
              <CgClose onClick={() => setMenuState(false)} />
            </span>
          </div>

          <Menu>
            <div className="container">
              <div className="container__menu__inner">
                <MenuList>
                  <MenuListItem>
                    <Link href="/">
                      <a>
                        <div className="wrapper">
                          <div className="line left flex-1">
                            {/* <div className="mask"></div> */}
                          </div>
                          <MenuListItemTitle>
                            <span>
                              <div className="title">Home</div>
                            </span>
                          </MenuListItemTitle>
                          <MenuListItemFloatingImage>
                            <Image src={test} width={300} height={300} />
                          </MenuListItemFloatingImage>
                          <div className="line right flex-1">
                            {/* <div className="mask right"></div> */}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </MenuListItem>
                  <MenuListItem>
                    <Link href="/">
                      <a>
                        <div className="wrapper">
                          <div className="line left flex-2">
                            {/* <div className="mask"></div> */}
                          </div>
                          <MenuListItemTitle>
                            <span>
                              <div className="title">Leerlijn</div>
                            </span>
                          </MenuListItemTitle>
                          <MenuListItemFloatingImage>
                            <Image src={test} width={300} height={300} />
                          </MenuListItemFloatingImage>
                          <div className="line right flex-1">
                            {/* <div className="mask right"></div> */}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </MenuListItem>
                  <MenuListItem>
                    <Link href="/">
                      <a>
                        <div className="wrapper">
                          <div className="line left flex-1">
                            {/* <div className="mask"></div> */}
                          </div>
                          <MenuListItemTitle>
                            <span>
                              <div className="title">Vakken</div>
                            </span>
                          </MenuListItemTitle>
                          <MenuListItemFloatingImage>
                            <Image src={test} width={300} height={300} />
                          </MenuListItemFloatingImage>
                          <div className="line right flex-3">
                            {/* <div className="mask right"></div> */}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </MenuListItem>
                  <MenuListItem>
                    <Link href="/">
                      <a>
                        <div className="wrapper">
                          <div className="line left flex-1">
                            {/* <div className="mask"></div> */}
                          </div>
                          <MenuListItemTitle>
                            <span>
                              <div className="title">Projecten</div>
                            </span>
                          </MenuListItemTitle>
                          <MenuListItemFloatingImage>
                            <Image src={test} width={300} height={300} />
                          </MenuListItemFloatingImage>
                          <div className="line right flex-0">
                            {/* <div className="mask right"></div> */}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </MenuListItem>
                  <MenuListItem>
                    <Link href="/">
                      <a>
                        <div className="wrapper">
                          <div className="line left flex-1">
                            {/* <div className="mask"></div> */}
                          </div>
                          <MenuListItemTitle>
                            <span>
                              <div className="title">PGM-Team</div>
                            </span>
                          </MenuListItemTitle>
                          <MenuListItemFloatingImage>
                            <Image src={test} width={300} height={300} />
                          </MenuListItemFloatingImage>
                          <div className="line right flex-3">
                            {/* <div className="mask right"></div> */}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </MenuListItem>
                  <MenuListItem>
                    <Link href="/">
                      <a>
                        <div className="wrapper">
                          <div className="line left flex-1">
                            {/* <div className="mask"></div> */}
                          </div>
                          <MenuListItemTitle>
                            <span>
                              <div className="title">Contact</div>
                            </span>
                          </MenuListItemTitle>
                          <MenuListItemFloatingImage>
                            <Image src={test} width={300} height={300} />
                          </MenuListItemFloatingImage>
                          <div className="line right flex-1">
                            {/* <div className="mask right"></div> */}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </MenuListItem>
                </MenuList>
              </div>
            </div>
          </Menu>
        </Container>
      )}
    </>
  );
};

export default Navigation;
