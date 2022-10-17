/* eslint-disable no-unused-vars */
<template>
  <ion-item class="d-flex justify-content-between w-100">
    <ion-label>
      <h2>{{ product.name }}</h2>
      <p>{{ product.describtion }}</p>
    </ion-label>

    <ion-label class="text-end"
      ><p>AED {{ product.price }}</p></ion-label
    >
    <div class="d-flex align-items-center justify-content-center">
      <button @click="removeFromCart">-</button>
      <p class="p-0 m-0 px-1">{{ count }}</p>
      <button @click="addToCart">+</button>
    </div>
  </ion-item>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import {
//   IonList,
//   IonItem,
//   IonLabel,
//   IonInput,
//   IonTextarea,
//   IonButton,
// } from "@ionic/vue";

export default {
  components: {},
  props: ["product"],
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    removeFromCart() {
      if (!(this.count === 0)) {
        this.count = this.count - 1;
        this.$emit(
          "productChange",
          this.count * this.product.price,
          this.product.price
        );
      } else {
        this.count = 0;
      }

      this.$store.state.invoice.products[this.product.id] = {
          count: this.count,
          price: this.product.price,
          name: this.product.name
      }
    },
    addToCart() {
      this.count = this.count + 1;

      this.$store.state.invoice.products[this.product.id] = {
          count: this.count,
          price: this.product.price,
          name: this.product.name
      }

      this.$emit("productChange", this.product.price);

      
    },
  },
  computed: {
    totalProductPrice() {
      return this.product.price * this.count;
    },
  },
  watch: {
    count() {
      //console.log("Total: ", this.product.price*this.count)
      //this.$emit('productChange', { id: this.product.id,  count: this.count, price: this.count*this.product.price  })
    },
  },
};
</script>

<style></style>
