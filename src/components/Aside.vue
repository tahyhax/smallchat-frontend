<template>
  <!-- <aside class="aside">
    <aside-user-info></aside-user-info>
    <chats-list></chats-list>
  </aside> -->

  <aside class="chat__aside aside">
    <div class="aside__header">
      <div class="aside__drawer chat-drawer">
        <!-- <el-button
          class="chat-drawer__button"
          type="text"
          icon="el-icon-s-fold"
          @click="drawer = true"
        >
        </el-button>
        <el-drawer
          title="I am the title"
          :visible.sync="drawer"
          :direction="direction"
        >
          <span>Hi, there!</span>
        </el-drawer> -->
      </div>
      <div class="aside__search search">
        <!-- <el-input
          class="search--input"
          placeholder="Search"
          size="medium"
          v-model="searchInput"
          clearable
        >
        </el-input> -->
      </div>
    </div>
    <div class="aside__body">
      <chats-list></chats-list>
    </div>
  </aside>
</template>

<script>
  // import AsideUserInfo from "@/components/AsideUserInfo";
  import ChatsList from "@/components/ChatsList";
  export default {
    name: "Aside",
    components: {
      // AsideUserInfo,
      ChatsList,
    },
  };
</script>

<style lang="scss" scoped>
  // левый  блок
  .aside {
    // display: flex;
    // flex-wrap: wrap;
    &__header {
      display: flex;
      padding: 10px;
      height: 55px;
      // margin: 0 0 15px;
    }
    &__body {
      height: calc(100vh - 55px);
      // padding: 10px;
    }
    &__search {
      flex-grow: 1;
    }
    &__drawer {
      margin-right: 10px;
    }
  }
  // бокове  меню временно
  .chat-drawer {
    &__button {
      font-size: 2em;
      padding: 0;
    }
  }
</style>
