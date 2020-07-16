<template>
  <div class="chat-info">
    <span class="chat-info__name title-name">{{ chatName }}</span>
    <template v-if="isTyping">
      <typing-loader class="chat-info__typing"></typing-loader>
    </template>
    <template v-else>
      <div class="chat-info__description">
        <p class="chat-info__members">{{ chatCountMembers }} members</p>
      </div>
    </template>
  </div>
</template>

<script>
  import TypingLoader from "@/components/TypingLoader.vue";
  export default {
    name: "ChatCurrentInfo",
    components: {
      TypingLoader,
    },
    props: {
      isTyping: {
        type: Boolean,
        default: false,
      },
      chatName: {
        type: String,
        required: true,
      },
      chatCountMembers: {
        type: Number,
        required: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .chat-info {
    &__description {
      font-size: 0.9rem;
      color: rgba(0, 0, 0, 0.5);
    }
  }
</style>
