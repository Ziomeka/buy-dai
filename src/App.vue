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
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Navigation,
  },
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapState('blockchainUser', ['userType']),
  },
  methods: {
    setPrimaryColor() {
      if (this.userType === 'traveler') {
        this.$vuetify.theme.themes.light.primary = '#2c7fce';
      } else {
        this.$vuetify.theme.themes.light.primary = '#f6a81e';
      }
    },
  },
  mounted() {
    this.setPrimaryColor();
  },
  watch: {
    userType() {
      this.setPrimaryColor();
    },
  },
};
</script>
