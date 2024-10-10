import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
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
      path: '/AdminFocoDengue',
      name: 'AdminFocoDengue',
      component: () => import('@/views/AdminFocoDengue.vue'),
    },
    {
      path: '/RemoverFoco',
      name: 'RemoverFoco',
      component: () => import('@/views/RemoverFocos.vue'),
    },
    {
      path: '/monitoramento',
      name: 'monitoramento-management',
      component: () => import('@/views/MonitoramentoManagement.vue'),    
    },
    {
      path: '/prevention',
      name: 'PrevencaoDengue',
      component: () => import('@/views/PrevencaoDengue.vue'),
    },
    {
      path: '/HomeLogin',
      name: 'HomeLogin',
      component: () => import('@/views/HomeLogin.vue'),
    },
    {
      path: '/report',
      name: 'ReportDeuncia',
      component: () => import('@/views/ReportDeuncia.vue'),
    },
    {
      path: '/denuncias',
      name: 'denuncias',
      component: () => import('@/views/DenunciaManagement.vue'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/ResetPassword.vue'),
    },
    {
      path: '/recover-password',
      name: 'recover-password',
      component: () => import('@/views/RecoverPassword.vue'),
    },
    {
      path: '/verify-code',
      name: 'verify-code',
      component: () => import('@/views/VerifyCode.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/usuarios',
      name: 'user-management',
      component: () => import('@/views/UserManagement.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/usuarios/novo',
      name: 'create-user',
      component: () => import('@/views/CreateUser.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/usuarios/:id/editar',
      name: 'edit-user',
      component: () => import('@/views/EditUser.vue'),
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: '/municipios',
      name: 'municipio-management',
      component: () => import('@/views/MunicipioManagement.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/municipios/novo',
      name: 'create-municipio',
      component: () => import('@/views/CreateMunicipio.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/fiscalizacao/novo',
      name: 'CreateFiscalizacao',
      component: () => import('@/views/CreateFiscalizacao.vue'),
    },
    {
      path: '/fiscalizacoes',
      name: 'FiscalizacaoManagement',
      component: () => import('@/views/FiscalizacaoManagement.vue'),

    },
    {
      path: '/logradouros',
      name: 'LogradouroManagement',
      component: () => import('@/views/LogradouroManagement.vue'),
    },
    {
      path: '/create-logradouro',
      name: 'CreateLogradouro',
      component: () => import('@/views/CreateLogradouro.vue'),
    },
    {
      path: '/logradouros/:id/editar',
      name: 'EditLogradouro',
      component: () => import('@/views/EditLogradouro.vue'),
    },
    {
      path: '/municipios/:id/editar',
      name: 'edit-municipio',
      component: () => import('@/views/EditMunicipio.vue'),
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: '/logs',
      name: 'Logs',
      component: () => import('@/views/LogsCadastrais.vue'),
    },
    {
      path: '/rel-fiscalizacao',
      name: 'RelFiscalizacao',
      component: () => import('@/views/RelFiscalizacoes.vue')
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