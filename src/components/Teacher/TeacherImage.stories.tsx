import React from "react";
import { Meta, Story } from "@storybook/react";

import TeacherImage from "./TeacherImage";
import { TeacherImageProps } from "./TeacherImage";

const meta: Meta = {
  title: "components/Teacher/Image",
  component: TeacherImage,
};

export default meta;

const Template: Story<TeacherImageProps> = (args) => <TeacherImage {...args} />;

export const Default = Template.bind({});
