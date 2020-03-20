<template>
  <div>
    <h1>This is page with new offer</h1>
    <v-card max-width="600" class="mx-auto">
      <v-card-title class="headline">Creating offer</v-card-title>
      <v-form class="pa-5" v-model="valid">
        <v-autocomplete
          label="Destination airport"
          :items="airports"
          item-text="name"
          item-value="code"
          v-model="selectedAirport"
          :search-input.sync="searchAirports"
          :loading="aiportsLoading"
          :rules="rulesForAirports"
          return-object
          no-filter
          clearable
          hide-no-data
        ></v-autocomplete>
        <div v-if="!isAirportSelected">Select airport to create transaction</div>
        <div v-else>
          Create transaction at {{selectedAirport.name}} ({{selectedAirport.code}})
          in {{selectedAirport.currency}}
        </div>
        <v-text-field
          v-model="dai"
          label="Amount of DAI you want to change"
          type="number"
          :disabled="!isAirportSelected"
          :rules="rulesForAmounts"
          :error-messages="aiportErrorMassege"
        />
        <v-text-field
          v-model="dolars"
          label="Amount of dolars you want to recive"
          type="number"
          :disabled="!isAirportSelected"
          :rules="rulesForAmounts"
          :error-messages="aiportErrorMassege"
        />
        <add-offer class="mt-5"
          :transactionData="{dai, dolars}"
          :isDisabled = !valid
        />
      </v-form>
    </v-card>
  </div>
</template>

<script>
import _ from 'lodash';
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
    airports: [],
    aiportsLoading: false,
    searchAirports: null,
    selectedAirport: null,
    rulesForAirports: [
      (value) => !!value || 'Required.',
    ],
  }),
  computed: {
    isAirportSelected() {
      return !!(this.selectedAirport);
    },
    aiportErrorMassege() {
      return (this.isAirportSelected) ? '' : 'Select aiport first';
    },
  },
  watch: {
    searchAirports: _.debounce(function (query) {
      if (query && query.length > 2) {
        this.getAirports(query);
      } else this.airports = [];
    }, 1000),
  },
  methods: {
    getAirports(query) {
      const url = `https://us-central1-daimarket.cloudfunctions.net/getAirports?q=${query}`;
      this.aiportsLoading = true;
      fetch(url, { method: 'GET', mode: 'cors' })
        .then((response) => {
          response.json()
            .then((data) => {
              this.airports = data;
            });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.aiportsLoading = false;
        });
    },
  },
};
</script>
