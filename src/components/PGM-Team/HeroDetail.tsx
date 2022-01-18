import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { GetOneTeacherClient } from "../../../interfaces";
import { SocialMediaListItem, TeacherImage } from "../Teacher";
import { GlitchTitle } from "../Titles/GlitchTitle";
import { Quote } from "../Quote";

const Container = styled.div`
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
    <Container>
      <div className="mobile">
        <div className="mobileImage">
          <TeacherImage />
        </div>
        <GlitchTitle>{teacher.firstName + " " + teacher.lastName}</GlitchTitle>
        <ul className="socials">
          {teacher.personInformation.socialMedias.map((socialMedia) => (
            <SocialMediaListItem socialMedia={socialMedia} />
          ))}
        </ul>
        <div className="quote">
          <Quote content={teacher.personInformation.quote} />
        </div>
      </div>

      <div className="desktop">
        <GlitchTitle>{teacher.firstName + " " + teacher.lastName}</GlitchTitle>

        <div className="flex">
          <div className="desktopImage">
            <TeacherImage />
          </div>

          <div className="content">
            <ul className="socials">
              {teacher.personInformation.socialMedias.map((socialMedia) => (
                <SocialMediaListItem socialMedia={socialMedia} />
              ))}
            </ul>
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
