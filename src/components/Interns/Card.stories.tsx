import React from "react";
import { Meta, Story } from "@storybook/react";

import Card from "./Card";
import { CardProps } from "./Card";

const meta: Meta = {
  title: "components/Interns/Card",
  component: Card,
  args: {
    company: {
      id: 1,
      name: "company",
      interns: [
        {
          id: 1,
          function: "front-end developer",
          description:
            "Ooit mocht ik het Kinderdictee schrijven en vergastte de bollewangenhapsnoeten op de oeioeimachine, een perubalsempopulier en een tafa of West-Australische penseelstaartbuidelmuis; een gribbelgrabbel van woorden, alle uit de Dikke Van Dale, de toverballenautomaat van onze taal.",
          year: "2020-2021",
          studentId: 1,
          student: { id: 1, firstName: "John", lastName: "Doe" },
        },
        {
          id: 2,
          function: "back-end developer",
          description:
            "Having the final word was what it took. Seven glasses of that good cab gave her purple-tinged teeth and complemented a perfect sense of satisfaction. To see him speechless in the rear view mirror, crumpling his shoulders in slow motion, a convulsion in reverse almost — the man was unbelieving and devastated. Her father, a hollow man. | © Spencer Richard",
          year: "2019-2020",
          studentId: 1,
          student: { id: 1, firstName: "Jan", lastName: "Jansen" },
        },
      ],
    },
  },
};

export default meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
