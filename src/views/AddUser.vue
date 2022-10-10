/* eslint-disable no-unused-vars */
<template>
    <BaseLayout pageTitle="Add new client" pageDefaultBackPage="/home">
        <CreateUser @save-user="saveUser"/>
        
    </BaseLayout>
   
</template>

<script>
import BaseLayout from "../components/BaseLayout"
import CreateUser from "../components/CreateUser"
// eslint-disable-next-line no-unused-vars
import { IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton } from "@ionic/vue"

export default {
  components: {
      BaseLayout, CreateUser
  },
  props: {
  },
  methods: {
      saveUser(userData){
          console.log(userData)
          this.$store.dispatch('addMemory', userData)
          this.$router.replace('/home')
      }
  }
};
</script>

<style></style>
