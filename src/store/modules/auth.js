import mutations from "@/store/mutations";
import {
  firebaseLogin,
  firebaseLogout,
} from "@/services/firebase/auth.service";
const { IS_LOGED_IN, LOGING_LOADER } = mutations;

const authStore = {
  namespaced: true,
  state: {
    isLoggedIn: false,
    loginInProgress: false,
  },
  getters: {
    isLoggedIn: ({ isLoggedIn }) => isLoggedIn,
    loginInProgress: ({ loginInProgress }) => loginInProgress,
  },
  mutations: {
    [IS_LOGED_IN](state, bool) {
      state.isLoggedIn = bool;
    },
    [LOGING_LOADER](state, bool) {
      state.loginInProgress = bool;
    },
  },
  actions: {
    setLoggedIn: {
      handler({ commit }, bool) {
        commit(IS_LOGED_IN, bool);
      },
      root: true,
    },
    async login({ commit, dispatch }, { email, password }) {
      try {
        commit(LOGING_LOADER, true);
        await firebaseLogin(email, password);
      } catch (error) {
        console.log("551");
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
            message: error.message,
          },
          { root: true }
        );
      }
    },
  },
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
