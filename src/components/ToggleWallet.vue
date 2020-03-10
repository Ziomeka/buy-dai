<template>
  <v-btn :text="!isWalletOpen" @click="toggleWallet">
    <v-icon left>mdi-wallet</v-icon>
    <span class="hidden-xs-only">wallet</span>
  </v-btn>
</template>

<script>
export default {
  name: 'ToggleWallet',
  data: () => ({
    isWalletOpen: false,
  }),
  methods: {
    toggleWallet() {
      this.isWalletOpen = !this.isWalletOpen;
    },
  },
};
</script>
