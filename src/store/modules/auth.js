import mutations from "@/store/mutations";
const { IS_LOGED_IN, LOGING_LOADER, IS_FIRST_LOGIN } = mutations;

import {
  firebaseLogin,
  firebaseSingUp,
  firebaseLogout,
  firebaseResetPassword
} from "@/services/firebase/auth.service";

const authStore = {
  namespaced: true,
  state: {
    isLoggedIn: Boolean(localStorage.getItem(process.env.VUE_APP_TOKEN_KEY)),
    loginInProgress: false,
    isFirstLogin: false
  },
  getters: {
    isLoggedIn: ({ isLoggedIn }) => isLoggedIn,
    loginInProgress: ({ loginInProgress }) => loginInProgress,
    isFirstLogin: ({ isFirstLogin }) => isFirstLogin
  },
  mutations: {
    [IS_LOGED_IN](state, bool) {
      state.isLoggedIn = bool;
    },
    [LOGING_LOADER](state, bool) {
      state.loginInProgress = bool;
    },
    [IS_FIRST_LOGIN](state, bool) {
      state.isFirstLogin = bool;
    }
  },
  actions: {
    setLoggedIn: {
      handler({ commit }, bool) {
        commit(IS_LOGED_IN, bool);
      },
      root: true
    },
    async login({ commit, dispatch }, { email, password }) {
      try {
        commit(LOGING_LOADER, true);
        await firebaseLogin(email, password);
      } catch (error) {
        dispatch(
          "loadMessage",
          { type: "error", message: error.message },
          { root: true }
        );
      } finally {
        commit(LOGING_LOADER, false);
      }
    },
    async singUp({ commit, dispatch }, { email, password }) {
      try {
        commit(LOGING_LOADER, false);
        const user = await firebaseSingUp(email, password);
        console.log(user);
        commit(IS_FIRST_LOGIN, user.additionalUserInfo.isNewUser);
      } catch (error) {
        dispatch(
          "loadMessage",
          { type: "error", message: error.message },
          { root: true }
        );
      } finally {
        commit(LOGING_LOADER, false);
      }
    },
    async logout({ dispatch }) {
      try {
        await firebaseLogout();
      } catch (error) {
        dispatch(
          "loadMessage",
          {
            type: "error",
            message: error.message
          },
          { root: true }
        );
      }
    },
    async resetPassword({ dispatch }, email) {
      try {
        await firebaseResetPassword(email);
      } catch (error) {
        dispatch(
          "loadMessage",
          {
            type: "error",
            message: error.message
          },
          { root: true }
        );
      }
    }
  }
};

// export const state = () => ({});

// export const getters = {
//   getterValue: (state) => {
//     return state.value;
//   },
// };

// export const mutations = {
//   updateValue: (state, payload) => {
//     state.value = payload;
//   },
// };

// export const actions = {
//   updateActionValue({ commit }) {
//     commit("updateValue", payload);
//   },
// };

export default authStore;
