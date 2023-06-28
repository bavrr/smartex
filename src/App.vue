<template>
  <div class="task-page">
    <header class="header">
      <h1 class="header__title">{{ HEADER_TITLE }}</h1>
      <button class='header__action' @click="createTask">
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
.task-page {
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
}

.header__action {
  height: 40px;
  padding: 10px 5px;
  align-self: center;
}


</style>