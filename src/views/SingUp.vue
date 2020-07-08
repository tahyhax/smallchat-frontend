<template>
  <div class="sing-up-page">
    <div class="sing-up-page__inner">
      <div class="login-page__image">
        <img src="@/assets/login-page-bg.png" alt="sing-up bacground" />
      </div>
      <sing-up-form
        class="sing-up-page__from"
        :loading="loginInProgress"
        @on-sign-up="onSingUp"
      ></sing-up-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SingUpForm from "@/components/SingUpForm";
export default {
  name: "login",
  components: {
    SingUpForm
  },
  computed: {
    ...mapGetters("auth", ["loginInProgress", "isFirstLogin"])
  },
  methods: {
    ...mapActions("auth", ["singUp"]),
    async onSingUp(formData) {
      console.log(formData);
      await this.singUp(formData);
    },
    redirectToSettings(val) {
      if (val) {
        this.$router.push({ name: "settings" });
      }
    }
  },
  watch: {
    isFirstLogin: "redirectToSettings"
  }
};
</script>

<style lang="scss" scoped>
.sing-up-page {
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
