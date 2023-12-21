import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'loginHome',
    component: () => import(/* webpackChunkName: "login" */ '../views/user/LoginView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/user/LoginView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/UsuarioView.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/ListUsersView.vue'),
  },
  {
    path: '/editUser/:id',
    name: 'editUser',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/EditUsuarioView.vue'),
  },
  {
    path: '/mycad',
    name: 'cadastro',
    component: () => import(/* webpackChunkName: "home" */ '../views/user/MyCadastroView.vue'), 
  },
  {
    path: '/home',
    name: 'home',
    component:  () => import(/* webpackChunkName: "about" */ '../views/general/HomeView.vue')
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: () => import(/* webpackChunkName: "user" */ '../views/produto/ListProdutosView.vue'),
  },
  {
    path: '/lotes',
    name: 'lotes',
    component: () => import(/* webpackChunkName: "user" */ '../views/lote/ListLotesView.vue'),
  },
  {
    path: '/revalidas',
    name: 'revalidas',
    component: () => import(/* webpackChunkName: "user" */ '../views/revalida/ListRevalidasView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/general/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
