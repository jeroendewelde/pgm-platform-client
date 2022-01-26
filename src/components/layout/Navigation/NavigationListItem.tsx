import Image from "next/image";
import Link from "next/link";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useEffect,
} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const MenuListItem = styled.li`
  position: relative;
  width: 100%;
  height: 4rem;

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
          background-color: ${(props) => props.theme.colors.black};
          width: 100%;
          height: 6px;
          z-index: 9;
          position: absolute;

          &.right {
            right: 0;
          }
        }
      }
    }
  }
`;

const MenuListItemTitle = styled(motion.div)`
  margin: 0 1rem;
  transition: ${(props) => props.theme.transition.normal};
  overflow: hidden;

  &:hover {
    -webkit-text-fill-color: ${(props) => props.theme.colors.black};
    -webkit-text-stroke: 1px;
    -webkit-text-stroke-color: ${(props) => props.theme.colors.turquoise};
  }

  span {
    overflow: hidden;
    display: block;
    margin: 0;
    font-size: ${(props) => props.theme.fontSizes.semimedium};
    font-weight: ${(props) => props.theme.fontWeights.bold};

    @media (min-width: ${(props) => props.theme.width.medium}) {
      font-size: ${(props) => props.theme.fontSizes.large};
    }
  }
`;

const MenuListItemFloatingImage = styled(motion.div)`
  opacity: 0;
  pointer-events: none;
  position: absolute;
  z-index: 99;
  overflow: hidden;
  top: 0;
  width: 20rem;
  height: 20rem;
  display: none;

  @media (min-width: ${(props) => props.theme.width.small}) {
    display: block;
  }
`;

// Transition ---------------------------------------------------------------------------------------------
const transition = {
  duration: 0.8,
  ease: [0.6, -0.05, 0.01, 0.9],
};
// ---------------------------------------------------------------------------------------------------------

// Variants ----------------------------------------------------------------------------------------------
const maskAnimation = {
  initial: { width: "100%" },
  animate: { width: 0 },
};

const titleVariant = {
  initial: { y: 200 },
  animate: { y: 0 },
};
// ---------------------------------------------------------------------------------------------------------

interface NavigationProps {
  setCursorHover: Dispatch<SetStateAction<boolean>>;
  x: number;
  y: number;
  title: string;
  url: string;
  offset: number;
  rightLineFlex: number;
  leftLineFlex: number;
  image: string;
}

const NavigationListItem = ({
  setCursorHover,
  x,
  y,
  title,
  url,
  offset,
  rightLineFlex,
  leftLineFlex,
  image,
}: NavigationProps) => {
  const [hoverState, setHoverState] = useState(false);
  const [listPosition, setListPosition] = useState({
    top: 0,
    left: 0,
  });
  const list = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (list && list.current) {
      setListPosition({
        top: list.current.getBoundingClientRect().top,
        left: list.current.getBoundingClientRect().left,
      });
    }
  }, [hoverState]);
  return (
    <MenuListItem ref={list}>
      <Link href={url}>
        <a>
          <div className="wrapper">
            <div className={`line left flex-${leftLineFlex}`}>
              <motion.div
                variants={maskAnimation}
                transition={transition}
                className="mask"
              ></motion.div>
            </div>
            <MenuListItemTitle
              onHoverStart={() => {
                setHoverState(true);
                setCursorHover(true);
              }}
              onHoverEnd={() => {
                setHoverState(false);
                setCursorHover(false);
              }}
            >
              <span>
                <motion.div
                  variants={titleVariant}
                  transition={transition}
                  className="title"
                >
                  {title}
                </motion.div>
              </span>
            </MenuListItemTitle>

            <MenuListItemFloatingImage
              initial={{ opacity: 0 }}
              transition={{
                ease: "linear",
              }}
              animate={{
                opacity: hoverState ? 1 : 0,
                x: x - listPosition.left + offset,
                y: y - listPosition.top - 150,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image src={image} layout="fill" objectFit="cover" />
              </div>
            </MenuListItemFloatingImage>

            <div className={`line right flex-${rightLineFlex}`}>
              <motion.div
                variants={maskAnimation}
                transition={{
                  ...transition,
                  duration: 1,
                }}
                className="mask right"
              ></motion.div>
            </div>
          </div>
        </a>
      </Link>
    </MenuListItem>
  );
};

export default NavigationListItem;
