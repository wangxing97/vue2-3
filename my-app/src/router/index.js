import Vue from 'vue'
import VueRouter from 'vue-router';
import Home from '../pages/Home'
import User from '../pages/User'
import Main from '../pages/Main'
Vue.use(VueRouter);
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: 'home',
            component: Main,
            children: [
                {
                    path: 'home', component: () => import('../pages/Home.vue')
                },
                {
                    path: 'user', component: User
                },
                {
                    path: 'mall', component: () => import('../pages/Mall.vue')
                },
                {
                    path: 'Page1', component: () => import('../pages/Page1.vue')
                },
                {
                    path: 'Page2', component: () => import('../pages/Page2.vue')
                }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    // console.log("global before", to, from);
    next();
})
router.afterEach((from, to) => {
    // console.log("global after", from, to, store);
})
export default router