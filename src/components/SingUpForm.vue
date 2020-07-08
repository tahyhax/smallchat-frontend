<template>
  <div class="sing-up">
    <div class="sing-up__header">
      <h1 class="sing-up__title">SingUp</h1>
      <p class="sing-up__description">
        If you don’t have an account yet, go through the registration process.
        It will not take much time.
      </p>
    </div>
    <div class="sing-up__body">
      <el-form
        :model="formData"
        :rules="rules"
        @submit.native.prevent="onSubmit"
        ref="singUpForm"
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
        <el-form-item label="Confirm" prop="confirmPassword" size="medium">
          <el-input
            v-model="formData.confirmPassword"
            type="password"
            :show-password="true"
          ></el-input>
        </el-form-item>
        <!-- <router-link :to="{ name: 'forgot-password' }">
        <el-link type="info">Forgot password? Reset password</el-link>
      </router-link> -->

        <div class="sing-up__actions">
          <el-button
            type="success"
            plain
            size="medium"
            native-type
            :loading="loading"
            >Sing Up</el-button
          >
        </div>
      </el-form>
    </div>
    <div class="sing-up__footer">
      Already have an account?
      <div class="sign_up-footer-link">
        <router-link :to="{ name: 'Login' }">
          <ElLink type="primary" :underline="false">Log In</ElLink>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SingUpForm",
  data() {
    const confirmPassword = (rule, value, next) => {
      if (value === "") {
        next(new Error("Please input the password again"));
      } else if (value !== this.formData.password) {
        next(new Error("Attention! The entered passwords do not match!"));
      } else {
        next();
      }
    };
    return {
      formData: {
        email: "",
        password: "",
        confirmPassword: ""
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input  email",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please input correct email",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please input password",
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            required: true,
            validator: confirmPassword,
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    loading: {
      type: Boolean,
      default: () => false
    }
  },

  methods: {
    onSubmit() {
      this.$refs.singUpForm.validate(isValid => {
        if (!isValid) {
          return false;
        }
        this.$emit("on-sign-up", { ...this.formData });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sing-up {
  margin: 0 auto;
  padding: 15px;
  max-width: 33.333%;
  &__header {
    margin-bottom: 15px;
  }
  &__body {
    display: flex;
    margin-bottom: 10px;
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
  }
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
