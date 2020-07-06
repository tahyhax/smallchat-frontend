import Vue from "vue";
import Vuex from "vuex";
import firebase from "@/plugins/firebase";
import { getUserIdToken } from "@/services/firebase/auth.service";
// import router from "@/router";
import authGuard from "@/guards/auth.guard";

//TODO исправить множественный  редирект при refresh
import createLogger from "vuex/dist/logger";

// *modules list auto include
// @see https://dev.to/localeai/architecting-vuex-store-for-large-scale-vue-js-applications-4f1f
import auth from "./modules/auth";
import notify from "./modules/notify";
import user from "./modules/user";
import chat from "./modules/chat";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth, notify, user, chat },
  strict: debug,
  plugins: debug ? [createLogger()] : [], // set logger only for development/
});

firebase.auth().onAuthStateChanged(async (userData) => {
  const isAuth = Boolean(userData);
  store.dispatch("setLoggedIn", isAuth);
  store.dispatch("setUserState", userData);

  if (isAuth) {
    const token = await getUserIdToken();
    localStorage.setItem(process.env.VUE_APP_LS_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(process.env.VUE_APP_LS_TOKEN_KEY);
  }
  //todo console error  Avoided redundant navigation to current location
  // if (store.state.auth.isLoggedIn) {
  //   router.push({ name: "home" });
  // }
});

authGuard(store);

export default store;
