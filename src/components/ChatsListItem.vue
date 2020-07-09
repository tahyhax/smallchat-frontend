<template>
  <div class=" chats-list-item" :class="chatClasses" @click="selectChat">
    <div class="chats-list-item__avatar">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </div>
    <div class="chats-list-item__body">
      <div class="chats-list-item__info">
        <span class="chats-list-item__name title-name"> {{ chat.name }}</span>
        <span class="chats-list-item__time message-date">
          {{ lastMsgTime | parsedTime }}</span
        >
      </div>
      <div class="chats-list-item__about">
        <p
          class="chats-list-item__last-message message-text message-text--ellipsis"
        >
          {{ lastMsg }}
        </p>
        <template v-if="countNewMessages">
          <el-badge
            :value="countNewMessages"
            :max="999"
            type="info"
            class="chats-list-item__badge"
          >
          </el-badge>
        </template>
      </div>
    </div>
  </div>

  <!-- <div class="chat-item" :class="chatClasses" @click="selectChat">
    <div class="chat-item__avatar">
      <i class="el-icon-user-solid"></i>
      <span v-if="hasNewMessage" class="chat-item__new-message"></span>
    </div>
    <div class="chat-item__body">
      <div class="chat-item__info">
        <span class="chat-item__name">{{ chat.name }}</span>
        <span class="chat-item__time">{{ lastMsgTime | parsedTime }}</span>
      </div>
      <p class="chat-item__last-message">{{ lastMsg }}</p>
    </div>
  </div> -->
</template>

<script>
  export default {
    name: "ChatListItem",
    props: {
      chat: {
        type: Object,
        required: true,
      },
      isSelected: {
        type: Boolean,
        default: false,
      },
      newMessages: {
        type: Array,
        default: () => [],
      },
      // chatIdsPool: {
      //   type: Array,
      //   default: () => [],
      // },
    },
    computed: {
      lastMsgTime() {
        return this.hasLastMessage ? this.chat.lastMessage.time : "-";
      },
      lastMsg() {
        return this.hasLastMessage ? this.chat.lastMessage.text : "No messages";
      },
      hasLastMessage() {
        return !!this.chat.lastMessage;
      },
      chatClasses() {
        return {
          "chat-item__selected": this.isSelected,
        };
      },
      // hasNewMessage() {
      //   console.log("hasNewMessage");
      //   return this.chatIdsPool.includes(this.chat._id);
      // },
      countNewMessages() {
        return this.newMessages.length;
      },
    },
    methods: {
      selectChat() {
        this.$emit("select-chat", this.chat._id);
      },
    },
  };
</script>

<style lang="scss" scoped>
  // единица  чата
  .chats-list-item {
    display: flex;
    // justify-content: space-between;
    padding: 10px;
    cursor: pointer;
    // padding: 10px 0;
    border-bottom: solid 1px rgba(#000000, 0.1);
    &:hover {
      background-color: rgba($color: #000000, $alpha: 0.1);
    }
    &__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    }
    &__body {
      // flex: 1;
      flex-grow: 1;
      padding: 0 0 0 10px;
    }
    &__last-message {
      margin-bottom: 5px;
    }
    &__badge {
      // margin-left: auto;
      display: block;
      text-align: end;
      font-weight: bold;
    }
  }
</style>
