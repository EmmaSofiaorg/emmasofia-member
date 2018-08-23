import Vue from 'vue'
import Router from 'vue-router'

import Norwegian from '../pages/norwegian.vue';
import English from '../pages/english.vue';
import Eksisterende from '../pages/eksisterende.vue';


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'norwegian',
      component: Norwegian
    },
    {
      path: '/english',
      name: 'english',
      component: English
    },
    {
      path: '/eksisterende-medlem/:id',
      name: 'eksisterende',
      component: Eksisterende
    }
  ]
})
