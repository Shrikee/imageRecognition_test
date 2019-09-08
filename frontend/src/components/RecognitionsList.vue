<template>
  <v-row no-gutters>
    <v-card class="card" v-for="item in results" :key="item._id">
      <div class="name">{{ item.name }}</div>
      <v-flex v-if="item.url">
        <img class="img" :src="item.url" />
      </v-flex>
      <v-flex v-if="!item.url">
        <img class="img" :src="serverUrl + item.path" />
      </v-flex>
      <v-flex>{{ item.tags }}</v-flex>
    </v-card>
  </v-row>
</template>
<script>
import axios from 'axios';

export default {
  data: () => ({
    results: [],
    serverUrl: process.env.VUE_APP_SERVER_ADDRESS,
  }),
  methods: {},
  mounted() {
    axios.get(process.env.VUE_APP_SERVER_ADDRESS + 'img').then(response => {
      this.results = response.data;
      this.results.reverse();
    });
  },
};
</script>
<style scoped>
.card {
  margin-top: 20px;
}

.name {
  font-weight: bold;
}
.img {
  max-height: 500px;
  max-width: 500px;
}
</style>