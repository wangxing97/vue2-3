import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../pages/Home.vue'
import User from '../pages/User.vue'
import Male from '../pages/Male.vue'
import Female from '../pages/Female.vue'

export default new VueRouter({
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
                    component:Male
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