import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/sing-up",
    name: "sing-up",
    component: () =>
      import(/* webpackChunkName: "sing-up" */ "../views/SingUp.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "sing-up" */ "../views/FirstLogin.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
