import { createSignal, onMount, For } from "solid-js";
import type { Component } from 'solid-js';

import { TaskModel, TaskStatus } from "./Task";
import Task from "./Task";

const App: Component = () => {

  const [tasks, setTasks] = createSignal<Array<TaskModel>>([]);

  onMount(async () => {
    setTasks([
      {name: "Task 1", description: "Description 1", status: TaskStatus.ACTIVE},
      {name: "Task 2", description: "Description 2", status: TaskStatus.DONE},
      {name: "Task 3", description: "Description 3", status: TaskStatus.DONE},
    ])
  });

  return (
    <div class="w-screen">
      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        <div>
          <For each={tasks()} fallback={<p>Loading...</p>}>{task =>
            <Task {...task} />
          }</For>
        </div>
        <div>
        <For each={tasks()} fallback={<p>Loading...</p>}>{task =>
            <Task {...task} />
          }</For>
        </div>
        <div><For each={tasks()} fallback={<p>Loading...</p>}>{task =>
            <Task {...task} />
          }</For></div>
      </div>
    </div>  
  );
};

export default App;