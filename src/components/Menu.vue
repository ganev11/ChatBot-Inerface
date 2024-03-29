<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <div class="background-menu">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style scoped>
.background-menu {
  color: white;
  background-color: #171717;
  height: 100vh;
  width: 238px;
  padding: 0 12px;
  /* border: 1px solid #333; */
}
</style>
