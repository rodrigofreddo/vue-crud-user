import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/components/pages/PageHome'
import PageDashboard from '@/components/pages/PageDashboard'
import PageCreateAccount from '@/components/pages/PageCreateAccount'
import PageEditAccount from '@/components/pages/PageEditAccount'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PageHome
    },
    {
      path: '/dashboard/:userID',
      name: 'Dashboard',
      component: PageDashboard
    },
    {
      path: '/create-account',
      name: 'PageCreateAccount',
      component: PageCreateAccount
    },
    {
      path: '/edit-account/:userID',
      name: 'PageEditAccount',
      component: PageEditAccount
    }
  ]
})
