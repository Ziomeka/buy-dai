<template>
  <div>
    <v-switch label="Enable DAI" @change="changeState"></v-switch>
    {{isDaiEnabled}}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ToggleDaiEnable',
  computed: {
    ...mapState('blockchainUser', ['isDaiEnabled']),
  },
  methods: {
    ...mapActions('blockchainUser', ['getState']),
    changeState() {
      this.getState();
    },
  },
};
</script>
