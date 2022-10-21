<script lang="ts" setup>
import {ipcRenderer} from '#preload';

function sendMinimizeSignal() {
  ipcRenderer.send('minimize-clicked');
}
</script>

<template>
  <button
    class="absolute right-0 h-7 w-7"
    @click="sendMinimizeSignal"
  >
    <img
      src="./../minimize.svg"
      class="h-full w-full"
      alt="minimize"
    />
  </button>
</template>
