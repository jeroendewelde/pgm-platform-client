import React from "react";
import { Meta, Story } from "@storybook/react";

import H2 from "./H2";
import { H2Props } from "./H2";

const meta: Meta = {
  title: "components/Titles/H2",
  component: H2,
  argTypes: {
    children: {
      name: "Title",
      defaultValue: "Hoofdtekst 2",
      type: "string",
      description: "The text to display as the title",
      control: "text",
    },
  },
};

export default meta;

const Template: Story<H2Props> = (args) => <H2 {...args} />;

export const Default = Template.bind({});
