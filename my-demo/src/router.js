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
      redirect: 'demo_001',
    },
    {
      path: '/demo_001',
      name: 'demo_001',
      component: Demo001,
      meta: {
        title: '文字无缝滚动',
      },
    },
    {
      path: '/demo_002',
      name: 'demo_002',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Demo_002.vue'),
      meta: {
        title: '文字无缝停顿滚动',
      },
    },
    {
      path: '/demo_003',
      name: 'demo_003',
      component: () => import('./components/Demo_003.vue'),
      meta: {
        title: '轮播图',
      },
    },
    {
      path: '/demo_004',
      name: 'demo_004',
      component: () => import('./components/Demo_004.vue'),
      meta: {
        title: '文字无缝停顿滚动',
      },
    },
    {
      path: '/demo_005',
      name: 'demo_005',
      component: () => import('./components/Demo_005.vue'),
      meta: {
        title: '文字无缝停顿滚动',
      },
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('./views/Demo.vue'),
    },
  ],
});
