<template>
  <v-btn :disabled="isDisabled" :text="true" @click="openWallet">
    <v-icon left>mdi-wallet</v-icon>
    <span class="hidden-xs-only">wallet</span>
  </v-btn>
</template>

<script>
export default {
  name: 'ToggleWallet',
  data: () => ({
    isDisabled: true,
  }),
  created() {
    if (this.$blockchain && this.$blockchain.portis) {
      this.isDisabled = false;
    }
  },
  methods: {
    openWallet() {
      this.$blockchain.portis.showPortis();
    },
  },
};
</script>
