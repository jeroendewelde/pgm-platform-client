import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { lighten, transparentize } from "polished";

import { Project } from "../../../interfaces";
import TypeWriter from "./TypeWriter";

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 20rem;
  height: 100%;
  background-color: ${(props) =>
    lighten(0, props.theme.colors.bg_gradient_color_1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => transparentize(0.6, props.theme.colors.gray)};
  padding-top: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 2rem;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    min-height: 25rem;
    margin-top: 1rem;
  }

  .buttons {
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    span {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: ${(props) => props.theme.borderRadius.circle};
      background-color: ${(props) => props.theme.colors.gray};
      margin-right: 0.5rem;
    }
  }

  .terminal-content {
    font-family: ${(props) => props.theme.fontFamilies.secondary};

    .terminal-content-title-container {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      margin-bottom: 1rem;

      .terminal-content-title {
        font-weight: ${(props) => props.theme.fontWeights.bold};
        color: ${(props) => props.theme.colors.pink};
        margin-right: 0.5rem;
        line-height: 1.9;
        font-size: ${(props) => props.theme.fontSizes.small};
      }

      .tags {
        color: ${(props) => props.theme.colors.white};
        font-weight: ${(props) => props.theme.fontWeights.light};
        font-size: ${(props) => props.theme.fontSizes.small};
      }
    }
  }
`;

interface TerminalProps {
  project: Project;
}

const Terminal = ({ project }: TerminalProps) => {
  const [hidden, setHidden] = useState([]) as any;

  const data = [
    {
      id: 1,
      title: "~/summary",
      project_title: project.teaserText,
      timeout: 0,
    },
    {
      id: 2,
      title: "~/course",
      project_title: project.course.name,
      timeout: 5000,
    },

    {
      id: 3,
      title: "~/tags",
      project_title: project.tags.join(", "),
      timeout: 8000,
    },
    {
      id: 4,
      title: "~/year",
      project_title: project.academicYear,
      timeout: 11000,
    },
    {
      id: 5,
      title: "~/made-by",
      project_title: project.students
        .map((student) => student.firstName + " " + student.lastName)
        .join(" & "),
      timeout: 13000,
    },
  ];

  useEffect(() => {
    const test = data.forEach((item) => {
      setTimeout(() => {
        setHidden((value: any) => [...value, item]);
      }, item.timeout * 1);
    });

    clearTimeout();
    setHidden([]);
  }, []);

  return (
    <Container>
      <div className="buttons">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className="terminal-content">
        {hidden.map(
          (item: {
            id: React.Key | null | undefined;
            title:
              | boolean
              | React.ReactChild
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined;
            project_title: string;
          }) => (
            <li key={item.id} className="terminal-content-title-container">
              <span className="terminal-content-title">
                {item.title} <TypeWriter typeWriterText={item.project_title} />
              </span>
            </li>
          )
        )}
      </ul>
    </Container>
  );
};

export default Terminal;
