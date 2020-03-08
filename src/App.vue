<template>
  <v-app>
    <navigation />

    <v-content class="ma-3">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>


<script>
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'App',

  components: {
    Navigation,
  },

  data: () => ({
    drawer: null,
  }),
};
</script>
