import React from "react";
import { Meta, Story } from "@storybook/react";

import GlitchTitle from "./GlitchTitle";
import { GlitchTitleProps } from "./GlitchTitle";

const meta: Meta = {
  title: "Glitch Title",
  component: GlitchTitle,
  argTypes: {
    children: {
      name: "Title",
      defaultValue: "Glitch Title",
      type: "string",
      description: "The text to display as the title",
      control: "text",
    },
  },
};

export default meta;

const Template: Story<GlitchTitleProps> = (args) => <GlitchTitle {...args} />;

export const Default = Template.bind({});
