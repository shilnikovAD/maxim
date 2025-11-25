import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Введите текст...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Значение',
    placeholder: 'Введите текст...',
  },
};

export const Search: Story = {
  args: {
    value: '',
    placeholder: 'Поиск...',
    type: 'search',
  },
};

export const Password: Story = {
  args: {
    value: 'secretpassword',
    placeholder: 'Пароль',
    type: 'password',
  },
};

export const Disabled: Story = {
  args: {
    value: 'Неактивное поле',
    disabled: true,
  },
};
