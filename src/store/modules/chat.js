import mutations from "@/store/mutations";
import axios from "@/plugins/axios";

const {
  CHATS_LIST,
  CURRENT_CHAT,
  CURRENT_CHAT_MSGS,
  NEW_MSGS,
  SELECTED_CHAT_ID,
} = mutations;

const chatStore = {
  namespaced: true,
  state: {
    chatsList: [],
    selectedChatId: "",
    currentChat: {},
    currentChatMessages: [],
  },
  getters: {
    chatsList: ({ chatsList }) => chatsList,
    selectedChatId: ({ selectedChatId }) => selectedChatId,
    // isSelectedChat: ({ selectedChatId }) => !!selectedChatId,
    currentChat: ({ currentChat }) => currentChat,

    currentChatMessages: ({ currentChatMessages }) => currentChatMessages,

    // fullName: ({ user }) => `${user.firstName || ""} ${user.lastName || ""}`,
  },
  mutations: {
    [CHATS_LIST](state, arr) {
      state.chatsList = arr;
    },
    [SELECTED_CHAT_ID](state, id) {
      state.selectedChatId = id;
    },
    [CURRENT_CHAT](state, obj) {
      state.currentChat = obj;
    },
    [CURRENT_CHAT_MSGS](state, arr) {
      state.currentChatMessages = arr;
    },
    [NEW_MSGS](state, message) {
      state.currentChatMessages.push(message);
    },
  },
  actions: {
    async getChatById({ commit, dispatch }, id) {
      try {
        const chat = await axios.get(`/chats/${id}`);
        commit(CURRENT_CHAT, chat);
        const { messages = [] } = chat;
        commit(CURRENT_CHAT_MSGS, messages);
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
    async getChatMessagesById({ commit, dispatch }, id) {
      try {
        const messages = await axios.get(`/messages/${id}`);
        commit(CURRENT_CHAT_MSGS, messages);
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
    async selectChatId({ commit, dispatch }, id) {
      try {
        commit(SELECTED_CHAT_ID, id);
        dispatch("getChatById", id);
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
    async createChat({ dispatch }, data) {
      try {
        const chat = await axios.post("/", data);
        console.log(chat);
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
    async getChatsList({ commit, dispatch }) {
      try {
        const chatsList = await axios.get("/chats");
        commit(CHATS_LIST, chatsList);
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

    newMessage({ commit }, message) {
      commit(NEW_MSGS, message);
    },
  },
};
export default chatStore;
