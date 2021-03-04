import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('../components/Welcome')
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('../components/user/Users')
      },
      {
        path: '/rights',
        name: 'Rights',
        component: () => import('../components/power/Rights')
      },
      {
        path: '/roles',
        name: 'Roles',
        component: () => import('../components/power/Roles')
      },
      {
        path: '/categories',
        name: 'Cate',
        component: () => import('../components/goods/Cate')
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
