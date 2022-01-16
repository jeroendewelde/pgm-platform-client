import React from "react";
import { Meta, Story } from "@storybook/react";

import TeacherCard from "./TeacherCard";
import { TeacherCardProps } from "./TeacherCard";

const meta: Meta = {
  title: "components/Teacher/Card",
  component: TeacherCard,
};

export default meta;

const Template: Story<TeacherCardProps> = (args) => <TeacherCard {...args} />;

export const Default = Template.bind({});
