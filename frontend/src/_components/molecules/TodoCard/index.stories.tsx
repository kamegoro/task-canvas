import React, { useState } from 'react';

import type { Meta, StoryFn } from '@storybook/nextjs';

import TodoCard, { TodoCardProps } from '.';

const meta = {
  component: TodoCard,
  tags: ['autodocs'],
} satisfies Meta<typeof TodoCard>;

export default meta;

export const Default: StoryFn<typeof TodoCard> = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange: TodoCardProps['onChange'] = (event) => {
    const newValue = event.target.checked;

    setIsChecked(newValue);
  };

  return (
    <div
      style={{
        backgroundColor: 'gray',
        padding: '16px',
      }}
    >
      <TodoCard
        text={'test'}
        checked={isChecked}
        onChange={handleChange}
      />
    </div>
  );
};
