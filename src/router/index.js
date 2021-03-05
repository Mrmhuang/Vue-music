import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const recommend = ()=>import('../components/recommend/recommend')
const singer = ()=>import('../components/singer/singer')
const rank = ()=>import('../components/rank/rank')
const singerDetail = ()=>import('../components/singer/singer-son/singerDetail')
const singerView = ()=>import('../components/singer/singer-view')
const recommendDetail = ()=>import("../components/recommend/recommend_son/recommendDetail")

const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend',
    },
    {
      path: '/recommend',
      name:'recommend',
      component:recommend,
      children:[{
        path:':id',
        component: recommendDetail
      }]
    },
    {
      path: '/singer',
      name:'singerView',
      component:singerView,
      // children:[{
      //   path:':id',
      //   name:'singerDetail',
      //   component:singerDetail
      // }]
    },
    {
      path: '/rank',
      name:'rank',
      component:rank
    },
    {
      path: '/singer/:id',
      name:'singermore',
      component:singerDetail
    }

  ]
})

export default router
