<template>
  <div class="login-page">
    <div class="login-page__inner">
      <div class="login-page__image">
        <img src="@/assets/login-page-bg.png" alt="login bacground" />
      </div>
      <login-form
        class="login-page__from"
        :loading="loginInProgress"
        @on-sign-in="onSingIn"
      ></login-form>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import LoginForm from "@/components/LoginForm";
  export default {
    name: "login",
    components: {
      LoginForm,
    },
    computed: {
      ...mapGetters("auth", ["loginInProgress", "isLoggedIn"]),
    },
    methods: {
      ...mapActions("auth", ["login"]),
      onSingIn(formData) {
        console.log(formData);
        this.login(formData);
      },
      redirectToHome(val) {
        if (val) {
          this.$router.push({ name: "home" });
        }
      },
    },
    watch: {
      isLoggedIn: "redirectToHome",
    },
  };
</script>

<style lang="scss" scoped>
  .login-page {
    background-color: #d5e4e4;
    height: 100vh;
    min-height: 780px;
    display: flex;
    justify-content: center;
    align-items: center;
    &__inner {
      width: 100%;
      max-width: 1000px;
      background-color: #fff;
      border-radius: 20px;
      display: flex;
      align-items: center;
      box-shadow: 0 30px 90px #a7d7d9;
      height: 600px;
      overflow: hidden;
    }
    &__image {
      height: 100%;
      overflow: hidden;
      & img {
        display: block;
        overflow: hidden;
        transform: scale(1.2);
      }
    }
  }
</style>
