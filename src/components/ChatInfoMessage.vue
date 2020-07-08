<template>
  <span class="chat-info-message">
    <slot>
      Plese select chat to start messaging
    </slot>
  </span>
</template>

<script>
export default {
  name: "ChatInfoMessage"
};
</script>

<style lang="scss" scoped>
.chat-info-message {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  margin: 0 auto;
}
</style>
