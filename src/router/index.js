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
    path: '/loginsw',
    name: 'loginsw',
    component: () => import(/* webpackChunkName: "login" */ '../views/user/LoginSwView.vue')
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
    path: '/produto',
    name: 'produto',
    component: () => import(/* webpackChunkName: "user" */ '../views/produto/ProdutoView.vue'),
  },
  {
    path: '/editproduto/:id',
    name: 'editproduto',
    component: () => import(/* webpackChunkName: "user" */ '../views/produto/EditProdutoView.vue'),
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: () => import(/* webpackChunkName: "user" */ '../views/produto/ListProdutosView.vue'),
  },
  {
    path: '/lote',
    name: 'lote',
    component: () => import(/* webpackChunkName: "user" */ '../views/lote/LoteView.vue'),
  },
  {
    path: '/editlote/:id',
    name: 'editlote',
    component: () => import(/* webpackChunkName: "user" */ '../views/lote/EditLoteView.vue'),
  },
  {
    path: '/lotes',
    name: 'lotes',
    component: () => import(/* webpackChunkName: "user" */ '../views/lote/ListLotesView.vue'),
  },
  {
    path: '/revalida',
    name: 'revalida',
    component: () => import(/* webpackChunkName: "user" */ '../views/revalida/RevalidaView.vue'),
  },
  {
    path: '/editrevalida/:id',
    name: 'editrevalida',
    component: () => import(/* webpackChunkName: "user" */ '../views/revalida/EditRevalidaView.vue'),
  },
  {
    path: '/revalidas',
    name: 'revalidas',
    component: () => import(/* webpackChunkName: "user" */ '../views/revalida/ListRevalidasView.vue'),
  },
  {
    path: '/movimento',
    name: 'movimento',
    component: () => import( '../views/movimento/MovimentoView.vue'),
  },
  {
    path: '/editmovimento/:id',
    name: 'editmovimento',
    component: () => import( '../views/movimento/EditMovimentoView.vue'),
  },
  {
    path: '/movimentos',
    name: 'movimentos',
    component: () => import(/* webpackChunkName: "user" */ '../views/movimento/ListMovimentosView.vue'),
  },
  {
    path: '/pedido/:user',
    name: 'pedido',
    component: () => import( '../views/pedido/PedidoView.vue'),
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: () => import( '../views/pedido/ListPedidosView.vue'),
  },
  {
    path: '/pedidossw/:user',
    name: 'pedidossw',
    component: () => import( '../views/pedido/ListPedidosSwView.vue'),
  },
  {
    path: '/editpedido/:id',
    name: 'editpedido',
    component: () => import( '../views/pedido/EditPedidoView.vue'),
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
