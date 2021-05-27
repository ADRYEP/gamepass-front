import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/devs',
    name: 'Dev',
    component: () => import('../views/Devs.vue')
  },
  {
    path: '/game/:title',
    name: 'Game',
    component: () => import('../views/Game.vue')
  },
  {
    path: '/graph',
    name: 'Graph',
    component: () => import('../views/Graph.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
