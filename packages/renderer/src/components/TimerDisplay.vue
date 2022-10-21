<script lang="ts" setup>
import {padN} from '/@/pad';
import {defineProps} from 'vue';

const props = defineProps<{ minutes: number }>();

function formatTime() {
  let totalMinutes = props.minutes.valueOf();
  const hours = Math.floor(totalMinutes / 60);
  totalMinutes -= hours * 60;
  const minutes = Math.floor(totalMinutes);
  totalMinutes -= minutes;
  const seconds = totalMinutes * 60;
  return `${padN(hours, 2)}:${padN(minutes, 2)}:${padN(seconds.toFixed(2), 5)}`;
}
</script>


<template>
  <div class="text-[#E6E6E6] text-center text-7xl">
    {{ formatTime() }}
  </div>
</template>
