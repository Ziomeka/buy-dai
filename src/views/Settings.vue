<template>
  <div>
    <h1>This is page with settings</h1>
    <toggle-dai-enable/>
    <toggle-user-type/>
    <resident-airport-select v-if="userType === 'resident'"/>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import ToggleDaiEnable from '@/components/ToggleDaiEnable.vue';
import ToggleUserType from '@/components/ToggleUserType.vue';
import ResidentAirportSelect from '@/components/ResidentAirportSelect.vue';

export default {
  name: 'Settings',
  components: {
    ToggleDaiEnable,
    ToggleUserType,
    ResidentAirportSelect,
  },
  computed: {
    ...mapState('blockchainUser', ['userType']),
  },
};
</script>
