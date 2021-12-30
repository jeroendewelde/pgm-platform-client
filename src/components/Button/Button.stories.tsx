import React from "react";
import { Meta, Story } from "@storybook/react";

import Button from "./Button";
import { ButtonProps } from "./Button";

const meta: Meta = {
  title: "Button",
  component: Button,
};

export default meta;

export const Default = () => <Button>Click me</Button>;
