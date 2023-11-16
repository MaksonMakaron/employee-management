import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: () => ({
    employees: [],
    positions: [],
  }),
  getters: {
    getEmployees(state) {
      return state.employees;
    },
    getPositions(state) {
      return state.positions;
    },
  },
  mutations: {
    setEmployees(state, employees) {
      state.employees = employees;
    },
    setPositions(state, positions) {
      state.positions = positions;
    },
  },
  actions: {
    async fetchEmployees({ state, commit }) {
      try {
        await axios.get('http://localhost:3000/api/employees', {}).then((response) => {
          commit('setEmployees', response.data);
        });
      } catch (error) {}
    },
    async addEmployee({ state, commit }, employee) {
      try {
        await axios.post('http://localhost:3000/api/employees', { employee }).then((response) => {
          this.dispatch('fetchEmployees');
        });
      } catch (error) {}
    },
    async editEmployee({ state, commit }, employee) {
      try {
        const { id, ...employeeWithoutId } = employee;
        await axios.put('http://localhost:3000/api/employees/' + id, { employee: employeeWithoutId }).then((response) => {
          this.dispatch('fetchEmployees');
        });
      } catch (error) {}
    },
    async deleteEmployee({ state, commit }, id) {
      try {
        await axios.delete('http://localhost:3000/api/employees/' + id, {}).then((response) => {
          this.dispatch('fetchEmployees');
        });
      } catch (error) {}
    },
    async fetchPositions({ state, commit }) {
      try {
        await axios.get('http://localhost:3000/api/positions', {}).then((response) => {
          commit('setPositions', response.data);
        });
      } catch (error) {}
    },
    async addPosition({ state, commit }, position) {
      try {
        await axios.post('http://localhost:3000/api/positions/', { position }).then((response) => {
          this.dispatch('fetchPositions');
        });
      } catch (error) {}
    },
    async editPosition({ state, commit }, position) {
      try {
        const { id, ...positionWithoutId } = position;
        await axios.put('http://localhost:3000/api/positions/' + id, { position: positionWithoutId }).then((response) => {
          this.dispatch('fetchPositions');
        });
      } catch (error) {}
    },
    async deletePosition({ state, commit }, id) {
      try {
        await axios.delete('http://localhost:3000/api/positions/' + id, {}).then((response) => {
          this.dispatch('fetchPositions');
        });
      } catch (error) {}
    },
  },
  modules: {},
});
