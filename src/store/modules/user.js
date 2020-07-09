import mutations from "@/store/mutations";
import axios from "@/plugins/axios";
import Vue from "vue";
const { USER, USER_NEW_MSGS, ADD_USER_NEW_MSGS } = mutations;

const userStore = {
  namespaced: true,
  state: {
    user: {
      chats: [],
    },
    userNewMessages: {},
  },
  getters: {
    user: ({ user }) => user,
    fullName: ({ user }) => `${user.firstName || ""} ${user.lastName || ""}`,
    currentUserId: ({ user }) => user._id || "",
    userNewMessages: ({ userNewMessages }) => userNewMessages,
  },
  mutations: {
    [USER](state, obj) {
      state.user = obj;
    },
    [USER_NEW_MSGS](state, obj) {
      console.log("USER_NEW_MSGS", obj);
      state.userNewMessages = obj || {};
    },

    [ADD_USER_NEW_MSGS](state, { chatId, messageId }) {
      if (!state.userNewMessages[chatId]) {
        Vue.set(state.userNewMessages, chatId, []);
      }
      state.userNewMessages[chatId].push(messageId);
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
        console.log("user.newMessages", user.newMessages);
        commit(USER_NEW_MSGS, user.newMessages);
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
    async addUserNewMessages({ commit, dispatch }, data) {
      try {
        await axios.post("/users/add-new-messages", data);
        const { chatId, messageId } = data;
        commit(ADD_USER_NEW_MSGS, { chatId, messageId });
        return true;
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
export default userStore;
