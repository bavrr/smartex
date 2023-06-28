<template>
  <DatePicker v-model.range="dateWrapper" :disabled-dates="disabledDatesForCurrentDatepicker" />
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

    return {
      dateWrapper,
      disabledDatesForCurrentDatepicker
    }
  }
}
</script>
