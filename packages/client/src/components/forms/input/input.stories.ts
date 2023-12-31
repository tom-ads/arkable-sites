import type { Meta, StoryObj } from "@storybook/react";
import { FormInput } from ".";

const meta: Meta<typeof FormInput> = {
  title: "Components/Forms/FormInput",
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

export const Error: Story = {
  args: {
    isError: true,
  },
};

// Size

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};
