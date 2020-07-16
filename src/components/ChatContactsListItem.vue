<template>
  <div class="chat-contacts-list-item" @click="selectContact">
    <div class="chat-contacts-list-item__avatar">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </div>
    <div class="chat-contacts-list-item__body">
      <div class="chat-contacts-list-item__info">
        <span class="chat-contacts-list-item__name title-name">
          {{ fullName }}</span
        >
      </div>
      <div class="chat-contacts-list-item__about">
        <!-- <p
          class="chat-contacts-list-item__last-message message-text message-text--ellipsis"
        >
          {{ lastMsg }}
        </p> -->
        <!-- <template v-if="countNewMessages">
          <el-badge
            :value="countNewMessages"
            :max="999"
            type="info"
            class="chat-contacts-list-item__badge"
          >
          </el-badge>
        </template> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ChatContactsListItem",
    props: {
      contact: {
        type: Object,
        require: true,
      },
    },
    computed: {
      fullName() {
        return `${this.contact.firstName} ${this.contact.lastName}`;
      },
    },
    methods: {
      selectContact() {
        this.$emit("select-contact", this.contact._id);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .chat-contacts-list-item {
    display: flex;
    // justify-content: space-between;
    padding: 10px;
    cursor: pointer;
    // padding: 10px 0;
    border-bottom: solid 1px rgba(#000000, 0.1);
    &:hover {
      background-color: rgba($color: #000000, $alpha: 0.1);
    }
    &__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    }
    &__body {
      // flex: 1;
      flex-grow: 1;
      padding: 0 0 0 10px;
    }
    &__last-message {
      margin-bottom: 5px;
    }
    &__badge {
      // margin-left: auto;
      display: block;
      text-align: end;
      font-weight: bold;
    }
  }
</style>
