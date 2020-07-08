<template>
  <div class="message">
    <div class="message__avatar">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </div>
    <div class="message__body">
      <span class="message__owner title-name">{{ fullName }}</span>
      <p class="message__text message-text">
        {{ message.text }}
      </p>
      <span class="message__date message-date">
        {{ message.time | parsedTime }}
      </span>
    </div>
  </div>
  <!-- <div class="chat-message">
    <div class="chat-message__inner">
      <div class="chat-message__avatar"><i class="el-icon-user-solid"></i></div>
      <div class="chat-message__body">
        <span class="chat-message__owner">{{ fullName }}</span>
        <p class="chat-message__text">{{ message.text }}</p>
        <div class="chat-message__info">
          <span class="chat-message__time">{{
            message.time | parsedTime
          }}</span>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
  export default {
    name: "ChatMessage",
    props: {
      message: {
        type: Object,
        required: true,
      },
    },
    computed: {
      owner() {
        return this.message.user;
      },
      fullName() {
        return `${this.owner.firstName} ${this.owner.lastName}`;
      },
      // classMessage(userId) {
      //   return {
      //     "message--owner": this.isOwner,
      //   };
      // },
    },
    // methods: {
    //   timestampTo,
    // },
  };
</script>

<style lang="scss" scoped>
  //message in chat
  .message {
    display: flex;
    // &--is-owner {
    //   margin-left: auto;
    // }
    &__body {
      display: flex;
      flex-direction: column;
      // flex: 1;
      flex-wrap: wrap;
      padding-left: 10px;
      margin-bottom: 5px;
    }
    &__text {
      margin-bottom: 5px;
      word-break: break-all;
    }
    &__date {
      margin-left: auto;
      // text-align: end;
    }
  }

  // .chat-message {
  //   &__inner {
  //     // padding: 15px 20px;

  //     display: flex;
  //     // align-items: center;

  //     margin-bottom: 15px;

  //     cursor: pointer;
  //     transition: all 0.2s ease-in;
  //   }
  //   &__avatar {
  //     display: flex;
  //     position: relative;
  //     justify-content: center;
  //     align-items: center;
  //     border: 2px solid rgba(255, 255, 255, 0.5);
  //     border-radius: 50%;
  //     background-color: #c8c7ed;
  //     width: 50px;
  //     height: 50px;
  //   }
  //   &__body {
  //     flex: 1;
  //     margin-left: 15px;
  //     padding: 15px;
  //     box-shadow: 0 0 10px rgba(101, 64, 180, 0.1);
  //     border-radius: 0.5em;
  //   }
  //   &__owner {
  //     margin: 0 0 10px 0;
  //     display: inline-flex;
  //     font-weight: bold;
  //   }
  //   &__text {
  //     margin-bottom: 10px;
  //     word-break: break-all;
  //   }
  //   &__info {
  //     display: flex;
  //     justify-content: flex-end;
  //   }
  //   &__time {
  //     font-size: 13/16 * 1rem;
  //     color: rgba(0, 0, 0, 0.5);
  //   }
  // }
</style>
