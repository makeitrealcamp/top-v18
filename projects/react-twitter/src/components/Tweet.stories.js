import React from "react";
import Tweet from "./Tweet";

export default {
  title: "Tweet",
  component: Tweet,
  argTypes: {
    content: {
      description: "El contenido del Tweet",
      type: "string",
    },
    user: {
      description: "The User",
      control: {
        type: "object",
      },
    },
    createdAt: {
      control: "date",
    },
    likes: {
      type: "number",
    },
    photo: {
      control: "file",
    },
  },
};

const Template = (args) => <Tweet {...args} />;

export const Default = Template.bind({});

Default.args = {
  content: "Texto del Tweet",
  user: { username: "Pedro" },
  likes: 20,
};

export const Alternate = Template.bind({});

Alternate.args = {
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim justo vel lectus condimentum, ac molestie erat ornare. Cras at commodo quam, vel mattis massa. Vivamus sodales porta odio, et pulvinar eros sollicitudin sit amet. Etiam eros lorem, sagittis nec lacus in, convallis placerat dui. Morbi venenatis laoreet eros. Vivamus quis diam justo",
  user: { username: "maria" },
  likes: 35000,
  createdAt: new Date(),
};
