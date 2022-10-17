/* eslint-disable vue/no-unused-components */

<template>
    <BaseLayout pageTitle="Admin Screen Payce Home">
    
    <template v-slot:actions-end>

        <!-- <ion-button router-link="/new-user">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
        </ion-button> -->

         <ion-button router-link="/add-invoice">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
        </ion-button>

        <!-- <ion-button router-link="/face-detection">
            Pay by Face
        </ion-button> -->


    </template>


    <IonList>
            <IonItem v-for="client in clients" :key="client.id" :router-link="`/details/${client.id}`">
                <IonThumbnail slot="start">
                    <img :src="client.image" />
                </IonThumbnail>
                <IonLabel>{{ client.name }}</IonLabel>
            </IonItem>
    </IonList>
    

    </BaseLayout>
</template>

<script>
import { IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonIcon } from "@ionic/vue"

// eslint-disable-next-line no-unused-vars
import { add } from "ionicons/icons"
import BaseLayout from "../components/BaseLayout"

export default {
    components: {
        // eslint-disable-next-line vue/no-unused-components
        IonList, IonItem, BaseLayout, IonThumbnail, IonLabel, IonButton, IonIcon
    },
    computed: {
        clients(){
            return this.$store.getters.clients
        }
    },
    data(){
        return{
            add: add
        }
    }

}
</script>

<style>

</style>