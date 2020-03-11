<template>
  <div>
    <v-switch
      :label="switchLabel"
      :loading="isEnablingPending"
      :disabled="isEnablingPending"
      :value="switchPosition"
      @change="changeState" >
    </v-switch>
    {{isDaiEnabled}}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ToggleDaiEnable',
  computed: {
    ...mapState('blockchainUser', ['isDaiEnabled', 'isEnablingPending']),
    switchPosition() {
      return this.isEnablingPending ? !this.isDaiEnabled : this.isDaiEnabled;
    },
    switchLabel() {
      let label;
      if (this.isEnablingPending) {
        label = 'Loading';
      } else if (this.isDaiEnabled) {
        label = 'Disable DAI';
      } else {
        label = 'Enable DAI';
      }
      return label;
    },
  },
  methods: {
    ...mapActions('blockchainUser', ['getState']),
    changeState() {
      this.getState();
    },
  },
};
</script>
