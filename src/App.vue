<template>
  <div class="task-page">
    <header class="task-page__header">
      <h1>{{ HEADER_TITLE }}</h1>
      <button class='task-page__action' @click="createTask">
        {{ HEADER_ACTION_TEXT }}
      </button>
    </header>

    <main>
      <task-list v-model="taskList" @update:modelValue="saveTasks"/>
    </main>

  </div>
</template>

<script>
import TaskList from './components/taskList/taskList.vue';
import { ref } from 'vue';
import { taskApi } from './api/task/task.api.js'

export default {
  components: {
    TaskList
  },
  setup() {
    const taskList = ref([]);

    const createTask = () => {
      const newTask = taskApi.createTask();

      taskList.value.push(newTask);

      saveTasks();
    }

    const saveTasks = () => {
      taskApi.saveTasks(taskList.value)
    }

    // init logic

    const init = () => {
      taskList.value = taskApi.getTasks();
    }

    init();

    // text consts

    const HEADER_TITLE = 'Список занятий';
    const HEADER_ACTION_TEXT = 'Добавить занятие';

    return {
      createTask,
      saveTasks,
      taskList,
      HEADER_ACTION_TEXT,
      HEADER_TITLE
    }
  },
}
</script>

<style>
* {
  box-sizing:content-box;
}

body, html {
  margin: 0;
}

:root {
  background-color: #1f2937;

  --border-color: #6b7280;
  --text-color: #fff;
}

.task-page {
  box-sizing: content-box;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
  min-height: 100vh;
}

.task-page__header {
  display: flex;
  justify-content: space-between;
  color: var(--text-color);
  padding-bottom: 5px;
  border-bottom: 1px solid var(--border-color);
}

.task-page__action {
  height: 20px;
  padding: 10px 5px;
  align-self: center;
  background-color: #3b82f6;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-color);
  cursor: pointer;
}

.task-page__action:hover {
  background-color: #2563eb;
}
</style>