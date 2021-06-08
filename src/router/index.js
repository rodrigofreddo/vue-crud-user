import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/components/pages/PageHome'
import PageDashboard from '@/components/pages/PageDashboard'
import PageCreateAccount from '@/components/pages/PageCreateAccount'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PageHome
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: PageDashboard
    },
    {
      path: '/create-account',
      name: 'PageCreateAccount',
      component: PageCreateAccount
    }
  ]
})
