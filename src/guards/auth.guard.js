import router from "@/router";
export default function authGuard(store) {
  router.beforeEach((to, from, next) => {
    const isAuth = store.state.auth.isLoggedIn;

    const publicRoutes = ["login"];
    if (publicRoutes.includes(to.name) && isAuth) {
      return next({ name: "home" });
    }
    if (!publicRoutes.includes(to.name) && !isAuth) {
      return next({ name: "login" });
    }
    return next();
  });
}
