<template>
  <div class="settings-page">
    <settings-form class="settings-page__from" @on-save="onSave">
    </settings-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SettingsForm from "@/components/SettingsForm";
export default {
  name: "FirstLogin",
  components: {
    SettingsForm
  },
  methods: {
    ...mapActions("user", ["saveUserInfo"]),
    async onSave(data) {
      await this.saveUserInfo(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.settings-page {
  display: flex;
  align-items: center;
  justify-content: center;
  &__from {
    padding: 25px;
    width: 4/12 * 100%;
  }
}
</style>
