import mutations from "@/store/mutations";

const { SHOW_NOTIFY } = mutations;
const notifyStore = {
  state: {
    messages: [],
  },
  getters: {
    lastMessage: ({ messages }) => messages[messages.length - 1],
  },
  mutations: {
    [SHOW_NOTIFY](state, message) {
      state.messages.push(message);
    },
  },
  actions: {
    loadMessage({ commit }, message = {}) {
      commit(SHOW_NOTIFY, message);
    },
  },
};

export default notifyStore;
