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
  },
};

export default meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
