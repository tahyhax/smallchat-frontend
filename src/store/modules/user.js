import mutations from "@/store/mutations";
import axios from "@/plugins/axios";

const { USER } = mutations;

const userStore = {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    user: ({ user }) => user,
    fullName: ({ user }) => `${user.firstName || ""} ${user.lastName || ""}`,
    currentUserId: ({ user }) => user._id || "",
  },
  mutations: {
    [USER](state, obj) {
      console.log("user", obj);
      state.user = obj;
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
  },
};
export default userStore;
