import { createRouter, createWebHistory } from 'vue-router';
import HomeLogin from '@/views/HomeLogin.vue';
import Dashboard from '@/views/Dashboard.vue';
import UserManagement from '@/views/UserManagement.vue';
import CreateUser from '@/views/CreateUser.vue';
import EditUser from '@/views/EditUser.vue'; // Importe o componente EditUser

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeLogin,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/usuarios',
      name: 'user-management',
      component: UserManagement,
      meta: { requiresAuth: true },
    },
    {
      path: '/usuarios/novo',
      name: 'create-user',
      component: CreateUser,
      meta: { requiresAuth: true },
    },
    {
      path: '/usuarios/:id/editar',
      name: 'edit-user',
      component: EditUser,
      meta: { requiresAuth: true },
      props: true, // Permite que o ID seja passado como prop
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
