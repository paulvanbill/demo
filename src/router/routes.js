import Vue from "vue";
import Router from "vue-router";
import Login from "../components/Login.vue"
import Hello from "../components/HelloWorld.vue"
import Home from "../components/Home.vue"
import NavMenu from "../components/NavMenu.vue"
import Tabs from "../components/Tabs.vue"
import Table from "../components/Table/Table.vue"
import Layout from "../components/Layout"

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/redirect',
            component: Layout,
            children: [{
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }]
        },
        {
            name: 'login',
            path: '/',
            component: Login
        },
        {
            name: 'index',
            path: '/index',
            component: Layout,
            meta: {
                title: '首页'
            },
            children: [{
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/dashboard'),
                meta: {
                    title: 'dashboard',
                    affix: true,
                    requireAuth: true,
                    cache: false
                }
            },
            {
                name: 'helloworld',
                path: 'helloworld',
                component: Hello,
                meta: {
                    title: 'helloworld',
                    requireAuth: true,
                    cache: false
                }
            },
            {
                name: 'myTable',
                path: 'table',
                component: Table,
                meta: {
                    title: '表格',
                    requireAuth: true,
                    cache: true
                }
            }]
        },
        {
            name: 'navMenu',
            path: '/navMenu',
            component: NavMenu,
            meta: {
                requireAuth: true
            }
        },
        {
            name: 'tabs',
            path: '/tabs',
            component: Tabs,
            meta: {
                requireAuth: true
            }
        }
    ]
})