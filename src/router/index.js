import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/AllOffers',
    name: 'AllOffers',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AllOffers.vue'),
  },
  {
    path: '/MyOffers',
    name: 'MyOffers',
    component: () => import('../views/MyOffers.vue'),
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
