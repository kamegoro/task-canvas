import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Checkbox from '.';

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
