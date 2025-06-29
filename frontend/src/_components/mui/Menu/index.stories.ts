import type { Meta, StoryObj } from '@storybook/react';

import Menu from '.';

const meta = {
  component: Menu,
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    open: true,
    anchorEl: document.createElement('div'),
    children: 'Menu Item',
  },
};
