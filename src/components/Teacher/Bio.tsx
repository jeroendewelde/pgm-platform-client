import React from "react";
import { H2 } from "../Titles/H2";

interface BioProps {
  bio: string;
}

const Bio = ({ bio }: BioProps) => {
  return (
    <div>
      <H2>Bio</H2>
    </div>
  );
};

export default Bio;
