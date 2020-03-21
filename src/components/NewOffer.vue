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
          v-model="daiAmount"
          label="Amount of DAI you want to change"
          type="number"
          :disabled="!isAirportSelected"
          :rules="rulesForAmounts"
          :error-messages="aiportErrorMassege"
        />
        <v-card-text>
          Our price sugestion<br/>
          Price:
          <v-progress-circular
            v-if="sugestionLoading"
            indeterminate
            :size="20"
            color="primary"
          ></v-progress-circular>
          <span v-if="sugestedPrice">
            {{sugestedPrice.after}}{{selectedAirport.currency}}
          </span><br/>
          Commision:
          <v-progress-circular
            v-if="sugestionLoading"
            indeterminate
            :size="20"
            color="primary"
          ></v-progress-circular>
          <span v-if="sugestedPrice">{{sugestedPrice.margin}}</span>
        </v-card-text>
        <v-text-field
          v-model="targetCurrencyAmount"
          label="Amount of dolars you want to recive"
          type="number"
          :disabled="!isAirportSelected"
          :rules="rulesForAmounts"
          :error-messages="aiportErrorMassege"
        />
        <v-card-text>
          Commision: {{commision}}
        </v-card-text>
        <add-offer class="mt-5"
          :transactionData="transactionData"
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
    daiAmount: null,
    targetCurrencyAmount: null,
    sugestedPrice: null,
    sugestionLoading: false,
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
    commision() {
      if (this.sugestedPrice) {
        return ((this.sugestedPrice.value - this.targetCurrencyAmount)
          / this.sugestedPrice.value).toFixed(2);
      }
      return null;
    },
    transactionData() {
      if (this.selectedAirport) {
        return {
          airportName: this.selectedAirport.name,
          airportCode: this.selectedAirport.code,
          targetCurrecy: this.selectedAirport.currency,
          daiAmount: this.daiAmount,
          price: this.targetCurrencyAmount,
          commision: this.commision,
        };
      } return {};
    },
  },
  watch: {
    searchAirports: _.debounce(function (query) {
      if (query && query.length > 2) {
        this.getAirports(query);
      } else this.airports = [];
    }, 1000),
    daiAmount: _.debounce(function (amount) {
      if (amount && amount > 0) {
        this.getPriceSugestion(amount, this.selectedAirport.currency);
      } else this.targetCurrencyAmount = null;
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
    getPriceSugestion(amount, currency) {
      const url = `https://us-central1-daimarket.cloudfunctions.net/getRate?sum=${amount}&currency=${currency}`;
      this.sugestionLoading = true;
      fetch(url, { method: 'GET', mode: 'cors' })
        .then((response) => {
          response.json()
            .then((data) => {
              this.sugestedPrice = data;
              this.sugestedPrice.after = this.sugestedPrice.after.toFixed(2);
              this.targetCurrencyAmount = this.sugestedPrice.after;
            });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.sugestionLoading = false;
        });
      console.log(amount, currency);
    },
  },
};
</script>
