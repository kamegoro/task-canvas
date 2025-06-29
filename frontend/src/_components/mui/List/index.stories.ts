import type { Meta, StoryObj } from '@storybook/nextjs';

import List from '.';

const meta = {
  component: List,
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
