<template>
    <form class="ion-padding" @submit.prevent="submitForm">
         <IonList>
            <IonItem>
                <IonLabel position="floating" >Name</IonLabel>
                <IonInput type="text" v-model="name" required/>
            </IonItem>

             <IonItem>
                <!-- <IonLabel position="floating">Image</IonLabel>
                <IonInput type="text" v-model="image"  required/> -->

                <ion-thumbnail slot="start">
                    <img v-if="previewImageUrl" :src="previewImageUrl" />
                </ion-thumbnail>

                <ion-button type="button" @click="takeImage">
                    <ion-icon :icon="camera" slot="start"></ion-icon>
                    Take Photo
                </ion-button>
            </IonItem>

             <IonItem>
                <IonLabel position="floating">Pin</IonLabel>
                <IonInput type="number" v-model="pin"  required />
            </IonItem>
        </IonList>

        <IonButton expand="full" type="submit" >Add User</IonButton>
    </form>
</template>


<script>
// eslint-disable-next-line no-unused-vars
import { IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonThumbnail, IonIcon } from "@ionic/vue"
import { camera } from "ionicons/icons"
//import { Plugins } from "@capacitor/core"
//const { Camera, CameraResultType, CameraSource } = Plugins

import { Camera, CameraResultType } from '@capacitor/camera';



export default {
  emits:['save-user'],
  components: {
    IonList, IonItem, IonLabel, IonInput, IonButton, IonThumbnail, IonIcon
  },
  data(){
      return{
          name: '',
          image: '',
          pin: null,
          camera,
          chosenImageUrl: null
      }
  },
  methods: {
      submitForm(){
          this.$emit('save-user', {
              name: this.name,
              image: this.chosenImageUrl,
              pin: this.pin
          })
      },
    async takeImage(){
          
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri
            });

            // image.webPath will contain a path that can be set as an image src.
            // You can access the original file using image.path, which can be
            // passed to the Filesystem API to read the raw data of the image,
            // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
            var imageUrl = image.webPath;

            // Can be set to the src of an image now
            this.chosenImageUrl = imageUrl;
            


      }
  }



};
</script>

<style></style>