<template>
  <div>
    <v-btn
      color="primary"
      :disabled="isDisabled"
      @click.stop="dialog = true">
      Proceed
    </v-btn>
    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-card-title class="headline">Transaction details:</v-card-title>
        <v-card-text>
          Airport: {{transactionData.airportName}} ({{transactionData.airportCode}})<br/>
          DAI Used: {{transactionData.daiAmount}} DAI<br/>
          Cash Earned: {{transactionData.price}} {{transactionData.targetCurrecy}}<br/>
          Commision: {{transactionData.commision}} %<br/>
          Refundable deposit: {{transactionData.daiAmount}} DAI<br/>
          Total DAI needed : {{transactionData.daiAmount * 2}} DAI
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddOffer',
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    transactionData: Object,
    isDisabled: Boolean,
  },
};
</script>
