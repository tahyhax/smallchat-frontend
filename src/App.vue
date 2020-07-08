<template>
  <div id="app">
    <Notifier />
    <router-view />
  </div>
</template>
<script>
  import Notifier from "@/components/Notifications";
  export default {
    name: "App",
    components: {
      Notifier,
    },
  };
</script>
<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }

  // title чатов
  .title-name {
    font-size: 1.1rem;
    font-weight: bold;
  }
  //блок с временем
  .message-date {
    font-size: 0.8rem;
    color: rgba($color: #000000, $alpha: 0.4);
  }
  .message-text {
    font-size: 1rem;
    line-height: 1.3em;
    &--ellipsis {
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
    }
  }
</style>
