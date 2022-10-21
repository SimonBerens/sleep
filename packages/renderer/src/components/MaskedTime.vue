<script lang="ts" setup>
import {defineEmits, defineProps} from 'vue';
import {padN} from '/@/pad';

const props = defineProps<{ hour: number, minute: number }>();

function formatTime() {
  return padN(props.hour, 2) + ':' + padN(props.minute, 2);
}

const emit = defineEmits<{ (e: 'time-update', hours: number, minutes: number): void }>();

function handleInputChange(e: Event) {
  const val = (e.currentTarget as any).value;
  if (val.length !== 5) return;
  const hours = parseInt(val.substring(0, 2));
  const minutes = parseInt(val.substring(3));
  if (isNaN(hours) || isNaN(minutes)) return;
  emit('time-update', hours, minutes);
}

</script>

<template>
  <input
    v-maska="'##:##'"
    class="w-[4.5rem] bg-white/[.15] text-white text-2xl"
    :value="formatTime()"
    @input="handleInputChange"
  >
</template>
