<template>
  <div class="current-chat">
    <div class="current-chat__header">
      <div class="chat-info">
        <span class="chat-info__name title-name">Public</span>
        <p class="chat-info__description">4 members</p>
      </div>
    </div>
    <div class="current-chat__body">
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
      </template>
    </div>
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

  import ChatInfoMessage from "@/components/ChatInfoMessage";
  import ChatMessages from "@/components/ChatMessages";
  import ChatMessageForm from "@/components/ChatMessageForm";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "CurrentChat",
    data: () => ({
      isTyping: false,
      $typingTimeout: null,
    }),
    computed: {
      ...mapGetters("chat", ["selectedChatId", "currentChatMessages"]),
      ...mapGetters("user", ["user", "fullName"]),
      isChatJoined() {
        return this.user.chats.includes(this.selectedChatId);
      },
      isSelectedChat() {
        return !!this.selectedChatId;
      },
    },

    components: {
      ChatInfoMessage,
      ChatMessageForm,
      ChatMessages,
    },
    methods: {
      ...mapActions("user", ["getUserByEmail", "setUserNewMessages"]),
      ...mapActions("chat", ["newMessage"]),
      setTypping() {
        if (this.$$typingTimeout) {
          clearTimeout(this.$typingTimeout);
        }

        this.isTyping = true;
        this.$$typingTimeout = setTimeout(() => {
          this.isTyping = false;
        }, 2000);
      },
      onSendMessage(text) {
        this.$socket.emit(Emitters.NEW_MESSAGE, {
          text,
          chatId: this.selectedChatId,
          userId: this.user._id,
        });
      },
      onJoinChat() {
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
          console.log("newMEss", message);

          this.newMessage({ ...message });
        } else {
          console.log("newMEss11", message);
          this.setUserNewMessages({ ...message });
          // console.log("add to new  message");
        }
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
      flex: 1;
      height: 80vh;
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
