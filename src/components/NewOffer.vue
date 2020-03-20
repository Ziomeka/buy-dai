<template>
  <div>
    <h1>This is page with new offer</h1>
    <v-card max-width="600" class="mx-auto">
      <v-card-title class="headline">Creating offer</v-card-title>
      <v-form class="pa-5" v-model="valid">
        <v-autocomplete
          label="Choose airport"
          no-data-text="Aiport not found"
          :items="items"
          item-text="name"
          item-value="code"
          return-object
          v-model="airport"
        ></v-autocomplete>
        {{airport.name}}
        <v-text-field
          v-model="dai"
          label="Amount of DAI you want to change"
          type="number"
          :rules="rulesForAmounts"
        />
        <v-text-field
          v-model="dolars"
          label="Amount of dolars you want to recive"
          type="number"
          :rules="rulesForAmounts"
        />
        <add-offer
          :transactionData="{dai, dolars}"
          :isDisabled = !valid
        />
      </v-form>
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
    valid: false,
    dai: null,
    dolars: null,
    airport: {},
    items: [
      {
        id: 1,
        name: 'dupa',
        code: 'XYZ',
        currency: 'dolar',
      },
      {
        id: 2,
        name: 'kupka',
        code: 'ABC',
        currency: 'euro',
      },
    ],
  }),
};
</script>
