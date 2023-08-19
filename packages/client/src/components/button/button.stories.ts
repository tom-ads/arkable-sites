import type { Meta, StoryObj } from "@storybook/react";
import Button from ".";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Continue",
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

export const Small: Story = {
  args: {
    intent: "primary",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    intent: "primary",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    intent: "primary",
    size: "large",
  },
};

// Danger

export const PrimaryDanger: Story = {
  args: {
    intent: "primary",
    danger: true,
  },
};

export const OutlinedDanger: Story = {
  args: {
    intent: "outlined",
    danger: true,
  },
};

// Disabled

export const PrimaryDisabled: Story = {
  args: {
    intent: "primary",
    disabled: true,
  },
};

export const OutlinedDisabled: Story = {
  args: {
    intent: "outlined",
    disabled: true,
  },
};
