<template>
  <div>
    <h1>This is page with new offer</h1>
    <v-card max-width="600" class="mx-auto">
    <v-tabs
    fixed-tabs
  >
    <v-tab class="buy">
      Buy DAI
    </v-tab>
    <v-tab class="sell">
      Sell DAI
    </v-tab>
    <v-tab-item>
      <v-form class="pa-5">
        <v-text-field
          v-model="buy.dai"
          label="Amount of DAI you want to buy"
          type="number"
          :rules="rulesForAmounts"
        />
        <v-text-field
          v-model="buy.dolars"
          label="Amount of dolars you want to pay"
          type="number"
          :rules="rulesForAmounts"
        />
      </v-form>
    </v-tab-item>
    <v-tab-item>
      <v-form class="pa-5">
        <v-text-field
          v-model="sell.dai"
          label="Amount of DAI you want to sell"
          type="number"
          :rules="rulesForAmounts"
        />
        <v-text-field
          v-model="sell.dolars"
          label="Amount of dolars you want to recive"
          type="number"
          :rules="rulesForAmounts"
        />
      </v-form>
    </v-tab-item>
  </v-tabs>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'NewOffer',
  data: () => ({
    numberValue: null,
    rulesForAmounts: [
      (value) => !!value || 'Required.',
      (value) => value > 0 || 'Must be positive',
    ],
    buy: {
      dai: null,
      dolars: null,
    },
    sell: {
      dai: null,
      dolars: null,
    },
  }),
};
</script>

<style>
  .sell {
    background-color: #97C1E9;
  }
  .buy {
    background-color: #FBD17C;
  }
</style>
