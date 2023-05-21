import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/picture-of-the-day',
    name: 'picture-of-the-day',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/PictureOfTheDay.vue')
  },
  {
    path: '/earth',
    name: 'earth',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Earth.vue')
  },
  {
    path: '/epic-earth',
    name: 'epic-earth',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/EpicEarth.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
