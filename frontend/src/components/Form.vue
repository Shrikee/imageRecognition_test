<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-form class="form" v-model="valid" ref="upload">
            <v-file-input accept="image/*" label="Upload image" @change="onFileChange"></v-file-input>
            <v-text-field
              v-model="imageName"
              label="Image name"
              prepend-icon="mdi-file-image"
              v-if="notChanged"
            />
            <v-text-field
              v-model="imageUrl"
              label="Image url"
              prepend-icon="mdi-file-image"
              v-if="notChanged"
            />
            <v-btn @click="onSubmitAttached">Upload</v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios';

export default {
  data: () => ({
    valid: true,
    formData: new FormData(),
    notChanged: true,
    imageName: '',
    imageUrl: '',
  }),
  methods: {
    onFileChange(event) {
      this.notChanged = false;
      this.formData.append('file', event);
    },
    onSubmitAttached() {
      if (this.imageUrl && this.imageName) {
        this.formData.append('url', this.imageUrl);
        this.formData.append('name', this.imageName);
      }
      axios({
        method: 'POST',
        url: process.env.VUE_APP_SERVER_ADDRESS + 'img',
        data: this.formData,
        headers: { 'content-type': 'multipart/form-data' },
      }).then(() => {
        window.location.reload();
      });
    },
  },
};
</script>