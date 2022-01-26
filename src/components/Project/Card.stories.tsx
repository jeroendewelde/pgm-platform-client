import React from "react";
import { Meta, Story } from "@storybook/react";

import Card, { CardProps } from "./Card";

const meta: Meta = {
  title: "components/Project/Card",
  component: Card,

  args: {
    key: "1",
    project: {
      id: "1",
      name: "Project 1",
      teaserText: "Dit is teaser text",
      tags: ["tag1", "tag2"],
      students: [
        {
          id: "1",
          name: "Student 1",
        },
        {
          id: "2",
          name: "Student 2",
        },
      ],
    },
  },
};

export default meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
