<template>
  <v-card class="ma-4 pa-4">
    id: {{transactionData.uniqueId}}<br/>
    airport: {{transactionData.airport}}<br/>
    status: {{transactionData.status}}<br/>
  </v-card>
</template>

<script>
export default {
  name: 'Offer',
  props: {
    transactionData: Object,
  },
};
</script>
