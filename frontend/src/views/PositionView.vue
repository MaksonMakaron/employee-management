<template>
  <div>
    <button @click="openPopup">Добавить</button>
    <Popup
      :isOpen="isOpen"
      :openPopup="openPopup"
      :closePopup="closePopup">
      <div>
        <p>Добавить</p>
        <input
          class="input"
          v-model="newPosition.name"
          type="text"
          maxlength="50"
          @input="error = ''"
          placeholder="Должность" />
        <p class="error">{{ error }}</p>
      </div>

      <button @click="addPosition">Добавить</button>
    </Popup>
    <TablePosition :positions="store.getters.getPositions" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import TablePosition from '@/components/TablePosition.vue';
import Popup from '@/components/Popup.vue';

const store = useStore();

const newPosition = ref({});
const error = ref('');
const isOpen = ref(false);

const openPopup = () => {
  isOpen.value = true;
};

const closePopup = () => {
  isOpen.value = false;
};

const addPosition = async () => {
  try {
    if (!newPosition.value.name) {
      error.value = 'Введите должность';
      return;
    }
    await store.dispatch('addPosition', newPosition.value);
    error.value = '';
    newPosition.value.name = '';
    closePopup();
  } catch (error) {
    console.error('Ошибка при добавлении должности:', error);
  }
};

onMounted(async () => {
  await store.dispatch('fetchPositions');
});
</script>
