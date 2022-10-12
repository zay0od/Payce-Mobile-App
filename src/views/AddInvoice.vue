/* eslint-disable no-unused-vars */
<template>
  <BaseLayout pageTitle="Select Cart Items" pageDefaultBackPage="/home">
  <div class="border flex-column justify-content-between align-items-lg-stretch h-100">
      <div>
          <ProductItem
            @productChange="updateCart"
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
      </div>
  
      <div v-if="cartTotalAmount > 0" class="cart-final-card rounded p-2 px-3">
          <div class="d-flex justify-content-between align-items-center pb-3">
              <h6>Total</h6>
              <h5 class="fw-bold"><small>AED</small> {{ cartTotalAmount }}</h5>
          </div>
          <ion-button expand="block" @click="routToPayment">Proceed to Payment</ion-button>
     </div>


  </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from "../components/BaseLayout";
import ProductItem from "../components/ProductItem";
import { addcircle } from "ionicons/icons";
// eslint-disable-next-line no-unused-vars
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/vue";

export default {
  components: {
    BaseLayout,
    ProductItem,
  },
  data() {
    return {
      addcircle: addcircle,
      cartTotalAmount: 0,
      userCartList: [],
      invoice: {}
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  methods: {
    routToPayment(){
        this.$store.state.invoice.totalAmount = this.cartTotalAmount
        this.$router.push({ name: "FaceDetection", params: { totalAmount: this.cartTotalAmount, }})
    
    },
    updateCart(add, detect) {
      //this.userCartList.push(product)
      if (detect) {
        this.cartTotalAmount -= detect;
      } else {
        this.cartTotalAmount += add;
      }
      //console.log(this.userCartList);
    },

  },
};
</script>

<style>
.cart-final-card{
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fafafa;
}
</style>
