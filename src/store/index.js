import Vue from "vue";
import Vuex from "vuex";
import firebase from "@/plugins/firebase";
import auth from "./modules/auth";
import router from "@/router";
import authGuard from "@/guards/auth.guard";
import notify from "./modules/notify";
import user from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth, notify, user },
});

firebase.auth().onAuthStateChanged((userData) => {
  const isAuth = Boolean(userData);
  store.dispatch("setLoggedIn", isAuth);
  store.dispatch("setUserState", userData);
  //todo console error  Avoided redundant navigation to current location
  if (isAuth) {
    router.push({ name: "home" });
  }
});

authGuard(store);

export default store;
