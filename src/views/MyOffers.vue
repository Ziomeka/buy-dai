<template>
  <div>
    <h1>Your offers</h1>
      <offer v-for="offer in offers" :key="offer.uniqueId" :transactionData="offer"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Offer from '@/components/Offer.vue';

export default {
  name: 'MyOffers',
  components: {
    Offer,
  },
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
