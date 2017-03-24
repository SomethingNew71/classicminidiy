import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './app/main/Main.vue';

import './index.scss';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: Main
      }
    }
  ]
});

export default new Vue({
  el: '#root',
  router,
  render: h => h('router-view')
});
