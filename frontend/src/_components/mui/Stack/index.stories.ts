import type { Meta, StoryObj } from '@storybook/nextjs';

import Stack from '.';

const meta = {
  component: Stack,
  tags: ['autodocs'],
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
