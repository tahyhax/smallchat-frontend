<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button type="danger" @click="onClick">Logout</el-button>
  </div>
</template>

<script>
  // @ is an alias to /src
  import { mapActions } from "vuex";
  export default {
    name: "Home",
    methods: {
      ...mapActions("auth", ["logout"]),
      async onClick() {
        await this.logout();
        this.$router.push({ name: "login" });
      },
    },
  };
</script>
