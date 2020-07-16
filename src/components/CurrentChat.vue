<template>
  <div class="current-chat">
    <div class="current-chat__header">
      <template v-if="isSelectedChat">
        <chat-current-info
          :is-typing="isTyping"
          :chat-name="chatName"
          :chat-count-members="chatCountMembers"
        >
        </chat-current-info>
      </template>
    </div>
    <div class="current-chat__body">
      <template v-if="!isSelectedChat">
        <chat-message-info
          class="current-chat__message-info"
        ></chat-message-info>
      </template>
      <template v-else>
        <chat-messages
          :messages="currentChatMessages"
          :current-user="user"
          :is-typing="isTyping"
        ></chat-messages>
      </template>
    </div>
    <template v-if="isSelectedChat">
      <div class="current-chat__footer">
        <chat-message-form
          :is-join="isChatJoined"
          @send-message="onSendMessage"
          @typing="onTyping"
          @join-chat="onJoinChat"
        ></chat-message-form>
        <!-- <div class="chat-message-form">
        <el-input
          class="chat-message-form__text"
          v-model="text"
          type="textarea"
          resize="none"
          placeholder="Write a message..."
        ></el-input>
        <el-button
          class="chat-message-form__button-send"
          type="default"
          icon="el-icon-s-promotion"
          circle
        ></el-button>
      </div> -->
      </div>
    </template>
  </div>

  <!-- <main class="current-chat">
    <div class="current-chat__inner">
      <template v-if="!isSelectedChat">
        <chat-info-message
          class="current-chat__info-message"
        ></chat-info-message>
      </template>
      <template v-else>
        <chat-messages
          :messages="currentChatMessages"
          :current-user="user"
          :is-typing="isTyping"
        ></chat-messages>
        <chat-message-form
          :is-join="isChatJoined"
          @send-message="onSendMessage"
          @typing="onTyping"
          @join-chat="onJoinChat"
        ></chat-message-form>
      </template>
    </div>
  </main> -->
</template>

<script>
  import Emitters from "@/plugins/socket/emitters";
  import Listeners from "@/plugins/socket/listeners";

  import ChatMessageInfo from "@/components/ChatMessageInfo";
  import ChatMessages from "@/components/ChatMessages";
  import ChatMessageForm from "@/components/ChatMessageForm";
  import ChatCurrentInfo from "@/components/ChatCurrentInfo.vue";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "CurrentChat",
    data: () => ({
      isTyping: false,
      $typingTimeout: null,
      // isScrollDown: false,
      // typingUsers: [], сделать  typing  чтобы отдавал ответ при начала и конце  typing
    }),
    components: {
      ChatMessageInfo,
      ChatMessageForm,
      ChatMessages,
      ChatCurrentInfo,
    },
    computed: {
      ...mapGetters("chat", [
        "selectedChatId",
        "currentChatMessages",
        "chatMembers",
        "currentChat",
      ]),
      ...mapGetters("user", ["user", "fullName"]),
      isChatJoined() {
        return this.user.chats.includes(this.selectedChatId);
      },
      isSelectedChat() {
        return !!this.selectedChatId;
      },
      chatName() {
        return this.currentChat.name || "no name";
      },
      chatCountMembers() {
        return this.chatMembers ? this.chatMembers.length : 0;
      },
    },

    methods: {
      ...mapActions("user", ["getUserByEmail", "addUserNewMessages"]),
      ...mapActions("chat", ["newMessage"]),
      setTypping() {
        if (this.$$typingTimeout) {
          clearTimeout(this.$typingTimeout);
        }

        this.isTyping = true; //*здесь мы можем добавлять  не true false  а  имя пользователя в массив  typingUsers
        this.$$typingTimeout = setTimeout(() => {
          this.isTyping = false;
        }, 2000);
      },
      onSendMessage(text) {
        //todo  зачем делать еммит  если можно  отправить на  backend  и оттудова сделать emit
        // для  етого будет надо сделат контроллеры на  backend
        this.$socket.emit(Emitters.NEW_MESSAGE, {
          text,
          chatId: this.selectedChatId,
          userId: this.user._id,
        });
      },
      onJoinChat() {
        //todo  зачем делать еммит  если можно  отправить на  backend  и оттудова сделать emit
        this.$socket.emit(Emitters.JOIN_CHAT, {
          chatId: this.selectedChatId,
          userName: this.fullName,
          userId: this.user._id,
        });
      },
      onTyping() {
        this.$socket.emit(Emitters.USER_TYPING, {
          chatId: this.selectedChatId,
          userId: this.user._id,
        });
      },
    },
    mounted() {
      this.$socket.on(Listeners.NEW_USER_JOIN, ({ userId }) => {
        if (userId === this.user._id) {
          this.getUserByEmail(this.user.email);
        }
      });
      this.$socket.on(Listeners.NEW_MESSAGE, (message) => {
        if (message.chat === this.selectedChatId) {
          this.newMessage([{ ...message }]);
        } else {
          const data = {
            userId: this.user._id,
            chatId: message.chat,
            messageId: message._id,
          };
          this.addUserNewMessages(data);
          // console.log("add to new  message");
        }
        // this.isScrollDown = true;
        // console.log(message);
        // if (userId === this.user._id) {
        //   this.getUserByEmail(this.user.email);
        // }
      });
      this.$socket.on(Listeners.USER_TYPING, ({ chatId }) => {
        //note Fix  its not good
        if (chatId === this.selectedChatId) {
          this.setTypping();
        }
        //todo  add  username  who write message
        // console.log("Typing", chatId);
        // console.log("Typing", data);

        // if (userId === this.user._id) {
        //   this.getUserByEmail(this.user.email);
        // }
      });
    },
  };
</script>

<style lang="scss" scoped>
  .current-chat {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // width: 100%;

    flex: 1;
    &__header {
      display: flex;
      padding: 10px;
      height: 55px;
    }
    &__body {
      display: flex;
      flex: 1;
      height: calc(100vh - 110px);
    }
    &__message-info {
      align-self: center;
    }
    &__footer {
      padding-bottom: 15px;
    }
  }

  // .current-chat {
  //   &__inner {
  //     position: relative;
  //     background-color: #fdfcfe;
  //     display: flex;
  //     flex-direction: column;
  //     position: relative;
  //     z-index: 0;
  //     padding: 15px 20px;
  //   }
  //   &__info-message {
  //     position: relative;
  //     top: 40%;
  //   }
  // }
</style>
