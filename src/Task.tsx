import type { Component } from 'solid-js';

export enum TaskStatus {
  DONE,
  ACTIVE,
}

export type TaskModel = {
  name: string;
  description: string;
  status: TaskStatus;
};

const Task: Component<TaskModel> = (props) => {

  return (
    <div class="rounded overflow-hidden shadow-lg">
      <div class="px-2 py-4">
        <div class="font-bold text-xl mb-2">{props.name}</div>
        <p class="text-gray-700 text-base">{props.description}</p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{props.status}</span>
      </div>
    </div>
  );
};

export default Task;