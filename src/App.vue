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
  * {
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
  }
</style>
