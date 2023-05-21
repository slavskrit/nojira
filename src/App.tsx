import {
  DragDropProvider,
  DragDropSensors,
  createDroppable,
  closestCenter,
} from "@thisbeyond/solid-dnd";
import { createSignal, onMount, For,createResource, Show, createEffect } from "solid-js";
import type { Component } from 'solid-js';
import { createLocalStore, getTokenFromLocalStorage, removeIndex } from "./utils";
import { TaskModel, TaskStatus } from './Task';
import Task from "./Task";

const Droppable = (props) => {
  const droppable = createDroppable(props.status);
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
  const [updated, setUpdate] = createSignal(null);
  const [activeItem, setActiveItem] = createSignal(null);
  // const [todos, setTodos] = createLocalStore<TodoItem[]>("todos", []);
  // const [user] = createResource(userId, fetchUser);

  createEffect(() => {
    let token = getTokenFromLocalStorage();
    console.log(token);
  });

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
      const taskIndex = tasks().findIndex(x => x.id === taskId);
      if (taskIndex !== -1) {
        const t = tasks().splice(taskIndex, 1);
        t[0].status = boardId;
        setTasks([...tasks(), t[0]]);
      }
    }
  };

  createEffect(() => {
    const updatedTask = updated();
    if (updatedTask) {
      console.log(`Task ${updatedTask.id} is updated`);
    }
  });

  return (
    <div class="w-screen h-screen">
      <DragDropProvider
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        collisionDetector={closestCenter}>
        <DragDropSensors />
        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          <Droppable status={TaskStatus.TODO}>
          <For each={tasks().filter(x => x.status == TaskStatus.TODO)} fallback={<p></p>}>{task =>
              <Task {...task} update={setUpdate} />
            }</For>
        </Droppable>
        <Droppable status={TaskStatus.ACTIVE}>
        <For each={tasks().filter(x => x.status == TaskStatus.ACTIVE)} fallback={<p></p>}>{task =>
            <Task {...task} update={setUpdate}/>
          }</For>
        </Droppable>
        <Droppable status={TaskStatus.DONE}>
          <For each={tasks().filter(x => x.status == TaskStatus.DONE)} fallback={<p></p>}>{task =>
            <Task {...task} update={setUpdate}/>
          }</For>
        </Droppable>
      </div>
      </DragDropProvider>
    </div>  
  );
};

export default App;
