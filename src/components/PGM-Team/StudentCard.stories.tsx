import React from "react";
import { Meta, Story } from "@storybook/react";

import StudentCard from "./StudentCard";
import { StudentCardProps } from "./StudentCard";

const meta: Meta = {
  title: "components/Student/Card",
  component: StudentCard,
  args: {
    name: "John Doe",
  },
};

export default meta;

const Template: Story<StudentCardProps> = (args) => <StudentCard {...args} />;

export const Default = Template.bind({});
