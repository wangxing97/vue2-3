import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../pages/Home.vue'
import User from '../pages/User.vue'
import Male from '../pages/Male.vue'
import Female from '../pages/Female.vue'

const router = new VueRouter({
    routes:[
        {
            path:"/",
            redirect:"/Home"
        },
        {
            path:"/Home",
            component:Home
        },
        {
            path:"/User",
            component:User,
            children:[
                {
                    name:"nande",
                    path:"Male/:number",
                    props:true,
                    component:Male,
                    beforeEnter:(to,from,next)=>{
                        console.log('private before',to,from);
                        next();
                    }
                },
                {
                    name:"nvde",
                    path:"Female/:number",
                    component:Female
                }
            ]
        }
    ]
});

router.beforeEach((to,from,next)=>{
    console.log("global before",to,from);
    next();
})
router.afterEach((from,to)=>{
    console.log("global after",from,to);
})
export default router;