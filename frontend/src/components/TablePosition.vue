<template>
  <div>
    <Popup
      :isOpen="isOpen"
      :openPopup="openPopup"
      :closePopup="closePopup">
      <p>Редактировать ID: {{ currentPosition.id }}</p>
      <input
        class="input"
        v-model="currentPosition.name"
        type="text"
        maxlength="50"
        @input="error = ''"
        placeholder="Должность" />
      <p class="error">{{ error }}</p>
      <button @click="savePosition">Сохранить</button>
    </Popup>
    <br />
    <table class="table__positions">
      <tr>
        <th>ID</th>
        <th>Должность</th>
        <th>Редактировать</th>
        <th>Удалить</th>
      </tr>
      <tbody>
        <tr
          v-for="position in props.positions"
          :key="position.id">
          <td>{{ position.id }}</td>
          <td>{{ position.name }}</td>
          <td><button @click="editPosition(position)">Редактировать</button></td>
          <td><button @click="deletePosition(position.id)">Удалить</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import Popup from '@/components/Popup.vue';

const store = useStore();
const props = defineProps(['positions']);

const currentPosition = ref({});
const error = ref('');
const isOpen = ref(false);

const openPopup = () => {
  isOpen.value = true;
};

const closePopup = () => {
  isOpen.value = false;
};

const editPosition = (position) => {
  currentPosition.value = { ...position };
  openPopup();
};

const savePosition = async () => {
  try {
    if (!currentPosition.value.name) {
      error.value = 'Введите должность';
      return;
    }
    await store.dispatch('editPosition', currentPosition.value);
    error.value = '';
    currentPosition.value = {};
    closePopup();
  } catch (error) {
    console.error('Ошибка при добавлении должности:', error);
  }
};

const deletePosition = async (id) => {
  try {
    await store.dispatch('deletePosition', id);
  } catch (error) {
    console.error('Ошибка при удалении должности:', error);
  }
};
</script>

<style scoped lang="scss">
.table__positions {
  width: 90%;
  border-collapse: collapse;
  margin-top: 20px;
  margin: 0 auto;
}

.table__positions th,
.table__positions td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table__positions th {
  background-color: #f2f2f2;
}

.table__positions tr:hover {
  background-color: #f5f5f5;
}
</style>
