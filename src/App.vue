<template>
  <v-app>
    <v-navigation-drawer
        v-model="drawer"
          app
        >
    </v-navigation-drawer>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Buy DAI
          </v-list-item-title>
          <v-list-item-subtitle>
            buy and sell DAI with Revolut
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
    </v-app-bar>

    <v-content>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {

  },

  data: () => ({
    drawer: null,
  }),
};
</script>
