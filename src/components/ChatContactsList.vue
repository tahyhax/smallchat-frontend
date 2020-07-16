<template>
  <div class="chat-user-contacts">
    <template v-for="contact in contacts">
      <chat-contacts-list-item
        :contact="contact"
        :key="contact._id"
        @select-contact="onSelectContact"
      ></chat-contacts-list-item>
    </template>
  </div>
</template>

<script>
  // import { mapGetters } from "vuex";
  import ChatContactsListItem from "@/components/ChatContactsListItem.vue";
  export default {
    name: "ContactsList",
    components: {
      ChatContactsListItem,
    },
    props: {
      contacts: {
        type: Array,
        require: true,
      },
    },
    // computed: {
    //   ...mapGetters("user", ["userContacts"]),
    // },
    methods: {
      onSelectContact(contactId) {
        this.$emit("select-contact", contactId);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .chat-user-contacts {
    overflow-y: scroll;
    // overflow: hidden;
    height: 100%;
  }
</style>
