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
        <v-card-title 
          class="headline">
          Creating offer
        </v-card-title>
        <v-card-text>
          You are going to create offer to {{ transactionType }}
          {{ transactionData.dai }} DAI for
          {{ transactionData.dolars }} dollars.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="red darken-1" 
            text 
            @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn 
            color="green darken-1" 
            text>
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
  created() {},
  props: {
    transactionType: String,
    transactionData: Object,
    isDisabled: Boolean,
  },
};
</script>
