import type { Meta, StoryObj } from '@storybook/nextjs';

import ListItem from '.';

const meta = {
  component: ListItem,
  tags: ['autodocs'],
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
