import Vue from "vue";
import Router from "vue-router";

import Register from "../components/users/Register";
import Login from "../components/users/Login";
import RoomIndex from "../components/rooms/Index";
import RoomShow from "../components/rooms/Show";

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: RoomIndex,
    },
    {
        path: '/room',
        component: RoomIndex,
    },
    {
        path: '/room/show',
        component: RoomShow,
    },
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
