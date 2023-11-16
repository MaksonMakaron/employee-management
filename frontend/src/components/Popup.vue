<template>
  <div
    v-if="isOpen"
    class="popup-overlay"
    @click="closePopup">
    <div
      class="popup-content"
      @click.stop>
      <button
        @click="closePopup"
        class="close-button">
        Закрыть
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const { isOpen, openPopup, closePopup } = defineProps(['isOpen', 'openPopup', 'closePopup']);
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 18px;
  color: #333;
}
</style>
