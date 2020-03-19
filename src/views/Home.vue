<template>
  <div>
    <all-offers />
    <new-offer />
  </div>
</template>

<script>
import AllOffers from '@/components/AllOffers.vue';
import NewOffer from '@/components/NewOffer.vue';

export default {
  name: 'Home',
  components: {
    AllOffers,
    NewOffer,
  },
};
</script>
