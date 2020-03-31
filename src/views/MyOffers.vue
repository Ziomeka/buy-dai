<template>
  <div>
    <h1>This is page with my offers</h1>
    {{offers}}
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'MyOffers',
  methods: {
    ...mapActions('myOffers', ['getMyOffers']),
  },
  computed: {
    ...mapState('blockchainUser', ['publicKey']),
    ...mapState('myOffers', ['offers']),
  },
  created() {
    this.getMyOffers(this.publicKey);
  },
};
</script>
