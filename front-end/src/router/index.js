import { createRouter, createWebHistory } from 'vue-router';
import HomeLogin from '@/views/HomeLogin.vue';
import RecoverPassword from '@/views/RecoverPassword.vue';
import VerifyCode from '@/views/VerifyCode.vue';
import Dashboard from '@/views/Dashboard.vue';
import UserManagement from '@/views/UserManagement.vue';
import CreateUser from '@/views/CreateUser.vue';
import EditUser from '@/views/EditUser.vue';
import MunicipioManagement from '@/views/MunicipioManagement.vue';
import CreateMunicipio from '@/views/CreateMunicipio.vue';
import EditMunicipio from '@/views/EditMunicipio.vue';
import LogradouroManagement from '@/views/LogradouroManagement.vue'
import CreateLogradouro from '@/views/CreateLogradouro.vue';
import EditLogradouro from '@/views/EditLogradouro.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import LogsCadastrais from '@/views/LogsCadastrais.vue';
import CreateFiscalizacao from '@/views/CreateFiscalizacao.vue';
import FiscalizacaoManagement from '@/views/FiscalizacaoManagement.vue';
import RelFiscalizacao from '@/views/RelFiscalizacoes.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeLogin,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = !!localStorage.getItem('authToken');
        if (isAuthenticated) {
          next('/dashboard');
        } else {
          next();
        }
      },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
    },
    {
      path: '/recover-password',
      name: 'recover-password',
      component: RecoverPassword,
    },
    {
      path: '/verify-code',
      name: 'verify-code',
      component: VerifyCode,
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
      path: '/fiscalizacao/novo',
      name: 'CreateFiscalizacao',
      component: CreateFiscalizacao
    },
    {
      path: '/fiscalizacoes',
      name: 'FiscalizacaoManagement',
      component: FiscalizacaoManagement
    },
    {
      path: '/logradouros',
      name: 'LogradouroManagement',
      component: LogradouroManagement,
    },
    {
      path: '/create-logradouro',
      name: 'CreateLogradouro',
      component: CreateLogradouro
    },
    {
      path: '/edit-logradouro/:id',
      name: 'EditLogradouro',
      component: EditLogradouro
    },
    {
      path: '/municipios/:id/editar',
      name: 'edit-municipio',
      component: EditMunicipio,
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: '/logs',
      name: 'Logs',
      component: LogsCadastrais,
    },
    {
      path: '/rel-fiscalizacao',
      name: 'RelFiscalizacao',
      component: RelFiscalizacao,
    }
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