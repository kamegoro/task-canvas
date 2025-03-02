import React, { FC, useState } from 'react';

import Script from 'next/script';

import { createComponent } from '@lit/react';

type TaskProgressProps = {
  allCount: number;
  currentCount: number;
};

const TaskProgress: FC<TaskProgressProps> = ({ allCount, currentCount }) => {
  const [TaskProgressComponent, setTaskProgressComponent] = useState<FC<TaskProgressProps> | null>(
    null,
  );

  const handleScriptLoad = () => {
    const TaskProgressElement = customElements.get('task-progress');
    if (TaskProgressElement) {
      const Component = createComponent({
        react: React,
        tagName: 'task-progress',
        elementClass: TaskProgressElement,
      });
      setTaskProgressComponent(() => Component);
    }
  };

  return (
    <>
      <Script
        src="http://localhost:11000/task-progress.js"
        type="module"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      {TaskProgressComponent && (
        <TaskProgressComponent
          allCount={allCount}
          currentCount={currentCount}
        />
      )}
    </>
  );
};

export default TaskProgress;
