import Vue from 'vue'
import VueRouter from 'vue-router'
import chart from '@/views/layout/chart'
import user from '@/views/layout/user'
import enterprise from '@/views/layout/enterprise'
import question from '@/views/layout/question'
import subject from '@/views/layout/subject'

import { getToken } from '@/utails/token.js'
Vue.use(VueRouter)
import Login from '@/views/login'
import Layout from '@/views/layout'
const router = new VueRouter({
    routes: [{ path: '/', redirect: './login' },
    { path: '/login', component: Login },
    { path: '/layout', component: Layout ,children:[
        {path:'chart',component:chart},
        {path:'user',component:user},
        {path:'enterprise',component:enterprise},
        {path:'question',component:question},
        {path:'subject',component:subject}
    ]}]
})

router.beforeEach((to, from, next) => {
    // console.log(from);
    if (to.fullPath == '/login' || '/') {
        next()
    }
    const token = getToken()
    if (token) {
        next()
    } else {
        next('/login')
    }


})
export default router
