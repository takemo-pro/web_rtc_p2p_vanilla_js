import Vue from "vue";
import Router from "vue-router";

import Register from "../components/users/Register";
import Login from "../components/users/Login";

Vue.use(Router);

const routes = [
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/login',
        component: Login,
    },
];

const router = new Router({
    routes: routes,
    mode: "history",
});

export default router;
