<template>
  <div class="home">
    <div class="home__inner">
      <Aside />
      <current-chat></current-chat>
      <el-button type="danger" @click="onClick">Logout</el-button>
    </div>
  </div>
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
  .home {
    height: 100vh;
    background-color: #dcb4f2;
    display: flex;
    justify-content: center;
    align-items: center;
    &__inner {
      display: grid;
      grid-template-columns: minmax(10%, 40%) minmax(60%, 90%);
      width: 100%;
      max-width: 1100px;
      height: 100%;
      max-height: 90%;
      box-shadow: 0 3px 10px rgba(105, 50, 201, 0.4);
    }
  }
</style>
