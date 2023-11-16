<template>
  <div class="cards">
    <Popup
      :isOpen="isOpen"
      :openPopup="openPopup"
      :closePopup="closePopup">
      <div>
        <p>Редактировать ID: {{ currentEmployee.id }}</p>
        <input
          class="input"
          v-model="currentEmployee.lastName"
          type="text"
          maxlength="50"
          @input="error = ''"
          placeholder="Фамилия" />
        <input
          class="input"
          v-model="currentEmployee.firstName"
          type="text"
          maxlength="50"
          @input="error = ''"
          placeholder="Имя" />
        <input
          class="input"
          v-model="currentEmployee.patronymic"
          type="text"
          maxlength="50"
          @input="error = ''"
          placeholder="Отчество" />
      </div>
      <div>
        <input
          class="input"
          v-model="currentEmployee.dateOfEmployment"
          type="date"
          maxlength="50"
          @input="error = ''"
          placeholder="Дата принятия на работу" />
        <select
          class="input"
          v-model="currentEmployee.idPost">
          <option
            v-for="position in store.getters.getPositions"
            :value="position.id">
            {{ position.name }}
          </option>
        </select>
      </div>
      <p class="error">{{ error }}</p>
      <button @click="saveEmployee">Сохранить</button>
    </Popup>
    <div class="cards-employees">
      <div
        class="card"
        v-for="employee in props.employees">
        <p><strong>ID:</strong> {{ employee.id }}</p>
        <p><strong>ФИО:</strong> {{ getFullName(employee) }}</p>
        <p><strong>Должность:</strong> {{ getPositionName(employee.idPost) }}</p>
        <p><strong>Дата принятия:</strong> {{ formatDate(employee.dateOfEmployment) }}</p>
        <button @click="editEmployee(employee)">Редактировать</button>
        <button @click="deleteEmployee(employee.id)">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import Popup from '@/components/Popup.vue';
import { defineProps } from 'vue';
import { validateEmployee } from '@/helpers/employeeHelper';

const props = defineProps(['employees', 'positions']);
const store = useStore();

const currentEmployee = ref({});
const error = ref('');
const isOpen = ref(false);

const openPopup = () => {
  isOpen.value = true;
};

const closePopup = () => {
  isOpen.value = false;
};

const editEmployee = (employee) => {
  currentEmployee.value = { ...employee };
  openPopup();
};

const saveEmployee = async () => {
  try {
    error.value = validateEmployee(currentEmployee.value);
    if (error.value) {
      return;
    }
    await store.dispatch('editEmployee', currentEmployee.value);
    error.value = '';
    currentEmployee.value = {};
    closePopup();
  } catch (error) {
    console.error('Ошибка при добавлении сотрудника:', error);
  }
};

const deleteEmployee = async (id) => {
  try {
    await store.dispatch('deleteEmployee', id);
  } catch (error) {
    console.error('Ошибка при удалении сотрудника:', error);
  }
};

const getFullName = (employee) => {
  return `${employee.lastName} ${employee.firstName} ${employee.patronymic || ''}`;
};

const getPositionName = (idPost) => {
  const position = props.positions.find((p) => p.id === idPost);
  return position ? position.name : 'Должность не найдена';
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
</script>

<style scoped>
.cards-employees {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.cards {
  margin: 10px;
}

.card {
  width: calc(33.33% - 20px);
  border: 1px solid #efefef;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

card:hover {
  border-color: #007bff;
}

p {
  margin: 0;
  font-size: 14px;
}
</style>
