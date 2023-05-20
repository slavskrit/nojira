import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  createDraggable,
  SortableProvider,
  createDroppable,
  DragDropDebugger,
  closestCenter,
} from "@thisbeyond/solid-dnd";
import { createSignal, onMount, For, Show } from "solid-js";
import type { Component } from 'solid-js';

import { TaskModel, TaskStatus } from './Task';
import Task from "./Task";

const Droppable = (props) => {
  const droppable = createDroppable(props.id);
  return (
    <div
      use:droppable
      class="droppable"
      classList={{ "!droppable-accept": droppable.isActiveDroppable }}
    >
      {props.children}
    </div>
  );
};


const App: Component = () => {
  const [tasks, setTasks] = createSignal<Array<TaskModel>>([]);
  const [activeItem, setActiveItem] = createSignal(null);

  onMount(async () => {
    setTasks([
      {id: 1, name: "Task 1 TODO", description: "Description 1", status: TaskStatus.TODO},
      {id: 2, name: "Task 2 ACTIVE", description: "Description 2", status: TaskStatus.ACTIVE},
      {id: 3, name: "Task 3 DONE", description: "Description 3", status: TaskStatus.DONE},
    ])
  });

  const onDragStart = ({ draggable }) => setActiveItem(draggable.id);

  const onDragEnd = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const taskId = draggable.id;
      const boardId = droppable.id;
      const tasksToBeUpdated = tasks();
      const task = tasksToBeUpdated.splice(tasks().findIndex(x => x.id == taskId), 1)[0];
      task.status = boardId;
      console.log(task);
      tasksToBeUpdated.push(task);
      console.log(tasksToBeUpdated);

      setTasks(tasksToBeUpdated);
    }
  };

  return (
    <div class="w-screen h-screen">
      <DragDropProvider
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        collisionDetector={closestCenter}>
      <DragDropDebugger />
      <DragDropSensors />
      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          <Droppable id={1}>
          <For each={tasks().filter(x => x.status == TaskStatus.TODO)} fallback={<p>Loading...</p>}>{task =>
            <Task {...task} />
          }</For>
        </Droppable>
        <Droppable id={2}>
        <For each={tasks().filter(x => x.status == TaskStatus.ACTIVE)} fallback={<p>Loading...</p>}>{task =>
            <Task {...task} />
          }</For>
        </Droppable>
        <Droppable id={3}>
          <For each={tasks().filter(x => x.status == TaskStatus.DONE)} fallback={<p>Loading...</p>}>{task =>
            <Task {...task} />
          }</For>
        </Droppable>
      </div>
      </DragDropProvider>
    </div>  
  );
};

export default App;
