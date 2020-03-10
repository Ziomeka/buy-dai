<template>
  <nav>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        Buy DAI
      </v-toolbar-title>
      <v-spacer />
      <toggle-wallet />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <v-list>
      <v-list-item
        v-for="link in links"
        :key="link.text"
        router :to="link.route"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{link.text}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import ToggleWallet from '@/components/ToggleWallet.vue';

export default {
  name: 'Navigation',
  components: {
    ToggleWallet,
  },
  data: () => ({
    drawer: null,
    links: [
      { text: 'New offer', route: '/' },
      { text: 'Browse offers', route: '/AllOffers' },
      { text: 'My offers', route: '/MyOffers' },
      { text: 'Settings', route: '/Settings' },
    ],
  }),
};
</script>
