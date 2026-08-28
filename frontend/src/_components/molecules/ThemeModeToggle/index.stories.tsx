import type { Meta, StoryObj } from '@storybook/nextjs';

import { ThemeModeProvider } from '@/_components/contexts/ThemeModeContext';
import ThemeModeToggle from '.';

const meta = {
  component: ThemeModeToggle,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeModeProvider>
        <Story />
      </ThemeModeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
