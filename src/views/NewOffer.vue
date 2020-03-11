<template>
  <div>
    <h1>This is page with new offer</h1>
    <v-card max-width="600" class="mx-auto">
      <v-tabs fixed-tabs>
        <v-tab class="buy">
          Buy DAI
        </v-tab>
        <v-tab class="sell">
          Sell DAI
        </v-tab>
        <v-tab-item>
          <v-form class="pa-5" v-model="buyValid">
            <v-text-field
              v-model="buy.dolars"
              label="Amount of dolars you want to exchange"
              type="number"
              :rules="rulesForAmounts"
            />
            <v-text-field
              v-model="buy.dai"
              label="Amount of DAI you are willing to accept"
              type="number"
              :rules="rulesForAmounts"
            />
            <add-offer
              transactionType="buy"
              :transactionData="buy"
              :isDisabled="!buyValid"
            />
          </v-form>
        </v-tab-item>
        <v-tab-item>
          <v-form class="pa-5" v-model="sellValid">
            <v-text-field
              v-model="sell.dai"
              label="Amount of DAI you want to sell"
              type="number"
              :rules="rulesForAmounts"
            />
            <v-text-field
              v-model="sell.dolars"
              label="Amount of dolars you are willing to accept"
              type="number"
              :rules="rulesForAmounts"
            />
            <add-offer
              transactionType="sell"
              :transactionData="sell"
              :isDisabled="!sellValid"
            />
          </v-form>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import AddOffer from '@/components/AddOffer.vue';

export default {
  name: 'NewOffer',
  components: {
    AddOffer,
  },
  data: () => ({
    rulesForAmounts: [
      (value) => !!value || 'Required.',
      (value) => value > 0 || 'Must be positive',
    ],
    buyValid: false,
    buy: {
      dai: null,
      dolars: null,
    },
    sellValid: false,
    sell: {
      dai: null,
      dolars: null,
    },
  }),
};
</script>

<style>
.sell {
  background-color: #97c1e9;
}
.buy {
  background-color: #fbd17c;
}
</style>
