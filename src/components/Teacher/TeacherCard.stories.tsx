import React from "react";
import { Meta, Story } from "@storybook/react";

import TeacherCard from "./TeacherCard";
import { TeacherCardProps } from "./TeacherCard";

const meta: Meta = {
  title: "components/Teacher/Card",
  component: TeacherCard,
  args: {
    firstName: "John",
    lastName: "Doe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    url: "/",
    socialMedia: [
      {
        platform: "Facebook",
        url: "https://www.facebook.com",
      },
      {
        platform: "Twitter",
        url: "https://www.twitter.com",
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com",
      },
    ],
  },
};

export default meta;

const Template: Story<TeacherCardProps> = (args) => <TeacherCard {...args} />;

export const Default = Template.bind({});
