const TASKS_KEY = 'tasks';

class TaskApi {

  constructor() {

  };

  getTasks() {
    const savedTasksJSON = localStorage.getItem(TASKS_KEY);

    if (!savedTasksJSON) {
      return []
    }

    const parsedTasks = JSON.parse(savedTasksJSON);

    if (!Array.isArray(parsedTasks)) {
      return []
    }

    return parsedTasks;
  };

  createTask() {
    const newTask = {
      id: new Date().getTime(),
      name: '',
      range: {
        start: null,
        end: null,
      }
    }

    return newTask;
  }

  saveTasks(taskList) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(taskList));
  }
}

export const taskApi = new TaskApi();