<template>
  <IonPage>
    <IonHeader>

      <ion-toolbar>
        <ion-buttons slot="start" v-if="pageDefaultBackPage">
          <ion-back-button
            :default-href="pageDefaultBackPage"
          ></ion-back-button>
        </ion-buttons>

        <IonTitle>{{ pageTitle }}</IonTitle>
        
        <ion-buttons slot="end">
          <slot name="actions-end"></slot>
        </ion-buttons>
      </ion-toolbar>

    
    </IonHeader>

    <IonContent>
      <slot />
    </IonContent>

  </IonPage>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
  },
  props: {
    pageTitle: {
      type: String,
      default: "Page Title",
    },
    pageDefaultBackPage: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
