import { createRouter, createWebHistory } from 'vue-router'
import AddCity from '../views/AddCity.vue';
import WeatherView from '@/views/WeatherView'

const routes = [
  {
    path: '/',
    name: 'AddCity',
    component: AddCity
  },
  {
    path: '/weather/:city',
    name: 'WeatherView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: WeatherView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
