// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/router-discover',
    name: 'router-discover',
    component: () => import(/* webpackChunkName: "routerDiscover" */ '@/views/RouterDiscover.vue'),
  },
  {
    path: '/developer-portal',
    name: 'developer',
    component: () => import(/* webpackChunkName: "developer" */ '@/views/Developer.vue'),

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
