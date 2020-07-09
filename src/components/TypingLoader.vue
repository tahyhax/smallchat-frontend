<template>
  <div class="typing-loader">
    <div class="typing-loader__ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <span class="typing-loader__text">typing</span>
  </div>
</template>

<script>
  export default {
    name: "TypingLoader",
  };
</script>

<style lang="scss" scoped>
  .typing-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    &__ellipsis {
      display: inline-block;
      position: relative;
      width: 40px;
      // height: 20px;
      & div {
        position: absolute;
        top: 50%;
        transform: translateY(50%);
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.5);
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
      }
      & div:nth-child(1) {
        left: 5px;
        animation: lds-ellipsis1 0.6s infinite;
      }
      & div:nth-child(2) {
        left: 5px;
        animation: lds-ellipsis2 0.6s infinite;
      }
      & div:nth-child(3) {
        left: 15px;
        animation: lds-ellipsis2 0.6s infinite;
      }
      & div:nth-child(4) {
        left: 32px;
        animation: lds-ellipsis3 0.6s infinite;
      }
    }
    &__text {
      font-size: 0.8rem;
      color: rgba(0, 0, 0, 0.5);
    }
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(10px, 0);
    }
  }
</style>
