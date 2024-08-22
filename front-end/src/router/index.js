import { createRouter, createWebHistory } from 'vue-router';
import HomeLogin from '@/views/HomeLogin.vue';
import Dashboard from '@/views/Dashboard.vue';
import UserManagement from '@/views/UserManagement.vue';
import CreateUser from '@/views/CreateUser.vue';
import EditUser from '@/views/EditUser.vue';
import MunicipioManagement from '@/views/MunicipioManagement.vue';
import CreateMunicipio from '@/views/CreateMunicipio.vue';
import EditMunicipio from '@/views/EditMunicipio.vue'; 

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
      props: true,
    },
    {
      path: '/municipios',
      name: 'municipio-management',
      component: MunicipioManagement,
      meta: { requiresAuth: true },
    },
    {
      path: '/municipios/novo',
      name: 'create-municipio',
      component: CreateMunicipio,
      meta: { requiresAuth: true },
    },
    {
      path: '/municipios/:id/editar',
      name: 'edit-municipio',
      component: EditMunicipio,
      meta: { requiresAuth: true },
      props: true,
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