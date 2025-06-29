import type { Meta, StoryObj } from '@storybook/nextjs';

import TextField from '.';

const meta = {
  component: TextField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
