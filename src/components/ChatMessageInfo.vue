<template>
  <span class="chat-message-info">
    <slot>
      Plese select chat to start messaging
    </slot>
  </span>
</template>

<script>
  export default {
    name: "ChatMessageInfo",
  };
</script>

<style lang="scss" scoped>
  .chat-message-info {
    font-weight: bold;
    color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    margin: 0 auto;
  }
</style>
