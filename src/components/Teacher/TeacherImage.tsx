import Image from "next/image";
import React from "react";
import styled from "styled-components";

import teacherFallback from "../../assets/fallback_images/fallback_teacher.png";
const Container = styled.div`
  position: relative;

  svg {
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 15rem;
  height: 15rem;

  span {
    clip-path: polygon(0 0, 100% 18%, 100% 88%, 0 96.5%);
  }
`;

export interface TeacherImageProps {
  image: string;
}

const TeacherImage = ({ image }: TeacherImageProps) => {
  return (
    <Container>
      <ImageContainer>
        <Image
          src={image ? image : teacherFallback}
          layout="fill"
          alt="teacher"
          objectFit="contain"
        />
      </ImageContainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="15rem"
        height="15rem"
        viewBox="0 0 205.383 290.606"
      >
        <defs>
          <filter
            id="Rectangle_548"
            x="0"
            y="0"
            width="205.383"
            height="290.606"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#00a5d9" />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_548)">
          <g id="Rectangle_548-2" data-name="Rectangle 548" fill="none">
            <path d="M9,9,196.383,43.06V265.05L9,281.606Z" stroke="none" />
            <path
              d="M 193.1913452148438 260.6890869140625 L 193.1913452148438 47.12301254272461 L 13.77130508422852 15.51970100402832 L 13.77130508422852 275.5315856933594 L 193.1913452148438 260.6890869140625 M 196.3826751708984 265.0498962402344 L 9.000054359436035 281.6055603027344 L 9.000054359436035 9.000002861022949 L 196.3826751708984 43.06035232543945 L 196.3826751708984 265.0498962402344 Z"
              stroke="none"
              fill="#00a5d9"
            />
          </g>
        </g>
      </svg>
    </Container>
  );
};

export default TeacherImage;
