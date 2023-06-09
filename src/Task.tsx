import {
  createDraggable,
} from "@thisbeyond/solid-dnd";
import type { Component } from 'solid-js';

export enum TaskStatus {
  TODO,
  ACTIVE,
  DONE,
}

export type TaskModel = {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;
};

type TaskProps = TaskModel & {
  update: (TaskModel) => () => void;
}

const Task: Component<TaskProps> = (props) => {
  const draggable = createDraggable(props.id);

  return (
    <div use:draggable class="my-1 mx-2 border-dotted border-2 border-sky-500 cursor-pointer font-mono rounded-lg overflow-hidden">
      <div class="px-2 py-4">
        <div class="font-bold text-xl mb-2"
          contentEditable
          onblur={(e) => {
            const task = { ...props };
            task.name = e.currentTarget.innerText;
            props.update(task);
          }}>{props.name ? props.name : '________'}</div>
        <p class="text-gray-700 text-base"
          contentEditable
          onblur={(e) => {
            const task = { ...props };
            task.description = e.currentTarget.innerText;
            props.update(task);
          }}>{props.description ? props.description : '________'}</p>
      </div>
      {/* <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{props.status}</span>
      </div> */}
    </div>
  );
};

export default Task;