import mutations from "@/store/mutations";
import axios from "@/plugins/axios";

const {
  // CHATS_LIST,
  // CURRENT_CHAT,
  // CURRENT_CHAT_MSGS,
  NEW_MSGS,
  // SELECTED_CHAT_ID,
} = mutations;

const messageStore = {
  namespaced: true,
  state: {
    // chatsList: [],
    // selectedChatId: "",
    // currentChat: {},
    // currentChatMessages: [],
  },
  getters: {
    // chatsList: ({ chatsList }) => chatsList,
    // selectedChatId: ({ selectedChatId }) => selectedChatId,
    // isSelectedChat: ({ selectedChatId }) => !!selectedChatId,
    // currentChat: ({ currentChat }) => currentChat,
    // currentChatMessages: ({ currentChatMessages }) => currentChatMessages,
    // fullName: ({ user }) => `${user.firstName || ""} ${user.lastName || ""}`,
  },
  mutations: {
    // [CHATS_LIST](state, arr) {
    //   state.chatsList = arr;
    // },
    // [SELECTED_CHAT_ID](state, id) {
    //   state.selectedChatId = id;
    // },
    // [CURRENT_CHAT](state, obj) {
    //   state.currentChat = obj;
    // },
    // [CURRENT_CHAT_MSGS](state, arr) {
    //   state.currentChatMessages = arr;
    // },
    [NEW_MSGS](state, message) {
      state.currentChatMessages.push(message);
    },
  },
  actions: {
    async getMessagesListByPoolId({ dispatch }, poolId) {
      try {
        console.log("poolId", poolId);
        const messages = await axios.post("/messages/list", { poolId: poolId });
        // console.log(messages);
        dispatch("chat/newMessage", messages, { root: true });
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
    // async getChatMessagesById({ commit, dispatch }, id) {
    //   try {
    //     const messages = await axios.get(`/messages/${id}`);
    //     commit(CURRENT_CHAT_MSGS, messages);
    //   } catch (error) {
    //     dispatch(
    //       "loadMessage",
    //       {
    //         type: "error",
    //         message: error.message,
    //       },
    //       { root: true }
    //     );
    //   }
    // },
  },
};
export default messageStore;
