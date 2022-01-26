import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const TypeWriterStyle = styled.span`
  line-height: 1.9;
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => props.theme.fontWeights.light};
  font-size: ${(props) => props.theme.fontSizes.small};
`;

interface TerminalProps {
  typeWriterText: string;
}

const TypeWriter = ({ typeWriterText }: TerminalProps) => {
  const [text, setText] = useState("");
  const index = useRef(0);

  useEffect(() => {
    if (index.current > typeWriterText.length) {
      return;
    }

    const unsubscribe = setTimeout(() => {
      setText((value) => value + typeWriterText.charAt(index.current));
      index.current++;
    }, 50);

    return () => {
      clearTimeout(unsubscribe);
    };
  }, [text]);

  return <TypeWriterStyle>{text}</TypeWriterStyle>;
};

export default TypeWriter;
