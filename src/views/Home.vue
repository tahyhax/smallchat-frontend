<template>
  <div class="chat">
    <div class="chat__inner">
      <Aside class="chat__aside" />
      <main class="chat__page">
        <current-chat></current-chat>
      </main>
    </div>
  </div>
  <!-- <div class="home">
    <div class="home__inner">
      <Aside />
      <current-chat></current-chat>
      <el-button type="danger" @click="onClick">Logout</el-button>
    </div>
  </div> -->
</template>

<script>
  // @ is an alias to /src
  import Aside from "@/components/Aside";
  import CurrentChat from "@/components/CurrentChat";

  import { mapActions } from "vuex";
  export default {
    name: "Home",
    components: {
      Aside,
      CurrentChat,
    },
    methods: {
      ...mapActions("auth", ["logout"]),
      async onClick() {
        await this.logout();
        this.$router.push({ name: "login" });
      },
    },
  };
</script>
<style lang="scss">
  body {
    overflow: hidden;
  }
  .chat {
    &__inner {
      display: flex;
      // padding: 15px;
    }
    &__aside {
      flex: 0 0 4/12 * 100%;
      max-width: 4/12 * 100%;
    }
    &__page {
      display: flex;
      flex: 1;
      // display: flex;
      // flex-direction: column;
      // justify-content: space-between;
    }
  }
  // .page {
  //   &__header {
  //     display: flex;
  //     padding: 10px;
  //     height: 55px;
  //   }
  //   &__body {
  //     flex: 1;
  //   }
  // }
</style>
