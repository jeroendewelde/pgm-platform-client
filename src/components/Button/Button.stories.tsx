import React from "react";
import { Meta, Story } from "@storybook/react";

import Button from "./Button";
import { ButtonProps } from "./Button";

const meta: Meta = {
  title: "Button",
  component: Button,
  argTypes: {
    onClick: {
      action: "clicked",
      description: "The button's onClick handler",
    },
    children: {
      defaultValue: "Button",
      type: "string",
      description: "The text to display inside the button",
      control: "text",
    },
    variant: {
      type: "string",
      description: "The variant of the button",
      control: {
        type: "select",
        options: ["primary", "secondary"],
      },
    },
  },
};

export default meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
