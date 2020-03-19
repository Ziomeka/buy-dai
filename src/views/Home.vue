<template>
  <div>
    <all-offers v-if="userType==='resident'"/>
    <new-offer v-if="userType==='traveler'"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AllOffers from '@/components/AllOffers.vue';
import NewOffer from '@/components/NewOffer.vue';

export default {
  name: 'Home',
  components: {
    AllOffers,
    NewOffer,
  },
  computed: {
    ...mapState('blockchainUser', ['userType']),
  },
};
</script>
