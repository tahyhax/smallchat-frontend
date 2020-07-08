import mutations from "@/store/mutations";
import axios from "@/plugins/axios";
import Vue from "vue";
const { USER, USER_NEW_MSGS } = mutations;

const userStore = {
  namespaced: true,
  state: {
    user: {
      chats: [],
    },
    userNewMessages: [],
  },
  getters: {
    user: ({ user }) => user,
    fullName: ({ user }) => `${user.firstName || ""} ${user.lastName || ""}`,
    currentUserId: ({ user }) => user._id || "",
    userNewMessages: ({ userNewMessages }) => userNewMessages,
  },
  mutations: {
    [USER](state, obj) {
      console.log("user", obj);
      state.user = obj;
    },
    [USER_NEW_MSGS](state, message) {
      if (!state.userNewMessages[message.chat]) {
        Vue.set(state.userNewMessages, message.chat, []);
      }
      state.userNewMessages[message.chat].push(message);
    },
  },
  actions: {
    setUserState: {
      handler({ dispatch }, user) {
        dispatch("getUserByEmail", user.email);
      },
      root: true,
    },
    async saveUserInfo({ commit, dispatch }, data) {
      try {
        const user = await axios.post("/users", data);
        commit(USER, user);
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
    async getUserByEmail({ commit, dispatch }, email) {
      try {
        const user = await axios.get(`/users/${email}`);
        commit(USER, user);
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
    setUserNewMessages({ commit }, message) {
      commit(USER_NEW_MSGS, message);
    },
  },
};
export default userStore;
