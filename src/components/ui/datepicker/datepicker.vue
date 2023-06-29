<template>
  <DatePicker class="datepicker" v-model.range="dateWrapper" :disabled-dates="disabledDatesForCurrentDatepicker">
    <template #default="{ togglePopover }">
      <div class="datepicker__selected-dates" v-if="isSelectedDateRange">
        <span>{{ `${formatDate(dateWrapper.start)} — ${formatDate(dateWrapper.end)}` }}</span>
      </div>
      <button
        class="datepicker__action"
        @click="togglePopover"
      >
        {{ buttonText }}
      </button>
    </template>
  </DatePicker>
</template>

<script>
import 'v-calendar/style.css';
import { DatePicker } from 'v-calendar';
import { computed } from 'vue';


export default {
  name: 'UiDatepicker',
  components: {
    DatePicker
  },
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    disabledDates: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const dateWrapper = computed({
      get() {
        return props.modelValue;
      }, 
      set(newDate) {
        emit('update:modelValue', newDate)
      }
    });

    const disabledDatesForCurrentDatepicker = computed(() => {
       if (dateWrapper.value.start === null || dateWrapper.value.end === null) {
        return props.disabledDates;
       }

       const dateRangeIndex =  props.disabledDates.findIndex((date) => date.end === dateWrapper.value.end && date.start === dateWrapper.value.start);

       if (dateRangeIndex === -1) {
        return props.disabledDates; 
       }

       const shallowCopy = [...props.disabledDates];
       shallowCopy.splice(dateRangeIndex, 1);

       return shallowCopy;
    })

    const isSelectedDateRange = computed(() => {
      return dateWrapper.value.start !== null && dateWrapper.value.end !== null;
    })

    const buttonText = computed(() => {
      return isSelectedDateRange.value ? 'Изменить дату занятия' : 'Выбрать дату занятия';
    })

    const formatDate = (date) => {
      let dateCopy = date;
      
      if (date instanceof Date === false) {
        dateCopy = new Date(date);
      }

      return `${dateCopy.getDate()}/${dateCopy.getMonth() + 1}/${dateCopy.getFullYear()}`
    }

    return {
      dateWrapper,
      disabledDatesForCurrentDatepicker,
      isSelectedDateRange,
      buttonText,
      formatDate
    }
  }
}
</script>

<style>
.datepicker__selected-dates {
  margin-bottom: 8px;
}

.datepicker__action {
  height: 20px;
  padding: 10px 5px;
  align-self: center;
  background-color: #3b82f6;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-color);
  cursor: pointer;
}

.datepicker__action:hover {
  background-color: #2563eb;
}
</style>
