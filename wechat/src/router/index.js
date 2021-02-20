import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'WeChat',
        name: 'WeChat',
        component: () => import('../views/WeChat.vue')
      },
      {
        path: 'Contact',
        name: 'Contact',
        component: () => import('../views/Contact.vue')
      },
      {
        path: 'Found',
        name: 'Found',
        component: () => import('../views/Found.vue')
      },
      {
        path: 'My',
        name: 'My',
        component: () => import('../views/My.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes
})

export default router
