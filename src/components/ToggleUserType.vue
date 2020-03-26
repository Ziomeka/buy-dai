<template>
  <div>
    <v-switch
      :label="switchLabel"
      v-model="isResident"
      @change="changeState"
      >
    </v-switch>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'ToggleUserType',
  data: () => ({
    isResident: null,
  }),
  computed: {
    ...mapState('blockchainUser', ['userType']),
    switchLabel() {
      return (this.userType === 'resident') ? 'Switch to traveler' : 'Switch to resident';
    },
  },
  methods: {
    ...mapMutations('blockchainUser', ['setUserType']),
    changeState() {
      if (this.isResident) {
        this.setUserType('resident');
      } else {
        this.setUserType('traveler');
      }
    },
  },
  mounted() {
    this.isResident = (this.userType === 'resident');
  },
};
</script>
