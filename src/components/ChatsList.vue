<template>
  <div class="chats-list">
    <template v-for="chat in chatsFiltered">
      <chats-list-item
        class="chats-list__item"
        :chat="chat"
        :key="chat._id"
        :is-selected="isSelected(chat)"
        :chat-ids-pool="chatIdsPool"
        :new-messages="getUserNewMessages(chat._id)"
        @select-chat="onChatSelect"
      ></chats-list-item>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import Emitters from "@/plugins/socket/emitters";
  // import Listeners from "@/plugins/socket/listeners";

  import ChatsListItem from "@/components/ChatsListItem";
  export default {
    name: "ChatsList",
    data: () => ({
      chatIdsPool: [],
      // activeC
    }),
    components: {
      ChatsListItem,
    },
    props: {
      searchString: {
        type: String,
        default: "",
      },
    },

    computed: {
      ...mapGetters("chat", ["chatsList", "selectedChatId"]),
      ...mapGetters("user", ["user", "userNewMessages"]),
      chatsFiltered() {
        const compareSearch = this.searchString.trim().toLowerCase();
        if (!this.searchString) {
          return this.chatsList;
        }
        return this.chatsList.filter((chat) => {
          const compareChatName = chat.name.toLowerCase();
          return compareChatName.indexOf(compareSearch) !== -1;
        });
      },
    },
    watch: {
      user: "setChatOnGetUser",
      chatsList: "connectToChats",
    },
    methods: {
      ...mapActions("chat", ["getChatsList", "selectChatId"]),
      ...mapActions("message", ["getMessagesListByPoolId"]),

      onChatSelect(chatId) {
        if (chatId === this.selectedChatId) {
          return false;
        }
        this.setChatId(chatId);
        const userChatNewMessage = this.getUserNewMessages(this.selectedChatId);
        if (userChatNewMessage.length) {
          this.getMessagesListByPoolId(userChatNewMessage);
        }
        this.$router.push({ query: { chatId } }); // TODO можно перенсти в  watch и следить за  selectedChatId
      },
      setChatId(id) {
        this.selectChatId(id);
        this.removeChatIdFromPool(id);
        // this.$socket.emit(Emitters.SELECT_CHAT, { chatId: id });
      },
      isSelected(chat) {
        return chat._id === this.selectedChatId;
      },
      setChatOnGetUser(user) {
        const { chatId } = this.$route.query;
        if (!chatId || !user) {
          return false;
        }
        this.setChatId(chatId);
      },
      setChatIdToPool(id) {
        const isExist = this.chatIdsPool.some((chatId) => chatId === id);
        if (isExist) {
          return false;
        }
        this.chatIdsPool.push(id);
      },
      connectToChats(chatsList) {
        chatsList.forEach((chat) => {
          this.$socket.emit(Emitters.SELECT_CHAT, { chatId: chat._id });
        });
      },
      removeChatIdFromPool(id) {
        if (!this.chatIdsPool.length) {
          return false;
        }
        const index = this.chatIdsPool.findIndex((chatId) => chatId === id);
        if (index !== -1) {
          this.chatIdsPool.splice(index, 1);
        }
      },
      getUserNewMessages(chatId) {
        return !this.userNewMessages[chatId]
          ? []
          : this.userNewMessages[chatId];
      },
    },
    mounted() {
      this.getChatsList();
      // this.$socket.on(Listeners.NEW_MESSAGE, (message) => {
      //   // this.newMessage({ ...message });
      //   console.log("chatsList", message);
      //   // const { _id: messageId, chat: chatId } = message;
      //   // console.log("chatsList123", messageId);
      //   // if (chatId !== this.selectedChatId) {
      //   //   this.setChatIdToPool(chatId);
      //   // }
      // });
    },
  };
</script>

<style lang="scss" scoped>
  //спислк чатов
  .chats-list {
    overflow-y: scroll;
    height: 100%;
    // &__item {
    //   // padding: 10px 0;
    //   // border-bottom: solid 1px rgba(#000000, 0.1);
    // }
  }
</style>
