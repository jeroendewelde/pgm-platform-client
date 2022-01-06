import React from "react";
import { Meta, Story } from "@storybook/react";

import Card from "./Card";
import { CardProps } from "./Card";

const meta: Meta = {
  title: "components/Interns/Card",
  component: Card,
};

export default meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
