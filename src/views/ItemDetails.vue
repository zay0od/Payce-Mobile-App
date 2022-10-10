
<template>
    <BaseLayout pageTitle="Payce Item Details" pageDefaultBackPage="/home" >
    <IonList>
            <IonItem>
                <UserInfo :user="loadedClients"/>
            </IonItem>
    </IonList>
    </BaseLayout>
</template>

<script>
import { IonList, IonItem } from "@ionic/vue"
import BaseLayout from "../components/BaseLayout"
import UserInfo from "../components/UserInfo"

export default {
    components: {
        IonList, IonItem, BaseLayout, UserInfo
    },
    data(){
        return{
            userId: this.$route.params.id
        }
    },
    computed: {
        loadedClients(){
            return this.$store.getters.client(this.userId)
        }
    },
    watch: {
        $route(currentRoute){
            this.userId = currentRoute.params.id
        }
    }

}
</script>

<style>

</style>