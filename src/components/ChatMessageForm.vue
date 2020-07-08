<template>
  <div class="chat-message-form">
    <template v-if="isJoin">
      <el-input
        class="chat-message-form__text"
        v-model="text"
        type="textarea"
        resize="none"
        placeholder="Write a message..."
        @input="onInputMessage"
      ></el-input>
      <el-button
        v-if="isText"
        class="chat-message-form__button-send"
        type="default"
        icon="el-icon-s-promotion"
        circle
        @click="sendMessage"
      ></el-button>
    </template>
    <template v-else>
      <div class="chat-message-form__join-chat join-chat">
        <span class="join-chat__text">Pelase join chat</span>
        <el-button
          class="join-chat__button"
          type="primary"
          size="medium"
          @click="joinChat"
          >Join</el-button
        >
      </div>
    </template>
  </div>
  <!-- <div class="chat-message-form">
    <div class="chat-message-form__inner">
      <template v-if="isJoin">
        <el-input
          v-model="text"
          class="message-control chat-message-form__message-control"
          type="textarea"
          resize="none"
          @input="onInputMessage"
        ></el-input>
        <el-button
          v-if="isText"
          type="primary"
          size="medium"
          icon="el-icon-message"
          circle
          @click="sendMessage"
        ></el-button>
      </template>
      <template v-else>
        <div class="chat-message-form__join-chat join-chat">
          <span class="join-chat__text">Pelase join chat</span>
          <el-button
            class="join-chat__button"
            type="primary"
            size="medium"
            @click="joinChat"
            >Join</el-button
          >
        </div>
      </template>
    </div>
  </div> -->
</template>

<script>
  export default {
    name: "ChatMessageForm",
    data: () => ({
      text: "",
      rules: {
        text: {
          required: true,
          message: "Please input  email",
          trigger: "submit",
        },
      },
    }),
    props: {
      isJoin: {
        type: Boolean,
        reauired: true,
      },
    },
    computed: {
      isText() {
        return !!this.text;
      },
    },
    methods: {
      sendMessage() {
        this.$emit("send-message", this.text);
        this.text = "";
      },
      joinChat() {
        this.$emit("join-chat");
      },
      onInputMessage() {
        this.$emit("typing");
        console.log(this.text);
      },
      //   sendMessage() {
      //     this.$emit("send-message", this.text);
      //   },
    },
  };
</script>

<style lang="scss" scoped>
  .chat-message-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;

    &__button-send {
      margin-left: 10px;
      border: none;
      font-size: 1.5em;
      padding: 0;
      &:hover {
        background: none;
      }
    }
    &__text {
      ::v-deep textarea {
        border: none;
      }
    }
  }
  // .chat-message-form {
  //   min-height: 15vh;
  //   margin-top: auto;
  //   display: flex;
  //   // padding: 10;
  //   background-color: #fff;
  //   align-items: center;
  //   margin: 0 -20px;
  //   &__inner {
  //     flex: auto;
  //     padding: 10px;
  //   }
  //   &__join-chat {
  //     padding: 25px 0;
  //   }
  //   &__message-control >>> .el-textarea__inner {
  //     border: none;
  //     // margin-right: 20px;
  //     resize: none;
  //   }
  //   // &__message-control >>> .el-textarea__inner {
  //   //   border: none;
  //   //   outline: none;
  //   // }
  // }

  .join-chat {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    &__text {
      margin-right: 10px;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.6);
    }
  }
</style>
