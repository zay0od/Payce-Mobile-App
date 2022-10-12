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

      
        <!-- <ion-buttons slot="end">
          <slot name="actions-start">
            <ion-button router-link="/face-detection">Pay by face</ion-button>
          </slot>
        </ion-buttons> -->




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
  IonButton,
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
    IonButton,
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
