import type { Meta, StoryObj } from "@storybook/react";
import FormPasswordInput from "../password-input";
import FormInput from "../input";

const meta: Meta<typeof FormInput> = {
  title: "Components/Forms/PasswordInput",
  component: FormPasswordInput,
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