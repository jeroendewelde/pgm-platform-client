import Image from "next/image";
import Link from "next/link";
import { transparentize } from "polished";
import React from "react";
import styled from "styled-components";
import { CgChevronRightO } from "react-icons/cg";

import teacher from "../../assets/test/teacher.png";
import { SocialMedia } from "../../../interfaces";

const SuperContainer = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  transition: ${(props) => props.theme.transition.normal};
  overflow: hidden;
  /* 
  &:hover {
    transform: scale(1.05);
  } */

  &:hover .hidden {
    @media (min-width: ${(props) => props.theme.width.esmall}) {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const Container = styled.div`
  border-bottom: 3px solid ${(props) => props.theme.colors.turquoise};
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background-color: ${(props) =>
    transparentize(0.4, props.theme.colors.purple)};
  padding: 1rem;
  padding-bottom: 0;

  @media (min-width: ${(props) => props.theme.width.esmall}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TeacherInfo = styled.div`
  .name {
    font-family: ${(props) => props.theme.fontFamilies.primary};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    display: block;
    font-size: ${(props) => props.theme.fontSizes.emedium};
    color: ${(props) => props.theme.colors.white};

    @media (min-width: ${(props) => props.theme.width.esmall}) {
      font-size: ${(props) => props.theme.fontSizes.emedium};
      line-height: 1.2;
    }

    @media (min-width: ${(props) => props.theme.width.small}) {
      font-size: ${(props) => props.theme.fontSizes.large};
      line-height: 1.2;
    }
  }

  ul {
    display: none;

    @media (min-width: ${(props) => props.theme.width.esmall}) {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    li {
      span {
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
    }
  }

  .hidden {
    display: none;
    margin-top: 1.5rem;
    position: absolute;
    opacity: 0;
    display: flex;
    align-items: center;
    transform: translateX(-100%);
    transition: ${(props) => props.theme.transition.normal};

    @media (min-width: ${(props) => props.theme.width.esmall}) {
      position: relative;
      display: flex;
    }

    span {
      font-size: ${(props) => props.theme.fontSizes.medium};
      font-weight: ${(props) => props.theme.fontWeights.bold};
      color: ${(props) => props.theme.colors.white};
    }

    .icon {
      font-size: ${(props) => props.theme.fontSizes.large};
      color: ${(props) => props.theme.colors.turquoise};

      border-radius: 50%;

      margin-left: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 20rem;
  height: 20rem;
`;

const Bio = styled.div`
  padding: 1rem;
  background-color: ${(props) => transparentize(0.5, props.theme.colors.black)};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 3px solid ${(props) => props.theme.colors.turquoise};
  display: none;

  @media (min-width: ${(props) => props.theme.width.esmall}) {
    display: block;
  }

  p {
    color: ${(props) => props.theme.colors.white};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
`;

export interface TeacherCardProps {
  firstName: string;
  lastName: string;
  bio: string;
  id: number;
  socialMedia: SocialMedia[];
}

const TeacherCard = ({
  firstName,
  lastName,
  socialMedia,
  bio,
  id,
}: TeacherCardProps) => {
  return (
    <Link href={`pgm-team/${id}`}>
      <SuperContainer>
        <Container>
          <FlexContainer>
            <TeacherInfo>
              <span className="name">{firstName + " " + lastName}</span>
              <ul>
                {socialMedia.map((media) => (
                  <li
                    key={media.id}
                    onClick={() => {
                      window.open(media.url, "_blank");
                    }}
                  >
                    <span>{media.platform}</span>
                  </li>
                ))}
              </ul>

              <div className="hidden">
                <span>Ontdek meer over {firstName}</span>
                <span className="icon">
                  <CgChevronRightO />
                </span>
              </div>
            </TeacherInfo>
            <ImageContainer>
              <Image
                src={teacher}
                layout="fill"
                alt="teacher"
                objectFit="contain"
              />
            </ImageContainer>
          </FlexContainer>
        </Container>
        <Bio>
          <p>{bio}</p>
        </Bio>
      </SuperContainer>
    </Link>
  );
};

export default TeacherCard;
