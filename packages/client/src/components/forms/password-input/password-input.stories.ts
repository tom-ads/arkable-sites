import type { Meta, StoryObj } from "@storybook/react";
import { FormPasswordInput } from ".";

const meta: Meta<typeof FormPasswordInput> = {
  title: "Components/Forms/PasswordInput",
  component: FormPasswordInput,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter name",
  },
};

export default meta;

type Story = StoryObj<typeof FormPasswordInput>;

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
