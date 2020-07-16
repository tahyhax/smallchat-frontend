<template>
  <div class="settings-from">
    <el-card>
      <div class="settings-from__header">
        <slot name="header">
          <h3 class="settings-from__title">Welcome</h3>
          <p class="settings-from__discription">
            Fill in your personal details
          </p>
        </slot>
      </div>
      <div class="settings-from__body">
        <el-form
          :model="formData"
          :rules="rules"
          @submit.native.prevent="onSubmit"
          ref="settingsForm"
        >
          <el-form-item label="First Name" prop="firstName" size="medium">
            <el-input type="text" v-model="formData.firstName"></el-input>
          </el-form-item>
          <el-form-item label="Last Name" prop="lastName" size="medium">
            <el-input type="text" v-model="formData.lastName"></el-input>
          </el-form-item>
          <el-form-item label="Usermane" prop="usermane" size="medium">
            <el-input type="text" v-model="formData.usermane"></el-input>
          </el-form-item>
          <el-form-item label="Phone" prop="phone" size="medium">
            <el-input type="text" v-model="formData.phone"></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="description" size="medium">
            <el-input type="text" v-model="formData.description"></el-input>
          </el-form-item>

          <div class="settings-from__actions">
            <el-button native-type="submit" type="primary" size="medium"
              >Save</el-button
            >
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "SettingsForm",
    data: () => ({
      formData: {
        firstName: "",
        lastName: "",
        username: "",
        phone: "",
        description: "",
      },
      rules: {
        firstName: {
          required: true,
          message: "Please input first name",
          trigger: "blur",
        },
        lastName: {
          required: true,
          message: "Please input last name",
          trigger: "blur",
        },
        phone: {
          // required: true,
          pattern: /\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/,
          message: "Please enter the correct phone number!",
          trigger: "blur",
        },
      },
    }),
    methods: {
      onSubmit() {
        this.$refs.settingsForm.validate((isValid) => {
          if (!isValid) {
            return false;
          }
          this.$emit("on-save", { ...this.formData });
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .settings-from {
    &__header {
      margin-bottom: 15px;
    }
    &__title {
      margin-bottom: 10px;
    }
    &__actions {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
