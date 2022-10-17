/* eslint-disable no-unused-vars */
<template>
  <BaseLayout
    class="face-api-outer"
    pageTitle="Payce Item Details"
    pageDefaultBackPage="/home"
  >
    <ion-progress-bar
      v-if="!loaded"
      type="indeterminate"
      color="primary"
    ></ion-progress-bar>

    <div
      class="canvas-body d-flex justify-content-center align-content-center p-2"
    >
      <ion-card class="w-100 m-3">
        <ion-card-header>
          <ion-card-title>Cart Summary</ion-card-title>
          <ion-card-subtitle>My Cart</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <table class="w-100">
              <thead>
                <tr>
                  <th scope="col"><small>Product name</small></th>
                  <th scope="col"><small>Qty</small></th>
                  <th class="ps-3" scope="col"><small>Price</small></th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="product in Object.keys(cartSummary.products)"
                  :key="product.name"
                >
                
                  <td v-if="cartSummary.products[product].count > 0">
                    <h6>{{ cartSummary.products[product].name }}</h6>
                  </td>
                  <td v-if="cartSummary.products[product].count > 0">
                    <h6>{{ cartSummary.products[product].count }}</h6>
                  </td>
                  <td class="ps-3" v-if="cartSummary.products[product].count > 0">
                    <h6>{{ cartSummary.products[product].price }}</h6>
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              class="d-flex border-top mt-4 pt-1 justify-content-between align-items-center summary-footer"
            >
              <h5>Total</h5>
              <h5>
                <small class="pe-2">AED</small>{{ cartSummary.totalAmount }}
              </h5>
            </div>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <div v-show="!loaded">
        <h3>Loading Face Recognition Model...</h3>
      </div>

      <div v-show="loaded" class="ai-res-container">
        <div>
          <div v-if="!detectedlabels.length">
            <h3>Please Scan your face to pay</h3>

            <input
              type="file"
              id="imageUpload"
              capture="user"
              accept="image/*"
            />
          </div>

          <div
            v-else-if="detectedlabels.includes('unknown')"
            class="face-is-detected"
          >
            <h3>Sorry no faces has been detected</h3>
            <input
              type="file"
              id="imageUpload"
              capture="user"
              accept="image/*"
            />
          </div>

          <div v-else class="face-is-detected">
            <img
              class="border loaded-img rounded"
              :src="loadedImgSource"
              :alt="`${detectedlabels} face image`"
            />
            <h3>Welcome, {{ detectedlabels[0] }}</h3>
            <div>
              <h4><small>Please enter 4 digit PIN</small></h4>
              <!-- Number type input -->
              <IonInput
                v-model="passCode"
                type="password"
                class="border"
                :maxlength="4"
                placeholder="* * * *"
              ></IonInput>
              <ion-button
                :disabled="!validCheckout"
                class="pt-3 w-100"
                @click="checkOut()"
                expand="block"
                >Checkout</ion-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import * as faceapi from "../AIFaceID/face-api.min.js";
import BaseLayout from "../components/BaseLayout";
import {
  IonProgressBar,
  IonInput,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  alertController,
} from "@ionic/vue";

export default {
  components: {
    BaseLayout,
    IonInput,
    IonProgressBar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
  },
  data() {
    return {
      loaded: false,
      detectedlabels: [],
      loadedImgSource: null,
      passCode: "",
    };
  },
  methods: {
    checkOut() {
      this.presentAlert();
    },
    async presentAlert() {
      const alert = await alertController.create({
        header: "✅ Sucess Payment",
        subHeader: "We recived your payment",
        message: "Thank you!",
        buttons: [
          {
            text: "Confirm",
            role: "confirm",
            handler: () => {
              this.$router.replace("/home");
            },
          },
        ],
      });

      await alert.present();
    },
    async start() {
      const imageUpload = document.getElementById("imageUpload");

      const container = document.createElement("div");
      container.classList.add("canvas");
      //document.getElementById("face-detection-outer").append(container);

      const labeledFaceDescriptors = await this.loadLabeledImages();
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
      let image;
      let canvas;
      //document.p.append("Loaded");

      imageUpload.addEventListener("change", async () => {
        if (image) image.remove();
        if (canvas) canvas.remove();

        image = await faceapi.bufferToImage(imageUpload.files[0]);
        console.log(image);
        this.loadedImgSource = image.src; //store Image Source

        container.append(image);
        canvas = faceapi.createCanvasFromMedia(image);
        //container.append(canvas);
        const displaySize = { width: image.width, height: image.height };
        faceapi.matchDimensions(canvas, displaySize);
        const detections = await faceapi
          .detectAllFaces(image)
          .withFaceLandmarks()
          .withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        const results = resizedDetections.map((d) =>
          faceMatcher.findBestMatch(d.descriptor)
        );
        results.forEach((result, i) => {
          //const box = resizedDetections[i].detection.box;
          //const drawBox = new faceapi.draw.DrawBox(box, {
          //  label: result.toString(),
          //});
          //drawBox.draw(canvas);
          console.table(result);
          this.detectedlabels.push(result.label.toString());
          //myface = result.label.toString();
          //if (myface == "sohrab") document.body.append("true");
        });
      });
      //document.body.append("Loaded2");
      this.loaded = true;
    },
    runAi() {
      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      ]).then(() => {
        this.start();
        console.log("abu baker here ");
      });
    },

    loadLabeledImages() {
      const labels = ["sohrab", "Zayed", "Abubaker"];//Test imageas labels
      return Promise.all(
        labels.map(async (label) => {
          const descriptions = [];
          for (let i = 1; i <= 2; i++) {
            const img = await faceapi.fetchImage(
              `https://example.com/labeled_images/${label}/${i}.jpg`
            );
            const detections = await faceapi
              .detectSingleFace(img)
              .withFaceLandmarks()
              .withFaceDescriptor();
            descriptions.push(detections.descriptor);
          }

          return new faceapi.LabeledFaceDescriptors(label, descriptions);
        })
      );
    },
  },
  computed: {
    validCheckout() {
      let user = this.$store.state.clients.filter((user) => {
        return user.id == this.detectedlabels[0];
      });
      let isValid = this.passCode == user[0].pin;

      return isValid;
      //console.log(this.passCode, '  -  ',  user[0].pin)
      //console.log(isValid)
    },
    cartSummary() {
      return this.$store.state.invoice;
    },
    productsList() {
      return this.$store.state.products;
    },
  },
  mounted() {
    console.log("Fired..");
    this.runAi();
  },
};
</script>

<style>
.canvas-body {
  margin: 0;
  padding: 0;
  padding-top: 30px;
  width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
}

/* .canvas canvas{
  position: absolute;
  top: 0;
  left: 0;
} */
.face-api-outer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#face-detection-outer {
  max-width: 200px;
  max-height: 200px;
}

.ai-res-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.ai-res-container div {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.ai-res-container input {
  text-align: center;
  padding: 20px;
}
.loaded-img {
  max-width: 120px;
  width: 120px;
}

.summary-footer h5 {
  font-size: 1rem !important;
  font-weight: bold;
}
</style>
