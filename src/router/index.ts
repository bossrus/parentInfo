import { createRouter, createWebHistory } from 'vue-router';
import forms from '@/components/pages/form.vue';
import preview from '@/components/pages/preview.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: forms,
    },
    {
      path: '/preview',
      name: 'preview',
      component: preview,
    },
  ],
});

export default router;
