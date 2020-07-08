<template>
  <div class="user-info">
    <div class="user-info__inner">
      <router-link class="user-info__link" :to="{ name: 'settings' }">
        <span class="user-info__avatar"
          ><i class="el-icon-user-solid"></i
        ></span>
      </router-link>
      <span class="user-info__name">{{ fullName }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AsideUserInfo",
  computed: {
    ...mapGetters("user", ["fullName"])
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  background-color: #6d74b8;
  box-shadow: 0 30px 20px -15px rgb(101, 64, 180);
  &__inner {
    padding: 20px 10px;
    display: flex;
    align-items: center;
  }
  &__avatar {
    width: 40px;
    height: 40px;
    font-size: 20px;
    border-radius: 50%;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__name {
    font-size: 16px;
    color: #fff;
    margin-left: 15px;
  }
}
</style>
