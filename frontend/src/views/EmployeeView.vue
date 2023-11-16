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
          v-model="newEmployee.lastName"
          type="text"
          maxlength="50"
          @input="error = ''"
          placeholder="Фамилия" />
        <input
          class="input"
          v-model="newEmployee.firstName"
          type="text"
          maxlength="50"
          @input="error = ''"
          placeholder="Имя" />
        <input
          class="input"
          v-model="newEmployee.patronymic"
          type="text"
          maxlength="50"
          @input="error = ''"
          placeholder="Отчество" />
      </div>
      <div>
        <input
          class="input"
          v-model="newEmployee.dateOfEmployment"
          type="date"
          maxlength="50"
          @input="error = ''"
          placeholder="Дата принятия на работу" />
        <select
          class="input"
          v-model="newEmployee.idPost">
          <option
            v-for="position in store.getters.getPositions"
            :value="position.id">
            {{ position.name }}
          </option>
        </select>
      </div>
      <p class="error">{{ error }}</p>

      <button @click="addEmployee">Добавить</button>
    </Popup>
    <CardEmployee
      :positions="store.getters.getPositions"
      :employees="store.getters.getEmployees" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import CardEmployee from '@/components/CardEmployee.vue';
import Popup from '@/components/Popup.vue';
import { validateEmployee } from '@/helpers/employeeHelper';

const store = useStore();

const newEmployee = ref({});
const error = ref('');
const isOpen = ref(false);

const openPopup = () => {
  isOpen.value = true;
};

const closePopup = () => {
  isOpen.value = false;
};

const addEmployee = async () => {
  try {
    error.value = validateEmployee(newEmployee.value);
    if (error.value) {
      return;
    }
    await store.dispatch('addEmployee', newEmployee.value);
    error.value = '';
    newEmployee.value = {};
    closePopup();
  } catch (error) {
    console.error('Ошибка при добавлении должности:', error);
  }
};

const fetchEmployees = async () => {
  try {
    await store.dispatch('fetchEmployees');
  } catch (error) {
    console.error('Ошибка при загрузке сотрудников:', error);
  }
};

const fetchPositions = async () => {
  try {
    await store.dispatch('fetchPositions');
  } catch (error) {
    console.error('Ошибка при загрузке должностей:', error);
  }
};

onMounted(() => {
  fetchPositions();
  fetchEmployees();
});
</script>

<style scoped>
.cards-employees {
  display: flex;
  flex-wrap: wrap;
}

.card {
  width: 33%;
  border: 1px solid #efefef;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
}

.card button {
  margin-top: 10px;
}
</style>
