import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/pages/Home.vue"
import Login from "../views/pages/Login.vue";
import Register from "../views/pages/Register.vue"
import SingleItem from "../views/pages/SingleItem.vue"
import CreateItem from "../views/pages/CreateItem.vue";
import Profile from "../views/pages/Profile.vue";

const ifAuthenticated = (to, from, next) => {
    const loggedIn = localStorage.getItem('session_token');
    if (loggedIn) {
        next()
        return
    }
    next('/login')
}

const routes = [
    { path: "/", component: Home},
    { path: "/login", component: Login},
    { path: "/register", component: Register},
    { path: "/item/:id", component: SingleItem},
    { path: "/create-item", component: CreateItem, beforeEnter: ifAuthenticated},
    {
        path: '/profile',
        name: 'MyProfile',
        component: Profile,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/profile/:id',
        name: 'UserProfile',
        component: Profile
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router;