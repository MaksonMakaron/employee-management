import { createRouter, createWebHistory } from 'vue-router';
import PositionView from '../views/PositionView.vue';
import EmployeeView from '../views/EmployeeView.vue';

const routes = [
  {
    path: '/',
    name: 'employee',
    component: EmployeeView,
  },
  {
    path: '/positions',
    name: 'positions',
    component: PositionView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
