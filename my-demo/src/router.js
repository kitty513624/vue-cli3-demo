import Vue from 'vue';
import Router from 'vue-router';
import Demo001 from './views/Demo_001.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'demo_001',
      component: Demo001,
    },
    {
      path: '/demo_002',
      name: 'demo_002',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Demo_002.vue'),
    },
  ],
});
