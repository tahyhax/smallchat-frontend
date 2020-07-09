<template>
  <div class="messages">
    <template v-if="hasMesssages">
      <template v-for="(message, key) in messages">
        <chat-message
          class="messages__item"
          :class="classMessage(message.user._id)"
          :message="message"
          :key="key"
        ></chat-message>
      </template>
      <template v-if="isTyping">
        <typing-loader class="messages__typing"></typing-loader>
      </template>
    </template>
    <template v-else>
      <chat-message-info class="messages__info-message">
        There are no messages in this chat yet
      </chat-message-info>
    </template>
    <!-- <chat-message
      class="messages__item"
      :class="classMessage(message.user._id)"
      :message="message"
      :key="key"
    ></chat-message> -->
    <!-- <div class="messages__item message message--is-owner">
      <div class="message__avatar">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </div>
      <div class="message__body">
        <span class="message__owner title-name">Denis</span>
        <p class="message__text message-text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti
          quasi minima in laboriosam. Facilis ut in nobis eos. Eveniet eius
          eligendi vitae sapiente ipsa consequatur adipisci laboriosam delectus
          non harum.
        </p>
        <span class="message__date message-date">20:55</span>
      </div>
    </div> -->
  </div>
  <!-- <div class="messages" v-scrollDown="messages.length">
    <template v-if="hasMesssages">
      <template v-for="(message, key) in messages">
        <chat-message
          class="messages__item"
          :class="classMessage(message.user._id)"
          :message="message"
          :key="key"
        ></chat-message>
      </template>
      <template v-if="isTyping">
        <typing-loader class="messages__typing"></typing-loader>
      </template>
    </template>
    <template v-else>
      <chat-info-message class="messages__info-message">
        There are no messages in this chat yet
      </chat-info-message>
    </template>
  </div> -->
</template>

<script>
  import ChatMessage from "@/components/ChatMessage.vue";
  import ChatMessageInfo from "@/components/ChatMessageInfo.vue";
  import TypingLoader from "@/components/TypingLoader.vue";
  export default {
    name: "ChatMessages",
    components: {
      ChatMessage,
      ChatMessageInfo,
      TypingLoader,
    },
    props: {
      messages: {
        type: Array,
        default: () => [],
      },
      currentUser: {
        type: Object,
        required: true,
      },
      isTyping: {
        type: Boolean,
        default: true,
      },
    },
    directives: {
      scrollDown: {
        componentUpdated(el, binding) {
          if (!binding.value) {
            return;
          }
          el.scrollTop = el.scrollHeight;
          // console.log(el);
          // console.log(binding);
        },
      },
    },
    computed: {
      hasMesssages() {
        return !!this.messages.length;
      },
    },
    methods: {
      classMessage(userId) {
        return {
          "messages__item--is-owner": this.currentUser._id === userId,
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  .messages {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-y: scroll;
    height: 100%;
    &__item {
      // flex: 0 0 7/12 * 100%;
      max-width: 7/12 * 100%;
      margin-bottom: 15px;
      &--is-owner {
        margin-left: auto;
      }
    }
  }
  // .messages {
  //   position: relative;
  //   // display: flex;
  //   flex-wrap: wrap;
  //   flex-direction: column;
  //   flex-grow: 1;
  //   // padding: 15px 20px;
  //   overflow-y: auto;
  //   max-height: 75vh;
  //   &__item {
  //     max-width: 7/12 * 100%;
  //     min-width: 3/12 * 100%;
  //     &--owner {
  //       margin-left: auto;
  //     }
  //   }
  //   &__info-message {
  //     position: relative;
  //     top: 40%;
  //   }
  // }
</style>
