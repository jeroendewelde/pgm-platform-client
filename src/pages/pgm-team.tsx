import React from "react";
import { TeacherCard } from "../components/Teacher";
import { GlitchTitle } from "../components/Titles/GlitchTitle";

const PgmTeam = () => {
  return (
    <>
      <GlitchTitle>Docenten</GlitchTitle>
      <TeacherCard
        url=""
        bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat."
        name="Valerie De Bruycker"
        socialMedia={[
          { name: "Facebook", url: "https://www.facebook.com/" },
          { name: "Instagram", url: "https://www.instagram.com/" },
          { name: "Github", url: "https://www.github.com/" },
          { name: "LinkedIn", url: "https://www.linkedin.com/" },
        ]}
      />
    </>
  );
};

export default PgmTeam;
