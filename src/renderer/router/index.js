import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: require('@/components/Dashboard').default
    },
    {
      path: '/currencies',
      name: 'currencies',
      component: () => import(
        `@/components/Currencies.vue`
      )
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
