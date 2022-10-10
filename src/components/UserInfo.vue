<template>
  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>{{ user.id }}</ion-card-subtitle>
      <ion-card-title>{{ user.name }}</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <ion-thumbnail slot="start">
        <ion-img :src="user.image"></ion-img>
      </ion-thumbnail>

    </ion-card-content>
  </ion-card>
</template>

<script>
import {
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonThumbnail, IonImg
} from "@ionic/vue";
export default {
  components: {
      IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonThumbnail, IonImg
  },
  props: {
    user: {
      type: Object,
    },
  },
};
</script>

<style></style>
