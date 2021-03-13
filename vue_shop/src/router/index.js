import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/Login'
// import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login_home_welcome" */ '../views/Login')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "login_home_welcome" */ '../views/Home'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Welcome')
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import(/* webpackChunkName: "users_rights_roles" */ '../components/user/Users')
      },
      {
        path: '/rights',
        name: 'Rights',
        component: () => import(/* webpackChunkName: "users_rights_roles" */ '../components/power/Rights')
      },
      {
        path: '/roles',
        name: 'Roles',
        component: () => import(/* webpackChunkName: "users_rights_roles" */ '../components/power/Roles')
      },
      {
        path: '/categories',
        name: 'Cate',
        component: () => import(/* webpackChunkName: "cate_params_list_add" */ '../components/goods/Cate')
      },
      {
        path: '/params',
        name: 'Params',
        component: () => import(/* webpackChunkName: "cate_params_list_add" */ '../components/goods/Params')
      },
      {
        path: '/goods',
        name: 'Goods',
        component: () => import(/* webpackChunkName: "cate_params_list_add" */ '../components/goods/List')
      },
      {
        path: '/goods/add',
        name: 'Add',
        component: () => import(/* webpackChunkName: "cate_params_list_add" */ '../components/goods/Add')
      },
      {
        path: '/orders',
        name: 'Order',
        component: () => import(/* webpackChunkName: "order" */ '../components/order/Order')
      },
      {
        path: '/reports',
        name: 'Report',
        component: () => import(/* webpackChunkName: "report" */ '../components/report/Report')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/* 挂在路由导航守卫 */
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from代表从哪个路径跳转而来
  // net 是一个函数，表示放行
  if (to.path === '/login') return next()
  // get token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
