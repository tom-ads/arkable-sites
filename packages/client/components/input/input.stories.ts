import type { Meta, StoryObj } from "@storybook/react";
import FormInput from "./input";

const meta: Meta<typeof FormInput> = {
  title: "Example/FormInput",
  component: FormInput,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter name",
  },
};

export default meta;

type Story = StoryObj<typeof FormInput>;

// State

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Danger: Story = {
  args: {
    danger: true,
  },
};

// Size

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};
