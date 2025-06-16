import type { Meta, StoryObj } from '@storybook/react';

import MenuItem from '.';

const meta = {
  component: MenuItem,
  tags: ['autodocs'],
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
