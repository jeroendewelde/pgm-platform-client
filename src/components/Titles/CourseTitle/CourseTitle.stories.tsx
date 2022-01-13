import React from "react";
import { Meta, Story } from "@storybook/react";

import CourseTitle from "./CourseTitle";
import { CourseTitleProps } from "./CourseTitle";

const meta: Meta = {
  title: "components/Titles/Course Title",
  component: CourseTitle,
  argTypes: {
    children: {
      name: "Title",
      defaultValue: "Course Title",
      type: "string",
      description: "The text to display as the title",
      control: "text",
    },
  },
};

export default meta;

const Template: Story<CourseTitleProps> = (args) => <CourseTitle {...args} />;

export const Default = Template.bind({});
