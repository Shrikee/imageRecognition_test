<template>
  <v-app>
    <v-container>
      <v-row>
        <Form />
      </v-row>
      <RecognitionList />
    </v-container>
  </v-app>
</template>

<script>
import Form from './components/Form';
import RecognitionList from './components/RecognitionsList';

export default {
  name: 'App',
  components: {
    Form,
    RecognitionList,
  },
  data: () => ({
    //
  }),
};
</script>
