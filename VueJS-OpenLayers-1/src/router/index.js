import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'), // Lazy load
  },
  {
    path: '/mapas/mapa1',
    name: 'Mapa1',
    component: () => import('../views/Mapa1.vue'), // Lazy Load
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;