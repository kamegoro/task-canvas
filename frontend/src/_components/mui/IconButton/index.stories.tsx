import React from 'react';

import type { Meta, StoryFn } from '@storybook/nextjs';

import EditIcon from '../EditIcon';

import IconButton from '.';

const meta = {
  component: IconButton,
  tags: ['autodocs'],
} satisfies Meta<typeof IconButton>;

export default meta;

export const Primary: StoryFn = () => {
  return (
    <IconButton>
      <EditIcon />
    </IconButton>
  );
};
