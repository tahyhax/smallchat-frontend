<template>
  <button @click="doSeeder">doSeeder</button>
</template>

<script>
  import contacts from "../seedData";
  import { mapActions } from "vuex";
  export default {
    name: "seeder",
    data: () => ({
      contactsData: contacts,
    }),
    methods: {
      ...mapActions("user", ["saveUserInfo"]),
      ...mapActions("auth", ["singUp"]),
      doSeeder() {
        for (let contact of this.contactsData) {
          this.saveData(contact);
        }
      },
      async saveData(contact) {
        try {
          const authData = {
            email: contact.email,
            password: contact.email,
          };
          Promise.all([
            await this.singUp(authData),
            await this.saveUserInfo(contact),
          ]);
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
</script>

<style lang="scss" scoped></style>
