import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Notfound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/:pathMatch(.*)*',
    name: 'Not-found',
    component: Notfound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
