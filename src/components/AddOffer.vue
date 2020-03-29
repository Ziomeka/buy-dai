<template>
  <div>
    <v-btn
      color="primary"
      :disabled="isDisabled"
      @click.stop="dialog = true"
    >
      Proceed
    </v-btn>
    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-card-title class="headline">Transaction details:</v-card-title>
        <v-card-text>
          Airport: {{transactionData.airportName}} ({{transactionData.airportCode}})<br/>
          Flight number: {{transactionData.flightNumber}}<br/>
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
            @click="addOffer"
            :loading="isAddingPending"
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
      isAddingPending: false,
    };
  },
  props: {
    transactionData: Object,
    isDisabled: Boolean,
  },
  methods: {
    addOffer() {
      const url = 'https://us-central1-daimarket.cloudfunctions.net/addOffer';
      const dataToSend = {
        sourceAmount: this.transactionData.daiAmount,
        destAmount: this.transactionData.price,
        currency: this.transactionData.targetCurrecy,
        airport: this.transactionData.airportCode,
        publicKey: '0x56947aC048452f75A64e2411CA140336cF939f7D',
        fno: this.transactionData.flightNumber,
      };
      this.isAddingPending = true;
      fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      })
        .then(() => {
          this.$emit('added');
          window.alert('Sucess');
        })
        .finally(() => {
          this.dialog = false;
          this.isAddingPending = false;
        });
    },
  },
};
</script>
