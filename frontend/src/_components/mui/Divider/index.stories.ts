import type { Meta, StoryObj } from '@storybook/nextjs';

import Divider from '.';

const meta = {
  component: Divider,
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
