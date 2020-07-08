<template> <div></div> </template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Notifier",
  computed: {
    ...mapGetters(["lastMessage"])
  },
  watch: {
    lastMessage: "showMessage"
  },
  methods: {
    showMessage(message) {
      this.$message({ ...message });
    }
  }
};
</script>

<style lang="sass" scoped></style>
