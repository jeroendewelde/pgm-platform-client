import React from "react";
import { Meta, Story } from "@storybook/react";

import LinkButton from "./LinkButton";
import { LinkButtonProps } from "./LinkButton";

const meta: Meta = {
  title: "components/CTA/LinkButton",
  component: LinkButton,
  argTypes: {
    children: {
      name: "Label",
      defaultValue: "Button",
      type: "string",
      description: "The text to display inside the button",
      control: "text",
    },
    href: {
      name: "Href",
      defaultValue: "https://www.arteveldehogeschool.be/",
      type: "string",
      description: "The href of the button",
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

const Template: Story<LinkButtonProps> = (args) => <LinkButton {...args} />;

export const Default = Template.bind({});
