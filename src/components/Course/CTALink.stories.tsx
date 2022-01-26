import React from "react";
import { Meta, Story } from "@storybook/react";

import CTALink from "./CTALink";
import { CTALinkProps } from "./CTALink";

const meta: Meta = {
  title: "components/CTA/Link",
  component: CTALink,
  argTypes: {
    children: {
      name: "Label",
      defaultValue: "Arteveldehogeschool",
      type: "string",
      description: "The text to display inside the link",
      control: "text",
    },
    href: {
      name: "Href",
      defaultValue: "https://www.arteveldehogeschool.be/",
      type: "string",
      description: "The href of the link",
      control: "text",
    },
  },
};

export default meta;

const Template: Story<CTALinkProps> = (args) => <CTALink {...args} />;

export const Default = Template.bind({});
