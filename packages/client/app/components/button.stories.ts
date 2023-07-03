import type { Meta, StoryObj } from "@storybook/react";
import Button from "./button";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Submit",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

// Intent

export const Primary: Story = {
  args: {
    intent: "primary",
  },
};

export const Secondary: Story = {
  args: {
    intent: "secondary",
  },
};

export const Outlined: Story = {
  args: {
    intent: "outlined",
  },
};

// Size

// State
