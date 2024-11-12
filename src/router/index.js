import { createRouter, createWebHashHistory } from 'vue-router';
import { publicPath } from '../../vue.config';

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
    path: '/inativos',
    name: 'inativos',
    component: () => import(/* webpackChunkName: "home" */ '../views/user/inativo/ListInativoView.vue'), 
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
    path: '/duplica_revalidas',
    name: 'duplica_revalidas',
    component: () => import(/* webpackChunkName: "user" */ '../views/revalida/ListDuplicRevalidasView.vue'),
  },
  {
    path: '/address',
    name: 'address',
    component: () => import(/* webpackChunkName: "user" */ '../views/address/AddressView.vue'),
  },
  {
    path: '/addresss',
    name: 'addresss',
    component: () => import(/* webpackChunkName: "user" */ '../views/address/ListAddresssView.vue'),
  },
  {
    path: '/duplicas',
    name: 'duplicas',
    component: () => import(/* webpackChunkName: "user" */ '../views/movimento/ListDuplicatesView.vue'),
  },
  {
    path: '/saldo',
    name: 'saldo',
    component: () => import(/* webpackChunkName: "user" */ '../views/saldo/SaldoView.vue'),
  },
  {
    path: '/crono/:lote/:unidade',
    name: 'crono',
    component: () => import(/* webpackChunkName: "user" */ '../views/saldo/CronoView.vue'),
  },
  {
    path: '/editaddress/:id',
    name: 'editaddress',
    component: () => import(/* webpackChunkName: "user" */ '../views/address/EditAddressView.vue'),
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
    path: '/unidades',
    name: 'unidades',
    component: () => import(/* webpackChunkName: "user" */ '../views/unidade/ListUnidadesView.vue'),
  },
  {
    path: '/unidade',
    name: 'unidade',
    component: () => import(/* webpackChunkName: "user" */ '../views/unidade/UnidadeView.vue'),
  },
  {
    path: '/editunidade/:id',
    name: 'editunidade',
    component: () => import(/* webpackChunkName: "user" */ '../views/unidade/EditUnidadeView.vue'),
  },
  {
    path: '/reports/:id',
    name: 'reports',
    component: () => import( '../views/report/MainReportView.vue'),
  },
  {
    path: '/report/:id',
    name: 'report',
    component: () => import( '../views/report/ReportView.vue'),
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
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  base: publicPath
})

export default router
