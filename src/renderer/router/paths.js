export default [
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
    path: '/creditors',
    name: 'creditors',
    component: () => import(
      `@/components/Creditors.vue`
    )
  },
  {
    path: '/rfdocs',
    name: 'rfdocs',
    component: () => import(
      `@/components/RFDocuments.vue`
    )
  },
  {
    path: '*',
    redirect: '/'
  }
]
