import Vue from 'vue'
import Router from 'vue-router'

import Container from '@/views/Container'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Container',
    component: Container,
    children: [{
      path: '/send',
      name: 'Send',
      component: require('@/views/Send')
    }, {
      path: '/pickup',
      name: 'PickUp',
      component: require('@/views/PickUp')
    }]
  }, {
    path: '/usercenter',
    name: 'UserCenter',
    component: require('@/views/UserCenter')
  }, {
    path: '/redirect',
    name: 'Redirect',
    component: require('@/views/Redirect')
  }, {
    path: '/init',
    name: 'Init',
    component: require('@/views/Init')
  }, {
    path: '/vedio/add',
    name: 'VedioAdd',
    component: require('@/views/vedio/Add')
  }, {
    path: '/vedio/list',
    name: 'VedioList',
    component: require('@/views/vedio/List')
  }]
})
