<script lang="ts" setup>
import {defineProps} from 'vue';

defineProps<{ skipped: boolean; }>();
</script>

<template>
  <button
    :disabled="skipped"
    class="w-[9rem] h-[3.75rem] bg-[#761111] ml-auto"
  >
    <span class="flex flex-row h-full items-center">
      <span class="text-[#F78574] mx-5 mt-[1px] text-2xl">SKIP</span>
      <img
        src="./../skip.svg"
        class="h-[1.125rem]"
        alt="Skip"
      >
    </span>
  </button>
</template>
