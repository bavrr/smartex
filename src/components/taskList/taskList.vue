<template>
  <div class="task-list">
    <div class="task-list__empty" v-if="isEmpty">
      {{ EMPTY_TEXT }}
    </div>
    <div v-else>

      <div class="task-list__row">
        <div v-for="column in columns" :key="column.name" class="task-list__column">
          <div>{{ column.name }}</div>  
        </div>
      </div>

      <template v-for="task in taskList" :key="task.id">
        <div class="task-list__row">
          <div class="task-list__column">
            {{ task.id }}
          </div>

          <div class="task-list__column">
            <input v-model="task.name">
          </div>

          <div class="task-list__column">
            <ui-datepicker v-model="task.range" :disabled-dates="disabledDates" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import UiDatepicker from '../ui/datepicker/datepicker.vue'
import { computed, watch, ref, toRaw } from 'vue';

export default {
  name: 'TaskList',
  components: {
    UiDatepicker,
  },
  props: {
    modelValue: {
      type: Array,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup (props, {emit}) {
    /**
     * Альтернативные варианты для подхода ниже
     * 1) Самым простым вариантом было бы просто мутировать исходный массив, но в случае
     *  проблем было бы сложно понять где конкретно проблема.
     * 2) Использовать что-то на подобие useVModels или возможно defineModel, либо
     * писать самим через computed и оборачивать элементы массива этой оберткой, для того
     * чтобы изменения элементов массива тригели эмиты и все изменения корректно всплывали
     * и было легко найти место проблемы в ее случае.
     */
    const taskList = ref(structuredClone(toRaw(props.modelValue)));

    watch(() => props.modelValue, (newTaskList) => {
      taskList.value = structuredClone(toRaw(newTaskList));
    });

    watch(taskList, (changedArray) => {
      emit('update:modelValue', changedArray)
    }, {
      deep: true
    })

    const disabledDates = computed(() => {

      const dates = [];

      taskList.value.forEach((task) => {
        if (task.range.start === null || task.range.end === null) {
          return;
        }

        dates.push(task.range);
      })

      return dates;
    })

    const isEmpty = computed(() => props.modelValue.length === 0)

    const columns = [
      { name: 'id'},
      { name: 'Название занятия'},
      { name: 'Дата занятий'}
    ]
    
    const EMPTY_TEXT = 'Сейчас занятий нет, добавьте хотя бы одно занятие';

    return {
      EMPTY_TEXT,
      isEmpty,
      columns,
      taskList,
      disabledDates
    }
  }
}
</script>

<style>
.task-list__empty {
  font-size: 24px;
  display: flex;
  height: 600px;
  justify-content: center;
  align-items: center;
}

.task-list__row {
  margin: 20px 0;
  display: flex;
}

.task-list__column {
  width: 33%;
  text-align: center;
}

</style>