import React from "react";
import styled from "styled-components";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Container = styled.div``;

const ContentContainer = styled.div`
  position: relative;
  padding: 0 2rem;

  span {
    color: ${(props) => props.theme.colors.orange};
    font-size: ${(props) => props.theme.fontSizes.medium};
  }

  .FaQuoteLeft {
    position: absolute;
    left: 0;
    top: -0.8rem;
  }

  .FaQuoteRight {
    position: absolute;
    right: 0;
    bottom: -1.3rem;
  }
`;

const Source = styled.p`
  padding-left: 2rem;
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.colors.turquoise};
`;

export interface QuoteProps {
  source: string;
  content: string;
}

const Quote = ({ source, content }: QuoteProps) => {
  return (
    <Container>
      <div>
        <ContentContainer>
          <span className="FaQuoteLeft">
            <FaQuoteLeft />
          </span>
          <p>{content}</p>
          <span className="FaQuoteRight">
            <FaQuoteRight />
          </span>
        </ContentContainer>
        <Source>- {source}</Source>
      </div>
    </Container>
  );
};

export default Quote;
