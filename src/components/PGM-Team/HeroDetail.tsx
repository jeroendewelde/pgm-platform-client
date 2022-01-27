import React from "react";
import styled from "styled-components";
import { GetOneTeacherClient } from "../../../interfaces";
import { SocialMediaListItem, TeacherImage } from "../Teacher";
import { GlitchTitle } from "../Titles/GlitchTitle";
import { Quote } from "../Quote";
import { motion } from "framer-motion";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.8,
    },
  },
};

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

const imageFadeIn = {
  initial: {
    opacity: 0,
    y: -20,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      delay: 0.7,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
  },
};

const Container = styled(motion.div)`
  .mobile {
    margin-top: 3rem;
    @media (min-width: ${(props) => props.theme.width.small}) {
      display: none;
    }

    h1 {
      margin: 2rem 0;
    }

    .mobileImage {
      display: flex;
      align-items: center;
      justify-content: center;

      div,
      svg {
        width: 25rem;
        height: 25rem;
      }
    }

    .quote {
      margin-top: 3rem;
    }
  }

  .desktop {
    display: none;
    @media (min-width: ${(props) => props.theme.width.small}) {
      display: block;
    }
    h1 {
      margin-bottom: 1rem;

      @media (min-width: ${(props) => props.theme.width.small}) {
        text-align: left;
      }
    }

    .desktopImage {
      display: none;
      div,
      svg {
        width: 20rem;
        height: 20rem;
      }

      @media (min-width: ${(props) => props.theme.width.medium}) {
        div,
        svg {
          width: 25rem;
          height: 25rem;
        }
      }

      @media (min-width: ${(props) => props.theme.width.large}) {
        div,
        svg {
          width: 40rem;
          height: 40rem;
        }
      }

      @media (min-width: ${(props) => props.theme.width.small}) {
        display: block;
        margin-left: -2.5rem;
        margin-top: 2.5rem;
      }
      @media (min-width: ${(props) => props.theme.width.medium}) {
        margin-left: -4rem;
      }
      @media (min-width: ${(props) => props.theme.width.large}) {
        margin-left: -6rem;
      }
    }

    .flex {
      display: flex;
      align-items: flex-start;

      @media (min-width: ${(props) => props.theme.width.large}) {
        align-items: center;
      }

      .content {
        margin-top: 5rem;
        max-width: 50rem;
      }
    }
  }

  .socials {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 2rem;

    @media (min-width: ${(props) => props.theme.width.medium}) {
      margin-left: 2rem;
      margin-top: 2rem;
    }
  }
`;

interface HeroDetailProps {
  teacher: GetOneTeacherClient;
}

const HeroDetail = ({ teacher }: HeroDetailProps) => {
  return (
    <Container initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <div className="mobile">
        <motion.div className="mobileImage" variants={imageFadeIn}>
          <TeacherImage image={teacher.avatarUrl} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{
            delay: 0.3,
            duration: 0.65,
          }}
        >
          <GlitchTitle>
            {teacher.firstName + " " + teacher.lastName}
          </GlitchTitle>
        </motion.div>
        <ul className="socials">
          {teacher.personInformation.socialMedias.map((socialMedia) => (
            <motion.div key={socialMedia.id} variants={fadeUp}>
              <SocialMediaListItem socialMedia={socialMedia} />
            </motion.div>
          ))}
        </ul>
        <div className="quote">
          <Quote content={teacher.personInformation.quote} />
        </div>
      </div>

      <div className="desktop">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{
            delay: 0.3,
            duration: 0.65,
          }}
        >
          <GlitchTitle>
            {teacher.firstName + " " + teacher.lastName}
          </GlitchTitle>
        </motion.div>

        <div className="flex">
          <motion.div className="desktopImage" variants={imageFadeIn}>
            <TeacherImage image={teacher.avatarUrl} />
          </motion.div>

          <div className="content">
            <motion.ul className="socials" variants={stagger}>
              {teacher.personInformation.socialMedias.map((socialMedia) => (
                <motion.div key={socialMedia.id} variants={fadeUp}>
                  <SocialMediaListItem socialMedia={socialMedia} />
                </motion.div>
              ))}
            </motion.ul>
            <div className="quote">
              <Quote content={teacher.personInformation.quote} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HeroDetail;
