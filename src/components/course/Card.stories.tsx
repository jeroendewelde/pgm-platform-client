import React from "react";
import { Meta, Story } from "@storybook/react";

import Card from "./Card";
import { CardProps } from "./Card";

const meta: Meta = {
  title: "components/Course/Card",
  component: Card,
  argTypes: {
    tags: {
      name: "Tags",
      defaultValue: ["react", "javascript", "typescript"],
      description: "The tags to display",
      control: "array",
    },
    title: {
      name: "Title",
      defaultValue: "Computer Systems",
      description: "The title of the course",
      control: "text",
    },
    learningLine: {
      name: "Learning Line",
      defaultValue: "blue",
      description: "The color of the learning line",
      control: {
        type: "select",
        options: ["blue", "green", "orange", "pink", "red"],
      },
    },
  },
};

export default meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
