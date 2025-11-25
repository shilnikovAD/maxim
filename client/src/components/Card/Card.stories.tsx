import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hoverable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '24px', minWidth: '200px' }}>
        <h3>Заголовок карточки</h3>
        <p>Содержимое карточки с текстом</p>
      </div>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <div style={{ padding: '24px', minWidth: '200px' }}>
        <h3>Кликабельная карточка</h3>
        <p>Наведите курсор для эффекта</p>
      </div>
    ),
  },
};

export const WithImage: Story = {
  args: {
    children: (
      <div>
        <img
          src="https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300"
          alt="Пример"
          style={{ width: '300px', height: '200px', objectFit: 'cover' }}
        />
        <div style={{ padding: '16px' }}>
          <h3>Карточка с изображением</h3>
          <p>Описание карточки</p>
        </div>
      </div>
    ),
    hoverable: true,
  },
};
