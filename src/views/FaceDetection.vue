/* eslint-disable no-unused-vars */
<template>
  <BaseLayout
    class="face-api-outer"
    pageTitle="Payce Item Details"
    pageDefaultBackPage="/home"
  >
    <ion-progress-bar v-if="!loaded" type="indeterminate" color="primary"></ion-progress-bar>

    amount: {{ $store.state.invoice }}

    <div class="canvas-body d-flex justify-content-center align-content-center p-2">
      <div v-show="!loaded">
        <h3>Loading Face Recognition Model...</h3>
      </div>

      <div v-show="loaded" class="ai-res-container">
        <div>
          <div v-if="!detectedlabels.length">
            <h3>Please Scan your face to pay</h3>
            <input type="file" id="imageUpload" capture="user" accept="image/*" />
          </div>

          <div v-else-if="detectedlabels.includes('unknown')" class="face-is-detected">
            <h3>Sorry no faces has been detected</h3>
            <input type="file" id="imageUpload" capture="user" accept="image/*" />
          </div>

          <div v-else class="face-is-detected">
            <img class="border loaded-img" :src="loadedImgSource" :alt="`${detectedlabels} face image`">
            <h3>Face is Detected: {{ detectedlabels }}</h3>
          </div>
          
          
          
        </div>


      </div>
    </div>
  </BaseLayout>
</template>

<script>
import * as faceapi from "../AIFaceID/face-api.min.js";
import BaseLayout from "../components/BaseLayout";
import { IonProgressBar } from '@ionic/vue';

export default {
  components: { BaseLayout, IonProgressBar },
  data() {
    return {
      loaded: false,
      detectedlabels: [],
      loadedImgSource: null
    };
  },
  methods: {
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
        console.log(image)
        this.loadedImgSource = image.src //store Image Source

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
      const labels = [
        "sohrab",
        "Zayed",
        "Abubaker"
      ];
      return Promise.all(
        labels.map(async (label) => {
          const descriptions = [];
          for (let i = 1; i <= 2; i++) {
            const img = await faceapi.fetchImage(
              `https://raw.githubusercontent.com/0072007ss/AItest/master/labeled_images/${label}/${i}.jpg`
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
  height: 100%;
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

.ai-res-container{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.ai-res-container div{
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}

.ai-res-container input{
    text-align: center;
    padding: 20px;
}
.loaded-img{
  max-width: 170px;
  width: 170px;
}
</style>
