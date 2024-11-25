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
  },
  {
    path: '/mapas/mapa2',
    name: 'Mapa2',
    component: () => import('../views/Mapa2.vue'), // lazy load
  },
  {
    path: '/mapas/mapa3',
    name: 'Mapa3',
    component: () => import('../views/Mapa3.vue'), // lazy load
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;