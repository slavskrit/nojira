import {
  createDraggable,
} from "@thisbeyond/solid-dnd";
import { createSignal, onMount, For, Show } from "solid-js";
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

const Task: Component<TaskModel> = (props) => {

  const draggable = createDraggable(props.id);

  return (
    <div use:draggable class="rounded overflow-hidden shadow-lg m-1" classList={{ "opacity-25": draggable.isActiveDraggable }}>
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