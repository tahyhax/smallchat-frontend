<template>
  <div class="login-form">
    <h1 class="login-form__title">Welcome</h1>
    <p class="login-form__description">
      To use the chat you need to log in
    </p>
    <el-form
      :model="formData"
      :rules="rules"
      @submit.native.prevent="onSubmit"
      ref="loginForm"
    >
      <el-form-item label="Email" prop="email" size="medium">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password" size="medium">
        <el-input
          v-model="formData.password"
          type="password"
          :show-password="true"
        ></el-input>
      </el-form-item>
      <router-link :to="{ name: 'forgot-password' }">
        <el-link type="info">Forgot password? Reset password</el-link>
      </router-link>

      <div class="login-form__actions">
        <el-button
          type="success"
          plain
          size="medium"
          native-type
          :loading="loading"
          >Login</el-button
        >
      </div>
      <router-link :to="{ name: 'sing-up' }">
        <el-link type="primary">SingUp</el-link>
      </router-link>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: "LoginForm",
    data: () => ({
      formData: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input  email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input correct email",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please input password",
            trigger: "blur",
          },
        ],
      },
    }),
    props: {
      loading: {
        type: Boolean,
        default: () => false,
      },
    },

    methods: {
      onSubmit() {
        this.$refs.loginForm.validate((isValid) => {
          if (!isValid) {
            return false;
          }
          this.$emit("on-sign-in", { ...this.formData });
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .login-form {
    margin: 0 auto;
    &__title {
      margin-bottom: 10px;
    }
    &__description {
      font-size: 16/15 1em;
      margin-bottom: 15px;
      color: rgba(#000000, 0.6);
    }
    &__actions {
      margin: 10px 0 15px;
    }
  }
</style>
