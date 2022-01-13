import React from "react";
import { Meta, Story } from "@storybook/react";

import Quote from "./Quote";
import { QuoteProps } from "./Quote";

const meta: Meta = {
  title: "components/Quote/Quote",
  component: Quote,
  argTypes: {
    source: {
      description: "The source of the quote",
      defaultValue: "John Doe",
      control: "text",
      type: "string",
    },
    content: {
      description: "The content of the quote",
      defaultValue:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      control: "text",
      type: "string",
    },
  },
};

export default meta;

const Template: Story<QuoteProps> = (args) => <Quote {...args} />;

export const Default = Template.bind({});
