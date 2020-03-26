<template>
  <v-autocomplete
    label="Resident airport"
    :items="airports"
    item-text="name"
    item-value="code"
    v-model="airport"
    :search-input.sync="searchAirports"
    :loading="aiportsLoading"
    :rules="rulesForAirports"
    return-object
    no-filter
    clearable
    hide-no-data
    auto-select-first
  ></v-autocomplete>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'ResidentAirportSelect',
  data: () => ({
    airports: [],
    aiportsLoading: false,
    searchAirports: null,
    selectedAirport: null,
    rulesForAirports: [
      (value) => !!value || 'Required.',
    ],
  }),
  computed: {
    airport: {
      get() {
        return this.$store.state.blockchainUser.airport;
      },
      set(value) {
        this.$store.commit('blockchainUser/setAirport', value);
      },
    },
  },
  mounted() {
    this.searchAirports = this.airport.name;
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
