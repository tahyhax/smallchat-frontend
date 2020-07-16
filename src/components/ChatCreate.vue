<template>
  <div class="chat-create">
    <el-dialog :title="title" :visible.sync="dialogVisible">
      <el-form
        :model="formData"
        :rules="rules"
        @submit.native.prevent="onSubmit"
        ref="createForm"
      >
        <el-form-item label="Name" prop="name" :label-width="formLabelWidth">
          <el-input v-model="formData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="Description"
          prop="description"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="formData.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="Type" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="Type">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <chat-contacts-list
          :contacts="userContacts"
          class="chat-create__contacts-list"
          @select-contact="onSelectContact"
        ></chat-contacts-list>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" :disabled="canCreateChat" @click="onCreate"
          >Create</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Listeners from "@/plugins/socket/listeners";
  import Emitters from "@/plugins/socket/emitters";

  import ChatContactsList from "@/components/ChatContactsList.vue";
  import { mapActions, mapGetters } from "vuex";
  export default {
    name: "ChatCreate",
    components: {
      ChatContactsList,
    },
    data: () => ({
      // dialogTableVisible: true,
      dialogVisible: true,
      title: "Chat create",
      selectedContacts: [],
      formData: {
        name: "",
        description: "",
        type: "public",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input  name",
            trigger: "blur",
          },
        ],
      },
      options: [
        {
          value: "private",
          label: "Private",
        },
        {
          value: "public",
          label: "Public",
        },
      ],
      value: "",
      formLabelWidth: "120px",
    }),
    computed: {
      ...mapGetters("user", ["userContacts", "currentUserId"]),
      canCreateChat() {
        return !this.selectedContacts.length;
      },
      // isPublic() {
      //   return this.form.type === "public";
      // },
    },
    mounted() {
      this.getUserContacts();
      this.$socket.on(Listeners.NEW_CHAT, (chat) => {
        if (chat) {
          this.createChat(chat);
          this.dialogVisible = false;
        }
      });
    },
    methods: {
      ...mapActions("user", ["getUserContacts"]),
      onSelectContact(contactId) {
        const index = this.selectedContacts.indexOf(contactId);
        if (index !== -1) {
          this.selectedContacts.splice(index, 1);
        } else {
          this.selectedContacts.push(contactId);
        }
      },
      async onCreate() {
        const data = {
          ...this.formData,
          users: [...this.selectedContacts, this.currentUserId],
          type: "public",
        };

        this.$socket.emit(Emitters.NEW_CHAT, data);
        // const chat = await this.createChat(data);
        // if (chat) {
        //   this.dialogVisible = false;
        // }
        // console.log(chat);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .chat-create {
    height: 80vh;
    &__contacts-list {
      height: 500px;
    }
  }
</style>
