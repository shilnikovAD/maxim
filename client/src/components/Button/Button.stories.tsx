import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Кнопка',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Кнопка',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Кнопка',
    variant: 'outline',
  },
};

export const Small: Story = {
  args: {
    children: 'Маленькая',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    children: 'Средняя',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    children: 'Большая',
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Неактивная',
    disabled: true,
  },
};
