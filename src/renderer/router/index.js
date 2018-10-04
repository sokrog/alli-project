import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: require('@/components/Dashboard').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
